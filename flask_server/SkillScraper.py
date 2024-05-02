from bs4 import BeautifulSoup
import requests #used to request information from a website
import numpy as np
import pandas as pd
import json

def get_first_10_pages(job):

    #create empty numpy array to hold skills
    # skills_array = np.empty((0,))
    job_skills_array = []
    job_posting = []

    results_per_page = 200

    html_text = requests.get(f'https://www.timesjobs.com/candidate/job-search.html?from=submit&luceneResultSize={results_per_page}&txtKeywords={job}&postWeek=60&searchType=personalizedSearch&actualTxtKeywords={job}&searchBy=0&rdoOperator=OR&pDate=I&sequence=1&startPage=1').text
    
    #PARSE HTML CODE WITH LXML
    soup = BeautifulSoup(html_text, 'lxml')

    total_results = int(soup.find('span', id='totolResultCountsId').text)
    # print(total_results)

    job_count = 0
    sequence_iterator = 1
    start_page_iterator = 1

    while(job_count < total_results and job_count < 500):
        #GET THE SKILLS OF THE SECOND PAGE
        # html_text = requests.get(f'https://www.timesjobs.com/candidate/job-search.html?from=submit&luceneResultSize=25&txtKeywords={job}&postWeek=60&searchType=personalizedSearch&actualTxtKeywords={job}&searchBy=0&rdoOperator=OR&pDate=I&sequence={sequence_iterator}&startPage={start_page_iterator}').text

        #GET THE JOB CARDS
        jobs = get_jobs_array(html_text)

        #increment job count by the number of job cards we are about to parse
        job_count += len(jobs)

        #GET THE PREFERRED SKILLS FOR ALL JOBS ON THE PAGE
        job_posting += get_job_postings(jobs)

        #ADD SKILLS TO THE NUMPY ARRAY
    #     # job_skills_array = np.concatenate((job_skills_array, job_postings))
        job_skills_array.append(job_posting)

        sequence_iterator += 1
        #timesjobs splits pages by every 10, reset start_page iterator once first 10 pages is surpassed
        #equivalent to pressing "next 10 pages"
        if(start_page_iterator + 9 < sequence_iterator):
            start_page_iterator += 10

        # Update HTML text for the next iteration
        html_text = requests.get(f'https://www.timesjobs.com/candidate/job-search.html?from=submit&luceneResultSize={results_per_page}&txtKeywords={job}&postWeek=60&searchType=personalizedSearch&actualTxtKeywords={job}&searchBy=0&rdoOperator=OR&pDate=I&sequence={sequence_iterator}&startPage={start_page_iterator}').text
        # print(job_count)
        # print(sequence_iterator)
        # print(start_page_iterator)

    return job_posting
    # for i in range(1, 11):
    #     #GET THE SKILLS OF THE SECOND PAGE
    #     html_text = requests.get(f'https://www.timesjobs.com/candidate/job-search.html?from=submit&luceneResultSize=25&txtKeywords={job}&postWeek=60&searchType=personalizedSearch&actualTxtKeywords={job}&searchBy=0&rdoOperator=OR&pDate=I&sequence={i}&startPage=1').text

    #     #GET THE JOB CARDS
    #     jobs = get_jobs_array(html_text)

    #     #GET THE PREFERRED SKILLS FOR ALL JOBS ON THE PAGE
    #     job_posting += get_job_postings(jobs)

    #     #ADD SKILLS TO THE NUMPY ARRAY
    #     # job_skills_array = np.concatenate((job_skills_array, job_postings))
    #     job_skills_array.append(job_posting)
    
    



def get_jobs_array(html_text):
    #PARSE HTML CODE WITH LXML
    soup = BeautifulSoup(html_text, 'lxml')

    #FIND ALL THE JOB CARDS
    jobs = soup.find_all('li', class_ = 'clearfix job-bx wht-shd-bx')
    return jobs


def get_job_postings(jobs):
    # job_postings = np.empty((0,))
    job_postings = []

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
        # job_postings = np.concatenate((job_postings, job_skills)) 
         # Append company name and skills to the list as a dictionary
        job_postings.append({'Company': company_name, 'Skills': job_skills})
    #return full numpy array
    return job_postings

