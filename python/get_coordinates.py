# importing geopy library | fra https://www.geeksforgeeks.org/how-to-get-geolocation-in-python/
from geopy.geocoders import Nominatim


def get_location(place):

	place = place.replace(',',"")

	try:
		# calling the Nominatim tool
		loc = Nominatim(user_agent="GetLoc")

		# entering the location name
		getLoc = loc.geocode(place)

		return({"location address": getLoc.address, "lat": getLoc.latitude, "lon": getLoc.longitude})
	
	except AttributeError:
		words = place.split(' ')[0:-1]
		new_search = " ".join(words)

		print(f"Get Coordinates: found no place when searching {place}, trying new search: " + new_search)

		return get_location(new_search)

	

def list_unique(l):
	out = []

	for i in l:
		if (i in out):
			pass
		else:
			out.append(i)

	return(out)

def add_locations(data):
	for place in data:
	# place = data[0]
		location_addresses = list_unique(place['dorms']['addresses'])

		locations = []

		for address in location_addresses:
			locations.append(get_location(address))

		place['locations'] = locations

	return(data)


if __name__ == "__main__":
	# print(get_location("Storms pakhus"))
	
	import json

	data = {}

	with open('../json/scraped.json','r',encoding="utf-8") as f:
		data = json.load(f)


	# print(data[0].keys())

	data = add_locations(data)

	print(data[0].keys())

	with open('../json/scraped.json','w',encoding="utf-8") as f:
		json.dump(data,f)

	print("done")