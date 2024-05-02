
from flask import Flask, request, jsonify
from flask_cors import CORS
from SkillScraper import get_skills_json
#create app instance
app = Flask(__name__)

#accept all origins
cors = CORS(app)

#Members API Route
@app.route("/members")
def members():
    return jsonify({"members": ["Member1", "Member2", "Member3"]}), 200, {'Content-Type': 'application/json'}

@app.route("/api/users", methods=['GET'])
def users():
    return jsonify(
        {
            "users": [
                "arpan",
                "zack",
                "jesse"
            ]
        }
    )

@app.route("/api/skills", methods=['POST'])
def python_skills():
    job_search = request.json
    skills = get_skills_json(job_search)
    # json_skills = list(map(lambda x: x.to_json(), skills))
    print(job_search)
    return skills

if __name__ == "__main__":
    app.run(debug=True, port=8080)