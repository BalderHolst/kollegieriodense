import json

import dominate
from dominate.tags import *

def get_website_data():
	with open("../json/scraped.json",'r',encoding='utf-8') as f:
		return(json.load(f))


def save_file(path,text):
	with open(path,'w',encoding='utf-8') as f:
		f.write(text)




def create_page(data):
	doc = dominate.document(title = data['name']) 

	with doc.head:
		meta(charset="utf-8")

		link(rel="stylesheet",href="../../css/main.css")
		link(rel="stylesheet",href="../../css/info_page.css")
		# script(src="js/cards.js",defer=True)


		link(rel="preconnect",href="https://fonts.googleapis.com")
		link(rel="preconnect",href="https://fonts.gstatic.com",crossorigin=True)
		link(href="https://fonts.googleapis.com/css2?family=Sunflower:wght@300&display=swap",rel="stylesheet")



	with doc:
		with header():
			with a(href="../../index.html"):
				div("Kollegier i Odense",cls="title")
			with div(id="navbar"):
				a("hjem",cls="nav",href="../../index.html")
				a("om",cls="nav",href="../om.html")
				a("kontakt",cls="nav",href="../kontakt.html")

	with doc:
		with div(cls="text-box"):
			h2(data['name'],cls="header")
			
			with div(cls="cols"):

				with ul(cls="list left"):
					for item in data['facilities']:
						li(item,cls="list-item")
				

				# with div(cls="right"):


				with div(cls="floorplans right"):
					if(len(data['dorms']['floorplans']) > 0):
						for i,floorplan in enumerate(data['dorms']['floorplans']):
							img(src=floorplan,id=f"img{i}",cls="floorplan")
					elif 'img' in data.keys():
						img(src=data['img'])


				div("Nedenfor kan du vælge et bestemt værelse, og se dets faciliteter og grundplan",cls="how-to")


				with div(cls="table right"):
					table = [{"type":"none"},{"type": "header","text":"Toilet","cls": "header"},{"type": "header","text":"Bad","cls": "header"},{"type": "header","text":"Køkken","cls": "header"},{"type": "header","text":"Eget","cls": "header"},{"type":"checkbox","state": "empty"},{"type":"checkbox","state": "empty"},{"type":"checkbox","state": "empty"},{"type": "header","text": "Delt","cls":"header"},{"type":"checkbox","state": "empty"},{"type":"checkbox","state": "empty"},{"type":"checkbox","state": "empty"}]

					
					own_facilities = data['dorms']['own'][0]
					if "toilet" in own_facilities:
						table[5]['state'] = "checked"
					if "bath" in own_facilities:
						table[6]['state'] = "checked"
					if "kitchen" in own_facilities:
						table[7]['state'] = "checked"

					shared_facilities = data['dorms']['shared'][0]
					if "toilet" in shared_facilities:
						table[9]['state'] = "checked"
					if "bath" in shared_facilities:
						table[10]['state'] = "checked"
					if "kitchen" in shared_facilities:
						table[11]['state'] = "checked"


					for element in table:
						# print(element)
						if(element['type'] == "header"):
							div(element['text'],cls=element['cls'])
						elif(element['type'] == "checkbox"):
							if(element['state'] == "checked"):
								div("x",cls="checkmark")
							else:
								div()
						else:
							div()

			with div(cls="options-container"):
				
				with div(cls="table-headers"):
						div("Adresse",cls="header locations")
						div("Størrelse",cls="header")
						div("Værrelser",cls="header")
						div("Leje",cls="header")
						div("Depositum",cls="header")

				for i in range(len(data['dorms']['locations'])):
					with div(id=f"option{i}",cls="option"):
						div(data['dorms']['locations'][i],cls="locations")
						div(data['dorms']['space'][i] + "m2",cls="space")
						div(data['dorms']['rooms'][i],cls="rooms")
						div(data['dorms']['prices'][i] + "kr",cls="prices")
						div(data['dorms']['depositum'][i] + "kr",cls="depositum")
						a("Til side",id=f"selector{i}",cls="selector",href=data['dorms']['links'][i],target = "_blank")





			




	save_file(f"../pages/Info-pages/{data['name']}.html",str(doc))
	# save_file(f"../pages/Info-pages/test2.html",str(doc))
	print(doc)


if __name__ == "__main__":
	websites = get_website_data()

	for website in websites:
		print(f"Creating page for {website['name']}")
		create_page(website)

	print("done")