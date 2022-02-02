def make_singlespaced(s):
	while(s.find("  ") != -1):
		index = s.find("  ")
		s = s[:index] + s[index + 1:]

	return(s)