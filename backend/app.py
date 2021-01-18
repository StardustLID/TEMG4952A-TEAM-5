from flask import Flask
from flask_cors import CORS
import csv
import json
import pandas as pd

app = Flask(__name__)
CORS(app)

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

'''
Features Visualization
'''

@app.route('/features/num-employees')
def num_employees():
	df = pd.read_csv("../Week3_Onwards/unifed_csv_without_duplicated_company.csv")
	series = df['employee_count'].value_counts()
	series.drop(labels='unknown', inplace=True)

	temp = series['10000+']
	series.drop(labels='10000+', inplace=True)
	series['10000+'] = temp

	df = series.to_frame()
	df.reset_index(inplace=True)
	df.rename(columns={'employee_count': 'y_values', 'index': 'x_labels'}, inplace=True)

	# return df.to_string(index=False, justify='left')
	return df.to_csv(index=False)