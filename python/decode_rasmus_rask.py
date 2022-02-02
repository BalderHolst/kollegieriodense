from bs4 import BeautifulSoup


def get_soup(url):
	return(BeautifulSoup(requests.get(url).text,'lxml'))

def decode_rasmus_rask(website):
	print("no_scan")
	return(website)