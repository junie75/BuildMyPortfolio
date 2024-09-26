
from flask import Flask, request, send_from_directory
from flask_cors import CORS
# from flask_server.modules.SkillScraper import get_skills_json
from modules.SkillScraper import get_skills_json #for local testing
import os
# from modules.SkillScraper import compile_regex
import cProfile
import pstats
from pstats import SortKey

# Run the code with profiling
# cProfile.run('compile_regex()', 'restats')
# p = pstats.Stats('restats')
# p.strip_dirs().sort_stats(-1).print_stats()

#create app instance
app = Flask(__name__)

#accept all origins
cors = CORS(app)



@app.route("/api/skills", methods=['POST'])
def python_skills():
    job_search = request.json

    #  # Profile the get_skills_json function
    # profile = cProfile.Profile()
    # profile.enable()

    skills = get_skills_json(job_search)
    print(job_search)

    # profile.disable()
    
    # # Save profiling results to a file
    # profile.dump_stats('restats')

    # # Read the profiling stats and print
    # p = pstats.Stats('restats')

    # # p.strip_dirs().sort_stats(-1).print_stats()
    # # Sort the stats by cumulative time
    # p.sort_stats(pstats.SortKey.CUMULATIVE)

    # # Print the top 20 entries
    # p.print_stats(20)

    return skills

# Catch-all route to serve React app
# comment this out during local testing
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    # app.run(debug=True, port=8080)
    # Use PORT environment variable if available, otherwise default to 8080
    port = int(os.environ.get('PORT', 8080))
    app.run(debug=True, port=port)