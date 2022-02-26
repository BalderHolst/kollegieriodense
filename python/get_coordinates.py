# importing geopy library | fra https://www.geeksforgeeks.org/how-to-get-geolocation-in-python/
from geopy.geocoders import Nominatim


def get_location(place):

	# calling the Nominatim tool
	loc = Nominatim(user_agent="GetLoc")

	# entering the location name
	getLoc = loc.geocode(place)

	return({"location address": getLoc.address, "lat": getLoc.latitude, "lon": getLoc.longitude})


def add_locations(data):
	# for place in data:
	place = data[0]

	print(place)

if __name__ == "__main__":
	# print(get_location("Storms pakhus"))
	
	import json

	data = {}

	with open('../json/scraped.json','r') as f:
		data = json.load(f)

	data = add_locations(data)

	