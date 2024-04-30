from bs4 import BeautifulSoup
import requests #used to request information from a website
import numpy as np
import pandas as pd

def get_first_10_pages(job):
    
    #create empty numpy array to hold skills
    skills_array = np.empty((0,))

    for i in range(1, 11):
        #GET THE SKILLS OF THE SECOND PAGE
        html_text = requests.get(f'https://www.timesjobs.com/candidate/job-search.html?from=submit&luceneResultSize=25&txtKeywords={job}&postWeek=60&searchType=personalizedSearch&actualTxtKeywords={job}&searchBy=0&rdoOperator=OR&pDate=I&sequence={i}&startPage=1').text

        #GET THE JOB CARDS
        jobs = get_jobs_array(html_text)

        #GET THE PREFERRED SKILLS FOR ALL JOBS ON THE PAGE
        job_skills = get_skills_array(jobs)

        #ADD SKILLS TO THE NUMPY ARRAY
        skills_array = np.concatenate((skills_array, job_skills)) 
    
    return skills_array



def get_jobs_array(html_text):
    #PARSE HTML CODE WITH LXML
    soup = BeautifulSoup(html_text, 'lxml')

    #FIND ALL THE JOB CARDS
    jobs = soup.find_all('li', class_ = 'clearfix job-bx wht-shd-bx')
    return jobs

def get_skills_array(jobs):
    skills_array = np.empty((0,))

    #ITERATE THROUGH EACH JOB CARD TO FIND AND PRINT INFORMATION, ENUMERATE YEILDS PAIRS OF (index, item)
    for index, job in enumerate(jobs):
        
        # FIND THE COMPANY NAME
        company_name = job.find('h3', class_ = 'joblist-comp-name').text.strip()

        #MARKER AND LISTMARKER USED TO FILTER OUT CLASSES AND FIND THE SKILLS
        marker = job.find('ul', class_ = 'list-job-dtl clearfix')
        list_marker = marker.find_all('li')[1]
        skills = list_marker.span.text.strip()

        #strip, lowercase, and add each skill to an array
        job_skills = [skill.strip().lower() for skill in skills.split(',')]

        #append onto skills array
        skills_array = np.concatenate((skills_array, job_skills)) 
    #return full numpy array
    return skills_array


#ONLY RUNS IF PROGRAM EXECUTED ***DIRECTLY*** (LIKE FROM COMMAND LINE), NOT IF IMPORTED AS MODULE
if __name__ == '__main__':

    # get user's preferred job
    print('Welcome to Build My Portfolio')
    job = input('Input your dream job: ')

    # get skill data from jobs on the first 10 pages
    total_skills = get_first_10_pages(job)

    # Count occurrences of each skill
    unique_skills, counts = np.unique(total_skills, return_counts=True)

    # Create dataframe with all the skills and counts of each
    df = pd.DataFrame({'Skill': unique_skills, 'Count': counts})

    df_sorted = df.sort_values(by='Count', ascending=False)
    #display dataFrame
    print(df_sorted.head(20))

    # print(df.describe())

