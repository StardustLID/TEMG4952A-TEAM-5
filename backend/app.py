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

	# Remove "unknown" column
	series.drop(labels='unknown', inplace=True)

	# Move the row of "10000+" downwards
	temp = series['10000+']
	series.drop(labels='10000+', inplace=True)
	series['10000+'] = temp

	# Prepare the dataframe to be converted to CSV string
	df = series.to_frame()
	df.reset_index(inplace=True)	# Stop using x axis labels as the dataframe's index
	df.rename(columns={'employee_count': 'y_values', 'index': 'x_labels'}, inplace=True)

	# Convert dataframe to CSV string
	return df.to_csv(index=False)


@app.route('/features/company-age')
def company_age():
	return 0


@app.route('/features/funding-rounds')
def funding_rounds():
	df = pd.read_csv("../Week3_Onwards/unifed_csv_without_duplicated_company.csv")
	series = df['num_funding_rounds'].value_counts().sort_index()

	# Remove num_funding_rounds == 0
	df = series.to_frame()
	df = series.reset_index().drop(index=0)

	# Tidy up the dataframe
	df['index'] = df['index'].astype(int).astype(str)
	df.rename(columns={'index': 'x_labels', 'num_funding_rounds': 'y_values'}, inplace=True)

	# Find the sum of companies where no. of investments >= 8
	df.iloc[7,1] = df.iloc[7:, 1].sum()
	df.iloc[7,0] = '≥8'
	df = df[:8]    # Only take the first 8 rows

	return df.to_csv(index=False)


@app.route('/features/funding-per-round')
def funding_per_round():
	# TODO: Need to add 2010-01-01 to make the graph start from 0
	# https://www.geeksforgeeks.org/add-a-row-at-top-in-pandas-dataframe/
	data = "date,value\n2010-01-01,0\n2013-01-01,150\n2013-07-01,30\n2016-01-01,70\n2018-07-01,220"
	
	return data


@app.route('/features/num-investments')
def num_investments():
	df = pd.read_csv("../Week3_Onwards/unifed_csv_without_duplicated_company.csv")
	series = df['investment_count']

	df = series.to_frame()
	#drop zero
	df = df[~(df == 0).any(axis = 1)]
	df.rename(columns={'investment_count': 'x_values'}, inplace=True)

	return df.to_csv(index = False)


@app.route('/features/top-investments')
def top_investments():
	return 0


@app.route('/features/num-acquisitions')
def num_acquisitions():
	return 0


@app.route('/features/acquisition-price')
def acquisition_price():
	df = pd.read_csv("../Week3_Onwards/unifed_csv_without_duplicated_company.csv")
	series = df['acquisitions_price_usd']

	df = series.to_frame()
	df.rename(columns={'acquisitions_price_usd': 'x_values'}, inplace=True)

	return df.to_csv(index = False)


@app.route('/features/funds-raised')
def funds_raised():
	df = pd.read_csv("../Week3_Onwards/unifed_csv_without_duplicated_company.csv")
	series = df['total_funding_usd']

	df = series.to_frame()
	df.dropna(inplace=True)
	df.rename(columns={'total_funding_usd': 'x_values'}, inplace=True)

	return df.to_csv(index = False)


@app.route('/features/num-companies-owned')
def num_companies_owned():
	return 0


@app.route('/features/founder-exp')
def founder_exp():
	return 0


@app.route('/features/funding-location')
def funding_location():
	return 0
