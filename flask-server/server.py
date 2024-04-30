from flask import Flask, jsonify
from flask_cors import CORS
#create app instance
app = Flask(__name__)

#accept all origins
cors = CORS(app, origins='*')

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

if __name__ == "__main__":
    app.run(debug=True, port=8080)