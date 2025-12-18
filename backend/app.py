from flask import Flask, request, jsonify
from rules import generate_recommendation

app = Flask(__name__)

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json() 
    recommendation = generate_recommendation(data)
    return jsonify(recommendation)  

if __name__ == "__main__":
    app.run(debug=True)
