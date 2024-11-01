# BuildMyPortfolio

## Overview
**BuildMyPortfolio** is a web application created to empower job seekers, particularly students and career changers, by helping them understand the most desired skills in their target field. The user simply inputs their "dream job," and the app scrapes **TimesJobs.com** to identify the top skills for that role, displaying the most frequent skills, brief descriptions, and statistics about employer demand.

## The Problem
Many job seekers face uncertainty when reviewing job descriptions that list varying "preferred" skills across companies. BuildMyPortfolio was inspired by these challenges, aiming to provide users with a clearer picture of the skills that matter most, helping them focus on areas of highest impact for their career goals.

## Solution & Key Features
BuildMyPortfolio offers personalized skill insights based on job title searches, leveraging a Python-based web scraper to retrieve and analyze relevant skills. The app includes:

- **Real-time skill insights:** Presents the most frequently mentioned skills for any job title.
- **Skill descriptions:** Fetches descriptions from external APIs, giving users an understanding of each skill's purpose.
- **Detailed analytics:** Displays the percentage of employers seeking each skill and its relative importance.
- **Optimized performance:** Implements backend enhancements to improve scraping and data analysis efficiency, minimizing load times.

## Development Challenges & Optimizations
Key challenges included optimizing load times due to the large data volume. Initial load times were high because of the multiple requests required to process job postings on TimesJobs.com. Solutions included:

- **Efficient data retrieval:** Adjusted URLs to retrieve a larger number of postings in a single request.
- **Parallel processing:** Implemented multi-threading to process data faster, reducing round-trip time by 75%.
- **cProfile Analysis:** Used Python's cProfile tool to identify bottlenecks and made optimizations in request handling and data processing.

## Technologies Used
- **Frontend:** ReactJS
- **Backend:** Python Flask
- **Data Analysis:** Numpy, Pandas
- **APIs and Libraries:** BeautifulSoup for web scraping, Wikipedia API for skill descriptions
- **Data Visualization:** React-chartjs-2

## Setup & Installation

### Prerequisites
- Python 3.x
- Node.js and npm

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/junie75/BuildMyPortfolio.git
   cd BuildMyPortfolio
2. **Backend Setup (Python Flask):** 
  *Navigate to the server directory:
   ```bash
     cd flask_server
  * Install required Python packages:
    ```bash
    python server.py
  * Run the Flask server:
    ```bash
    python server.py
3. **Frontend Setup (React):**
  *Navigate to the client directory:
   ```bash
     cd ../frontend
  * Install dependencies:
    ```bash
    npm install
  * Run the React server:
    ```bash
    npm run dev
4. **Access the application:**
   * Open your web browser and go to http://localhost:3000

## Usage
- Enter a job title on the home page.
- The application retrieves and processes job postings, displaying top skills, descriptions, and visual analytics.
- View the most relevant skills for your target role to inform your career focus.

## Future Improvements
- Expand the scraper to include multiple job sites (e.g., LinkedIn, Glassdoor) for broader data coverage.
- Integrate user profiles allowing users to track their skill development over time.
- Use machine learning models to improve the relevance and accuracy of skill descriptions.

## Project Structure
- `backend/` - Python Flask server and web scraping functionality.
- `frontend/` - ReactJS application displaying results and visualizations.
- `SkillScraper.py` - Main scraper script that fetches and processes data.
- `server.py` - Flask server script handling API requests.
