from bs4 import BeautifulSoup
import requests

from decode_utils import *

def get_soup(url):
	return(BeautifulSoup(requests.get(url).text,'lxml'))

def get_locations_and_links(soup):
	tags = soup.find_all(class_ = "views-field-ADRESSE")[1:]
	locations = []
	links = []
	for tag in tags:
		link = "https://www.studiebolig-odense.dk" + tag.contents[1]['href']
		location = tag.contents[1].contents[0] + ' ' + tag.contents[1].contents[2][1:]
		location = make_singlespaced(location)
		links.append(link)
		locations.append(location)
	return(locations,links) 

def get_prices(soup):
	tags = soup.find_all(class_ = "views-field-LEJE")[1:]
	prices = []
	for tag in tags:
		s = tag.string
		s = s.replace("\n            ","")
		s = s[:s.index(',')]
		s = s.replace(".",",")
		prices.append(s)
	return(prices)

def get_space(soup):
	tags = soup.find_all(class_ = "views-field-ETAARE")[1:]
	datapoints = []
	for tag in tags:
		s = tag.string
		datapoints.append(s[13:17])
	return(datapoints)

def get_fee(soup):
	tags = soup.find_all(class_ = "views-field-INDSKUD")[1:]
	prices = []
	for tag in tags:
		s = tag.string
		s = s[13:s.index(',')]
		s = s.replace(".",",")
		prices.append(s)
	return(prices)

def get_rooms(soup):
	tags = soup.find_all(class_ = "views-field-ANTRUM")[1:]
	rooms = []
	for tag in tags:
		s = make_singlespaced(tag.string)
		rooms.append(s[2:3])
	return(rooms)

def get_floorplans(soup):
	tags = soup.find_all(class_ = "views-field-FLOORPLAN")[1:]
	
	floorplans = []

	# print(tags[0].contents[1]['href'])

	for tag in tags:
		floorplan = tags[0].contents[1]
		try:
			floorplans.append(floorplan['href'])
		except:
			try:
				floorplans.append(floorplan['src'])
			except:
				print("no floorplan:(")


	return(floorplans)

def decode_kristiansdal(website):
	
	# soup_text = get_soup(website['links']['text'])
	soup = get_soup(website['links']['data'])


	data = {}
	data['dorms'] = {}

	data['dorms']['space'] = get_space(soup)
	data['dorms']['prices'] = get_prices(soup)
	data['dorms']['fee'] = get_fee(soup)
	data['dorms']['rooms'] = get_rooms(soup)
	data['dorms']['floorplans'] = get_floorplans(soup)
	data['dorms']['locations'], data['dorms']['links'] = get_locations_and_links(soup)

	


	return(data)


if __name__ == "__main__":
	import json

	websites = []

	with open('../json/websites.json','r',encoding="utf-8") as f:
		websites = json.load(f)

	website = websites[12]
	print(website['name'])

	print(decode_kristiansdal(website))