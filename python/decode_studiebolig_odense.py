from bs4 import BeautifulSoup


def linear_search(array, to_find):
	for i in range(0, len(array)):
		if array[i] == to_find:
			return i
	return -1

def make_singlespaced(s):
	while(s.find("  ") != -1):
		index = s.find("  ")
		s = s[:index] + s[index + 1:]

	return(s)

def get_name(soup):
	try:
		title = soup.find('title').string
		name = title[title.index(' - ') + 3:title.index(' | ')]
	except Exception as e:
		name = "[No name found]"
		print(f"Kunne ikke finde kollegiets navn! \n\n Error: {e}")
	
	return(name)

def get_facilities(soup):
	tags = soup.find_all("li")[11:]
	datapoints = []

	lines = []

	for tag in tags:
		line = ""

		if(len(tag.contents) == 1):
			lines.append(tag.string)
		else:
			parts = []
			for part in tag.contents:
				if(part.string != None):
					parts.append(part.string)

			lines.append("".join(parts))

	
	better_lines = []

	for line in lines:
		better_line = line.replace("\n\t\t","").replace("\n \t","").replace("\n","").replace("\t","").replace(".",". ").replace(".  ",". ").replace("\u200b","")
		if(len(better_line) > 3 and better_line.find("‹ forrige") == -1 and better_line.find("« første") == -1 and better_line.find("næste ›") == -1 and better_line.find("sidste »") == -1):
			# print(better_line)
			better_lines.append(better_line)

	# print(better_lines)
	return(better_lines)
# 

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
	tags = soup.find_all(class_ = "views-field-BBRARE")[1:]
	datapoints = []
	for tag in tags:
		s = tag.string
		datapoints.append(s[13:17])
	return(datapoints)

def get_depositum(soup):
	tags = soup.find_all(class_ = "views-field-DEPOSITUM")[1:]
	prices = []
	for tag in tags:
		s = tag.string
		s = s[13:s.index(',')]
		s = s.replace(".",",")
		prices.append(s)
	return(prices)

def get_floorplans(soup):
	tags = soup.find_all(class_ = "views-field-FLOORPLAN")[1:]
	datapoints = []
	for tag in tags:
		try:
			floorplan = tag.contents[1]['href']
		except:
			print("no floorplan:(")
			return([])
		
		# print(floorplan)
		datapoints.append(floorplan)
	return(datapoints)


def get_rooms(soup):
	tags = soup.find_all(class_ = "views-field-ANTRUM")[1:]
	rooms = []
	for tag in tags:
		s = make_singlespaced(tag.string)
		rooms.append(s[2:3])
	return(rooms)


# views-field-ANTRUM

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

def includes_class(tag,c):
	# print(f"{tag['title']} == {c}")
	try:
		if(tag['title'] == c):
			# print("true!") 
			return(True)
		else:
			return(False)		
	
	except:
		return(False)

def get_icon_list(icons):
	own = []

	for icon in icons:
		if(includes_class(icon,"Bad")):
			own.append("bath")
		if(includes_class(icon,"Toilet")):
			own.append("toilet")
		if(includes_class(icon,"Køkken")):
			own.append("kitchen")

	return(own)

def get_own_and_shared(soup):
	own_tags = soup.find_all(class_ = "facilities-FACILITIES_OWN")[1:]
	shared_tags = soup.find_all(class_ = "facilities-FACILITIES_SHARED")[1:]

	# print(own_tags)
	# print("\n\n")
	# print(shared_tags[0].contents)
	# print("\n\n")

	# print(own_tags)
	own = []
	shared = []

	for i in range(len(own_tags)):
		own.append(get_icon_list(own_tags[i].contents))
		shared.append(get_icon_list(shared_tags[i].contents))

	return(own,shared)


def decode_studiebolig_odense(soup):
	data = {}

	data['name'] = get_name(soup)
	data['facilities'] = get_facilities(soup)

	data['dorms'] = {}
	data['dorms']['prices'] = get_prices(soup)
	data['dorms']['space'] = get_space(soup)
	data['dorms']['depositum'] = get_depositum(soup)
	data['dorms']['floorplans'] = get_floorplans(soup)
	data['dorms']['rooms'] = get_rooms(soup)

	data['dorms']['locations'], data['dorms']['links'] = get_locations_and_links(soup)
	data['dorms']['own'], data['dorms']['shared'] = get_own_and_shared(soup)

	return(data)

if __name__ == "__main__":
	print(make_singlespaced("wsfefkf     esfhkejf    esfsekjfh f    sfe"))

