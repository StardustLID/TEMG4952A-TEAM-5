from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# {TO BE DELETED}
# This is a simple example of Flask handling a GET request using the '/react' route
# It returns a JSON object of {'message': 'Flask is working!'}
@app.route('/react')
def react():
	return {'message': 'Flask is working!'}