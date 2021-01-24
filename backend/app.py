from flask import Flask
from flask import request
from flask_cors import CORS
import pandas as pd
from functools import reduce
import json
import numpy as np

app = Flask(__name__)
CORS(app)

# Api for the Changable Graph
@app.route('/ChangableGraph', methods = ["POST"])
def ChangableGraph():
	data = request.get_json()
	#return "Hello test"
	#print(data['xaxis'])
	
	return data['xaxis']


# Api for the bubbleplot
@app.route('/BubblePlot')
def BubblePlot():
	df = pd.read_csv("../Week3_Onwards/unifed_csv_without_duplicated_company.csv")
	df = df[['employee_count', 'degree_type',"founded_on",'ROI']]
	#drop na for the ROI
	df.dropna(inplace = True)

	#drop unknown for employee_count
	df.drop(df[df['employee_count'] == "unknown"].index, inplace = True)

	df['employee_count'] = df['employee_count'].str.split('-').str[0]
	df.drop(df[df['employee_count'] == "5001"].index, inplace = True)

	#drop inf in ROI
	df.drop(df[df['ROI'] == np.inf].index, inplace = True)
	df.drop(df[df['ROI'] < -2].index, inplace = True)
	df.drop(df[df['ROI'] > 2].index, inplace = True)

	df.rename(columns={'founded_on': 'y_values', 'degree_type': 'x_values', 'ROI': 'score'}, inplace=True)

	return df.to_csv(index= False)

'''
Features Visualization
'''

@app.route('/features/num-employees')
def num_employees():
	df = pd.read_csv("../Week3_Onwards/unifed_csv_20210124_2.csv")
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
	df = pd.read_csv("../Week3_Onwards/unifed_csv_20210124_2.csv", parse_dates=['founded_on'])

	# Remove unnecessary columns
	categories = ['cat_pca_0', 'cat_pca_1', 'cat_pca_2', 'cat_pca_3', 'cat_pca_4']
	cols_to_keep = ['founded_on', *categories]
	df = df[cols_to_keep]

	# Change `founded_on` from date string to no. of years from today
	today = pd.Timestamp.today()
	df['founded_on'] = (today - df['founded_on']) / pd.Timedelta(365, unit="d")

	# Cast/Round columns
	df['founded_on'] = df['founded_on'].round(0).astype(int)
	for _ in categories:
			df[_] = df[_].round(0).astype(int)

	# Find distribution of `company_age` for all categories
	df_count_all =  df['founded_on'].value_counts().sort_index().to_frame()
	df_count_all.reset_index(inplace=True)
	df_count_all.rename(columns={'index': 'company_age', 'founded_on': 'all'}, inplace=True)

	# Find company age distribution for each category in `categories` array
	df_category_counts = [df_count_all]

	for _ in categories:
		temp = df[df[_] == 1]
		df_count = temp['founded_on'].value_counts().sort_index().to_frame()
		df_count.reset_index(inplace=True)
		df_count.rename(columns={'index': 'company_age', 'founded_on': _},inplace=True)
		df_category_counts.append(df_count)
	
	# Merge the dataframes together
	df_merged = reduce(lambda left,right: pd.merge(left, right, on='company_age', how='left'),df_category_counts)

	# Fill NaN generated from natural left join
	for _ in categories:
			df_merged[_] = df_merged[_].fillna(0).astype(int)
	
	return df_merged.to_csv(index=False)


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


@app.route('/features/top-investors')
def top_investments():
	df = pd.read_csv("../bulk_export_processed/investors_processed.csv")
	
	# Drop unnecessary columns
	keep_col = ['name', 'investment_count']
	df = df[keep_col]

	# Drop NaN and filter out investors with investment_count < 100
	df.dropna(axis=0, how='any', subset=['investment_count'], inplace=True)
	df.drop(df[df['investment_count'] < 100].index, inplace=True)

	# Cast `investment_count` to int & sort in descending order
	df['investment_count'] = df['investment_count'].astype(int)
	df.sort_values(by='investment_count', axis=0, ascending=False, inplace=True)
	
	# Get the first N rows (ie. top N investors)
	df = df[:10]

	# Reset the index & rename the columns
	df.reset_index(inplace=True)
	df.drop(axis=1, labels='index', inplace=True)
	df.rename(columns={'name': 'x_labels', 'investment_count': 'y_values'}, inplace=True)

	return df.to_csv(index=False)


@app.route('/features/num-acquisitions')
def num_acquisitions():
	return 0


@app.route('/features/acquisition-price')
def acquisition_price():
	df = pd.read_csv("../Week3_Onwards/unifed_csv_20210124_2.csv")
	series = df['acq_price_usd']

	series.dropna(inplace = True)

	df = series.to_frame()

	# drop the index greater than 500,000,000
	df.drop(df[df['acq_price_usd'] > 500000000].index, inplace = True)

	df.rename(columns={'acq_price_usd': 'x_values'}, inplace=True)

	return df.to_csv(index = False)


@app.route('/features/funds-raised')
def funds_raised():
	df = pd.read_csv("../Week3_Onwards/unifed_csv_20210124_2.csv")
	series = df['total_funding_usd']

	df = series.to_frame()
	df.dropna(inplace=True)

	# drop the index greater than 50,000,000
	df.drop(df[df['total_funding_usd'] > 50000000].index, inplace = True)
	df.rename(columns={'total_funding_usd': 'x_values'}, inplace=True)

	return df.to_csv(index = False)


@app.route('/features/top-acquirers')
def num_companies_owned():

	df = pd.read_csv("../bulk_export_processed/acquisitions_processed.csv")

	# Count Values
	series = df['acquirer_name'].value_counts()

	# convert back to dataframe
	df = series.to_frame()
	df.reset_index(inplace=True)
	df.rename(columns={'index': 'x_labels', 'acquirer_name': 'y_values'}, inplace=True)

	# Get the first N rows (ie. top N investors)
	df = df[:10]

	return df.to_csv(index=False)



@app.route('/features/founder-edu')
def founder_exp():
	df = pd.read_csv("../Week3_Onwards/unifed_csv_without_duplicated_company.csv")

	# Count frequency for different degree types
	df_edu = df['degree_type'].value_counts().to_frame()
	df_edu.reset_index(inplace=True)
	df_edu['index'] = df_edu['index'].astype(int).astype(str)

	# Rename columns & remove `x_label == '0'`
	df_edu.rename(columns={'index': 'x_labels', 'degree_type': 'y_values'}, inplace=True)
	df_edu = df_edu[1:]

	# Convert x_label values from numbers to actual meaning
	x_label_convert = {1: "Bachelor", 2: "Master", 3: "PhD"}

	for key, value in x_label_convert.items():
			df_edu.at[key, 'x_labels'] = value
	
	return df_edu.to_csv(index=False)


@app.route('/features/funding-location')
def funding_location():
	df = pd.read_csv("../Week3_Onwards/unifed_csv_20210124_2.csv")

	# Count no. of startups from different countries
	df_countries = df['country_code'].value_counts().to_frame()
	df_countries.reset_index(inplace=True)
	df_countries.rename(columns={'index': 'country_code', 'country_code': 'count'}, inplace=True)

	return df_countries.to_csv(index=False)


'''
Misc
'''

@app.route('/map/countries-geojson')
def countries_geojson():
	with open('countries.json') as file:
		countries = json.load(file)

		return json.dumps(countries)
