
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from flask_server.modules.SkillScraper import get_skills_json
import os
#create app instance
app = Flask(__name__)

#accept all origins
cors = CORS(app)



@app.route("/api/skills", methods=['POST'])
def python_skills():
    job_search = request.json
    skills = get_skills_json(job_search)
    print(job_search)
    return skills

#Catch-all route to serve React app
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