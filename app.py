from flask import Flask, request, jsonify, send_from_directory
from rules import generate_recommendation
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='frontend', static_url_path='')
CORS(app)

@app.route("/")
def index():
    return send_from_directory('frontend', 'index.html')

@app.route("/form")
def form():
    return send_from_directory('frontend', 'form.html')

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data received"}), 400
    recommendation = generate_recommendation(data)
    return jsonify(recommendation)

if __name__ == "__main__":
    app.run(debug=True)