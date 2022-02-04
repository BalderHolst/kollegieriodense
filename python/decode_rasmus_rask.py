from bs4 import BeautifulSoup
import requests

from decode_utils import *

def get_soup(url):
	return(BeautifulSoup(requests.get(url).text,'lxml'))


def get_prices(soup):

	d = {}

	d['rooms'] = []
	d['own'] = []
	d['shared'] = []
	d['prices'] = []
	d['depositum'] = []
	d['space'] = []
	d['floorplans'] = []
	d['locations'] = []
	d['links'] = []

	tags = soup.find_all(class_ = "list-item")
	# tags2 = soup.find_all(class_ = "list-item _md ng-hide")

	# tag = 1
	for tag in tags:
		d['rooms'].append(tag.contents[3].string)

		
		# own/shared
		own = []
		shared = []
		own.append("toilet")
		if(tag.contents[5].string == "Eget"):
			own.append("bath")
			own.append("kitchen")
		else:
			shared.append("bath")
			shared.append("kitchen")
		d['own'].append(own)
		d['shared'].append(shared)


		# husleje
		d['prices'].append(make_singlespaced(str(tag.contents[7].contents[0])[2:])[1:].replace("\r\n ",""))

		# depositum
		d['depositum'].append(tag.contents[9].string)

		# space
		d['space'].append(tag.contents[11].string)

		d['floorplans'].append("https://www.kollegieboligselskabet.dk/" + tag.contents[15].contents[1]['ng-click'].split('\'')[-2])

		d['locations'].append("Elmelundsvej 4, 5200 Odense V")

	return(d)



def decode_rasmus_rask(website):
	
	soup = get_soup(website['link'])

	data = {}

	data['dorms'] = {}
	data['dorms'] = data['dorms'] | get_prices(soup)

	return(data)





if __name__ == "__main__":
	import json

	websites = []

	with open('../json/websites.json','r',encoding="utf-8") as f:
		websites = json.load(f)

	website = websites[13]
	# print(website['name'])

	print(decode_rasmus_rask(website))