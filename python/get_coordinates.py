# importing geopy library | fra https://www.geeksforgeeks.org/how-to-get-geolocation-in-python/
from geopy.geocoders import Nominatim
import itertools




def get_location(place):

	place = place.replace(',',"")

	print(place)

	try:
		# calling the Nominatim tool
		loc = Nominatim(user_agent="GetLoc")

		

		try:
			getLoc = loc.geocode(place)
			return({"search_string": place,"location address": getLoc.address, "lat": getLoc.latitude, "lon": getLoc.longitude})
		
		except AttributeError:
			
			alternatives = get_options(place)

			for alternative in alternatives:
				print(f"trying alternative: \"{alternative}\"")
				try:
					getLoc = loc.geocode(alternative)
					return({"search_string": place,"location address": getLoc.address, "lat": getLoc.latitude, "lon": getLoc.longitude})
				except AttributeError:
					pass



			raise AttributeError("could not find place")

	
	except AttributeError:
		words = place.split(' ')[0:-1]
		new_search = " ".join(words)

		print(f"Get Coordinates: found no place when searching \"{place}\", trying new search: \"{new_search}\"")

		return get_location(new_search)


def get_options(string):
	string = string.lower()

	possibilities = [['å','aa'],['aa','å'],['gade',' gade']]

	options = []

	# finder alle kombinationer
	for L in range(0, len(possibilities)+1):
	    for subset in itertools.combinations(possibilities, L):
	        if(len(subset) > 0):
	        	new_string = string
	        	for r in subset:
	        		new_string = new_string.replace(r[0],r[1])
	        	options.append(new_string)
	        
	return(list_unique(options))


	
	

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


	print(get_location("Hans Tausensgade 5000, Odense C Hans Tausen kollegiet"))


	# print(get_location(""))

	# with open('../json/scraped.json','r',encoding="utf-8") as f:
	# 	data = json.load(f)


	# data = add_locations(data)



	# with open('../json/scraped.json','w',encoding="utf-8") as f:
	# 	json.dump(data,f)



	print("done")