string = r"""Kollegiets formål er at være hjem for unge under uddannelse som
gennem et fælles kollegieliv med kammerater fra forskellige samfundslag
kan nå frem til den samhørighedsfølelse der er en betingelse for en sund
udvikling af demokrati og frisind som var frihedskampens målsætning.
Samtidig skal kollegiet bidrage til at erindringen om Danmarks
frihedskamp bevares i kommende generationer"""

string.replace('æ',"r\u00E6")
string.replace('ø',"r\u00F8")
string.replace('å',"r\u00E5")

with open ("file.txt",'w') as f:
	f.write(string)

print(string)

# Kollegiets form\u00E5l er at v\u00E6re hjem for unge under uddannelse som
# gennem et f\u00E6lles kollegieliv med kammerater fra forskellige samfundslag
# kan n\u00E5 frem til den samh\u00F8righedsf\u00F8lelse der er en betingelse for en sund
# udvikling af demokrati og frisind som var frihedskampens m\u00E5ls\u00E6tning.
# Samtidig skal kollegiet bidrage til at erindringen om Danmarks
# frihedskamp bevares i kommende generationer