# Calculate the percentage of companies that want a specific skill
def calculate_skill_percentage(skill, df):
    total_companies = len(df)
    companies_with_skill = df[df['Skills'].apply(lambda x: skill in x)]
    companies_with_skill_count = len(companies_with_skill)
    percentage = (companies_with_skill_count / total_companies) * 100
    return percentage



def get_skills_json(job):

    #GET RAW DATA(array of objects with company name and a list of their skills per job posting)
    job_skills_array = get_first_10_pages(job)
    
    #convert object to a datafram
    df = pd.DataFrame(job_skills_array)

    #CLEAN THE DATA

    #Convert lists to tuples for the 'Skills' column
    df['Skills'] = df['Skills'].apply(tuple)
    #removes duplicate rows
    df.drop_duplicates(inplace=True)


    # Flatten the 'Skills' column and exclude skills that are just the job name
    # all_skills = [skill for skills_tuple in df['Skills'] for skill in skills_tuple if skill != job]
    all_skills = [skill for skills_tuple in df['Skills'] for skill in skills_tuple if job not in skill]

    #Calculate the total number of skills
    total_skills = len(all_skills)
    
    # COUNT THE OCCURENCES OF EACH SKILL
    skill_counts = {}
    for skill in all_skills:
        skill_counts[skill] = skill_counts.get(skill, 0) + 1

    # Convert the skill counts to a DataFrame 
    skill_counts_df = pd.DataFrame({'Skill': list(skill_counts.keys()), 'Count': list(skill_counts.values())})

    # # Calculate the frequency (percentage) of each skill
    # skill_frequencies = {skill: count / total_skills * 100 for skill, count in skill_counts.items()}

    # # Convert the skill frequencies to a DataFrame
    # skill_frequencies_df = pd.DataFrame({'Skill': list(skill_frequencies.keys()), 'Frequency': list(skill_frequencies.values())})
    
    #sort the dataframe
    skill_counts_df_sorted = skill_counts_df.sort_values(by='Count', ascending=False)

    # #sort the dataframe
    # skill_frequencies_df_sorted = skill_frequencies_df.sort_values(by='Frequency', ascending=False)

    # Drop rows where the count is less than 5
    skill_counts_df_sorted = skill_counts_df_sorted[skill_counts_df['Count'] >= 5]

    # Calculate total count of skills
    total_count = skill_counts_df_sorted['Count'].sum()

    skill_frequencies_df = pd.DataFrame({'Skill': skill_counts_df_sorted['Skill'], 
                                        'Frequency': (skill_counts_df_sorted['Count'] / total_count) * 100})
    
    # Reset index for both DataFrames
    skill_counts_df_sorted.reset_index(drop=True, inplace=True)
    skill_frequencies_df.reset_index(drop=True, inplace=True)

    # print(total_count)
    # print(skill_counts_df_sorted)
    # print(skill_frequencies_df)

    # skill_counts_df_sorted.to_csv(f"../skill_counts_{job}1.csv", index=False)
    # skill_frequencies_df.to_csv(f"../skill_freq_{job}1.csv", index=False)

    # Get the top 20 skills with the highest count
    top_skills_df = skill_counts_df_sorted.head(20)

    # Initialize an empty DataFrame to store skill percentages
    # top_skills_percent_df = pd.DataFrame(columns=['Skill', 'Count', 'Percentage'])

    # Calculate the percentage of companies that want each top skill
    # for skill in top_skills:
    #     skill_percentage = calculate_skill_percentage(skill, df)
    #     print(f"Percentage of companies that want {skill}: {skill_percentage:.2f}%")

    # Initialize an empty dictionary to store the JSON data
    json_data = []

    # Calculate the percentage of companies that want each top skill
    for index, row in top_skills_df.iterrows():
        skill = row['Skill']
        count = row['Count']
        skill_percentage = calculate_skill_percentage(skill, df)
        # top_skills_percent_df = top_skills_percent_df.append({'Skill': skill, 'Count': count, 'Percentage': skill_percentage}, ignore_index=True)
        # Construct a dictionary for the skill
        # skill_data = {'Count': count, 'Percentage': skill_percentage}

        # Construct a dictionary for the skill
        skill_data = {'Skill': skill, 'Count': count, 'Percentage': skill_percentage}
        
        # Add the skill data to the JSON dictionary with skill as the key
        # json_data[skill] = skill_data

        # Add the skill data to the list
        json_data.append(skill_data)

    # Convert the list of dictionaries to a DataFrame
    skill_count_percentage_df = pd.DataFrame(json_data)

    # print(skill_count_percentage_df)
    # Convert the DataFrame to a dictionary without the index
    # json_data = skill_counts_df_sorted.head(10).to_dict(orient='records')
    # json_data = top_skills_percent_df.to_dict(orient='records')

    # Convert the dictionary to JSON
    json_output = json.dumps(json_data)

    # df_json = skill_counts_df_sorted.head(5).to_json()
    # print(skill_counts_df_sorted.head(5))
    # print(df_json)
    return json_output

    # # Convert DataFrame to dictionary with skill name as key and count as value
    # skill_dict = df_sorted.head(5).set_index('Skill')['Count'].to_dict()
    
    # # Convert dictionary to JSON object
    # json_data = json.dumps(skill_dict)
    
    # return json_data

    #display dataFrame
    # print(df_sorted.head(20))

    # print(df.describe())

