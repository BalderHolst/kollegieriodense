# mangler: Munkegade Kollegiet?/munke mose park, Pjentedamskollegiet, https://www.kollegieboligselskabet.dk/vores-afdelinger/rasmus-raskkollegiet/, Skt. Jørgenskollegiet, Thomas B. Thriges Kollegium

from bs4 import BeautifulSoup
import requests
import json

from decode_studiebolig_odense import *
from decode_kristiansdal import *
from decode_rasmus_rask import *
from get_coordinates import *


def getWebsites():
	s = ''
	with open('../json/websites.json','r',encoding='utf-8') as f:
		s = json.load(f)
	return(s)

def get_soup(url):
	return(BeautifulSoup(requests.get(url).text,'lxml'))


def getPrices(website,soup):
	tags = soup.find_all(class_ = website['classes']['rent'])[1:]
	# print(tags)

	prices = []

	for tag in tags:
		s = tag.string
		s = s[13:s.index(',')]
		s = s.replace('.',',')
		prices.append(s)

	return(prices)

def getSpace(website,soup):
	tags = soup.find_all(class_ = 'views-field-BBRARE')[1:]

	datapoints = []

	for tag in tags:
		s = tag.string
		datapoints.append(s)

	return(datapoints)




def decode(website):

	if(website['decoding_function'] == False):
		print("...no decoding function.")
		return(website)


	fun = website['decoding_function']

	# print('using deciding function: ' + fun)

	method_name = fun # set by the command line options
	
	possibles = globals().copy()
	possibles.update(locals())
	method = possibles.get(method_name)
	if not method:
	     raise NotImplementedError('Method %s not implemented' % method_name)
	
	return(method(website))


def do_it():
	websites = getWebsites()

	data = []

	for i,website in enumerate(websites):
		print(f"[{i+1}/{len(websites)}] Scraping: {website['name']}")

		website = website | decode(website)

		if 'dorms' in website.keys():
			website['locations'] = find_locations(website['dorms']['addresses'])

		data.append(website)

		print() #adds empty line



	# if 'dorms' in website.keys():
	# 	data = add_locations(data)

	with open('../json/scraped.json','w') as f:
		json.dump(data,f)



if __name__ == '__main__':
	do_it()


	


