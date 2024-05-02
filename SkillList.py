from bs4 import BeautifulSoup
import requests #used to request information from a website
import numpy as np


def get_link_closest_match(html_text):
    
    #PARSE HTML CODE WITH LXML
    soup = BeautifulSoup(html_text, 'lxml')

    #FIND FIRST TABLE ELEMENT
    jobs_table = soup.find('table')

    #FIND FIRST INSTANCE OF JOB (CLOSEST MATCH TO SEARCH)
    first_match = jobs_table.find('tr', class_ = 'occ-all occ-featured')

    #GET JOB SUMMARY LINK
    summary_link = first_match.find_all('a')[1]['href']

    return summary_link


# get user's preferred job
print('Get list of technical skills for a position')
job = input('Input job: ')

html_text = requests.get(f'https://www.onetonline.org/find/result?s={job}').text

summary_link = get_link_closest_match(html_text)

new_html_text = requests.get(summary_link).text

#PARSE HTML CODE WITH LXML
soup = BeautifulSoup(new_html_text, 'lxml')

tech_skills = soup.find('div', class_ = 'section_TechnologySkills')

print(tech_skills)
