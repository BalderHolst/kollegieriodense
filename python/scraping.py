# mangler: Harekæret, Landø Kollegiet, Langelinie Kollegiet, Munkegade Kollegiet?/munke mose park, Pjentedamskollegiet, https://www.kollegieboligselskabet.dk/vores-afdelinger/rasmus-raskkollegiet/, Skt. Jørgenskollegiet, Thomas B. Thriges Kollegium

from bs4 import BeautifulSoup
import requests
import json

from decode_studiebolig_odense import decode_studiebolig_odense



def getWebsites():
	s = ""
	with open("../json/websites v.2.json",'r') as f:
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
		s = s.replace(".",",")
		prices.append(s)

	return(prices)

def getSpace(website,soup):
	tags = soup.find_all(class_ = "views-field-BBRARE")[1:]

	datapoints = []

	for tag in tags:
		s = tag.string
		datapoints.append(s)

	return(datapoints)




def decode(website):

	soup = get_soup(website["link"])
	fun = website["decoding_function"]

	# print("using deciding function: " + fun)

	method_name = fun # set by the command line options
	
	possibles = globals().copy()
	possibles.update(locals())
	method = possibles.get(method_name)
	if not method:
	     raise NotImplementedError("Method %s not implemented" % method_name)
	
	return(method(soup))


def do_it():
	websites = getWebsites()

	data = []

	for website in websites:
		print(f"Scraping: {website['link']}")

		data.append(website | decode(website))

	with open("../json/scraped.json",'w') as f:
		json.dump(data,f)

if __name__ == "__main__":

	do_it()

	


