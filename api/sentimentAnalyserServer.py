from flask import Flask, request, jsonify, render_template
from textblob import TextBlob
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# @app.route("/")
# def index():
#     return render_template("index.html")
# comment

@app.route("/analyze_sentiment", methods=["POST"])
def analyze_sentiment():
    data = request.get_json()
    text = data["text"]
    blob = TextBlob(text)
    sentiment = blob.sentiment.polarity
    return jsonify({"sentiment": sentiment})

if __name__ == "__main__":
    app.run(debug=True)