#ONLY RUNS IF PROGRAM EXECUTED ***DIRECTLY*** (LIKE FROM COMMAND LINE), NOT IF IMPORTED AS MODULE
if __name__ == '__main__':

    # get user's preferred job
    print('Welcome to Build My Portfolio')
    job = input('Input your dream job: ')

    #GET RAW DATA(array of objects with company name and a list of their skills per job posting)
    job_skills_array = get_first_10_pages(job)
    
    #convert object to a dataframe
    df = pd.DataFrame(job_skills_array)

    print(df)

#     #CLEAN THE DATA

#     #Convert lists to tuples for the 'Skills' column
#     df['Skills'] = df['Skills'].apply(tuple)
#     #removes duplicate rows
#     df.drop_duplicates(inplace=True)

#     # df.to_csv(f"../{job}.csv", index=False)


#     # Flatten the 'Skills' column and exclude skills that are just the job name
#     all_skills = np.array([skill for skills_tuple in df['Skills'] for skill in skills_tuple if skill != job])


#     #Calculate the total number of skills
#     total_skills = len(all_skills)

# ###########################################################################################################################################
#     # COUNT THE OCCURENCES OF EACH SKILL
#     skill_counts = {}
#     for skill in all_skills:
#         skill_counts[skill] = skill_counts.get(skill, 0) + 1

#     # Calculate the frequency (percentage) of each skill
#     # skill_frequencies = {skill: count / total_skills * 100 for skill, count in skill_counts.items()}

#     # Convert the skill counts to a DataFrame 
#     skill_counts_df = pd.DataFrame({'Skill': list(skill_counts.keys()), 'Count': list(skill_counts.values())})

#     # Convert the skill frequencies to a DataFrame
#     # skill_frequencies_df = pd.DataFrame({'Skill': list(skill_frequencies.keys()), 'Frequency': list(skill_frequencies.values())})

#     #sort the dataframe
#     skill_counts_df_sorted = skill_counts_df.sort_values(by='Count', ascending=False)

#     # Convert the DataFrame to a dictionary without the index
#     json_data = skill_counts_df_sorted.to_dict(orient='records')

#     # Convert the dictionary to JSON
#     json_output = json.dumps(json_data)

    # Display the JSON output
    # print(json_output)

    # skill_counts_df_sorted.to_csv(f"../skill_counts_{job}.csv", index=False)

    #sort the dataframe
    # skill_frequencies_df_sorted = skill_frequencies_df.sort_values(by='Frequency', ascending=False)

##############################################################################################################################################
    # print(skill_counts_df_sorted)
    # print(total_skills)
    # print(skill_frequencies_df_sorted)

    # Get the top 5 skills with the highest count
    # top_skills = skill_counts_df_sorted.head(5)['Skill'].tolist()

    # Calculate the percentage of companies that want each top skill
    # for skill in top_skills:
    #     skill_percentage = calculate_skill_percentage(skill, df)
    #     print(f"Percentage of companies that want {skill}: {skill_percentage:.2f}%")
    # # df_json = skill_counts_df_sorted.head(5).to_json()
    # print(skill_counts_df_sorted.head(5))
    # print(df_json)
    
