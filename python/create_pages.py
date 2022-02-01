import json

import dominate
from dominate.tags import *

def get_website_data():
	with open("../json/scraped.json",'r') as f:
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
		script(src="js/cards.js",defer=True)

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
			with ul(cls="list"):
				for item in data['facilities']:
					li(item)


	save_file(f"../pages/Info-pages/{data['name']}.html",str(doc))
	print(doc)



create_page(get_website_data()[1])