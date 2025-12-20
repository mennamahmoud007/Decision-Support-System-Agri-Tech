from flask import Flask, request, jsonify
from rules import generate_recommendation
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json() 
    recommendation = generate_recommendation(data)
    return jsonify(recommendation)  

if __name__ == "__main__":
    app.run()
# debug=True