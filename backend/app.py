from flask import Flask
from flask_cors import CORS
import csv
import json

app = Flask(__name__)
CORS(app)

# {TO BE DELETED}
# This is a simple example of Flask handling a GET request using the '/react' route
# It returns a JSON object of {'message': 'Flask is working!'}
@app.route('/react')
def react():
	return {'message': 'Flask is working!'}

# {TO BE DELETED}
# This is an example of serving a CSV file, which contains data for drawing a line graph
@app.route('/line-graph-test')
def line_graph_test():
	jsonArray = []

	with open('line_graph_test_data.csv') as csvFile:
		# Read CSV file
		csvReader = csv.DictReader(csvFile)

		# Convert each CSV row to Python dict
		for row in csvReader:
			jsonArray.append({ "date": row["date"], "value": float(row["value"])})

	return json.dumps(jsonArray)