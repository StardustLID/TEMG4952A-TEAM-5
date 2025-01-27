from flask import Flask
from flask import request
from flask_cors import CORS
import pandas as pd
from functools import reduce
import json
import numpy as np

app = Flask(__name__)
CORS(app)

# Api Search bar
@app.route('/SearchBar')
def searchbar():
	df = pd.read_csv("../data_and_model/unified_csv.csv")
	df = df["company_name"]

	return df.to_csv(index=False)


# Top 400 worth investing companies
@app.route('/top-companies')
def top_companies():
	df = pd.read_csv("../data_and_model/predicted_best_100.csv")
	df['average_momentum'] = df['average_momentum'].round(3)
	df.reset_index(inplace=True)

	return df.to_csv(index=False)


# Api for the Changable Graph
@app.route('/ChangableGraph', methods = ["POST"])
def ChangableGraph():
	data = request.get_json()

	import pandas as pd
	df = pd.read_csv("../data_and_model/unified_csv.csv")

	cols_to_keep = ['company_name', 'employee_count', 'founded_on', 'degree_type', "first_fund_raised", "average_momentum", "fd_rd_num_invested_by_top_100", "first_fund_investor_count"]
	df = df[cols_to_keep]

	df.dropna(inplace = True)

	# drop the row with negative mean momentum & unknown employee count
	df.drop(df[df['average_momentum'] < 0].index, inplace = True)
	df.drop(df[df['employee_count'] == "unknown"].index, inplace = True)
	df.drop(df[df['first_fund_investor_count'] > 80].index, inplace = True)
	df.drop(df[df['first_fund_raised'] > 25000000].index, inplace = True)


	# log first fund raised
	df.drop(df[df['first_fund_raised'] == 0].index, inplace = True)
	df["first_fund_raised_log"] = np.log10(df["first_fund_raised"])
	
	# Add a column called `is_top` to indicate whether the company is in top 10%
	df_top = pd.read_csv("../data_and_model/predicted_best_100.csv")
	df_top = df_top['company_name'].to_frame()

	top_companies = []

	for index, row in df_top.iterrows():
			top_companies.append(row['company_name'])

	df['is_top'] = df['company_name'].isin(top_companies).astype(int)

	# rename the col
	df.rename(columns={'founded_on': 'company_age', 'degree_type': 'degree_level', 
	'first_fund_raised': 'first_fund', 'average_momentum': 'mean_momentum',
	 "fd_rd_num_invested_by_top_100": "num_invested", "first_fund_investor_count": "investor_count", 
	 "first_fund_raised_log": 'first_fund_log'}, inplace=True)

	df.rename(columns={data['xaxis']: 'xdata', data['yaxis']: 'ydata', }, inplace=True)

	df = df[['xdata', 'ydata', 'is_top']]
	
	return df.to_csv(index=False)


'''
Features Visualization
'''

@app.route('/features/num-employees')
def num_employees():
	df = pd.read_csv("../data_and_model/unified_csv.csv")
	series = df['employee_count'].value_counts()

	# Remove "unknown" column
	series.drop(labels='unknown', inplace=True)

	# Re-order the CSV rows
	df_num = series.to_frame()
	df_num = df_num.reindex(["1-10", "11-50", "51-100", "101-250", "251-500", "501-1000", "1001-5000", "5001-10000"])
	
	# Prepare the dataframe to be converted to CSV string
	df_num.reset_index(inplace=True)	# Stop using x axis labels as the dataframe's index
	df_num.rename(columns={'employee_count': 'y_values', 'index': 'x_labels'}, inplace=True)

	# Convert dataframe to CSV string
	return df_num.to_csv(index=False)


@app.route('/features/company-age')
def company_age():
	df = pd.read_csv("../data_and_model/unified_csv.csv")

	# Remove unnecessary columns
	categories = ['Commerce and Shopping', 'Financial Services', 'Lending and Investments', 'Payments']
	cols_to_keep = ['founded_on', *categories]
	df = df[cols_to_keep]

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
	
	df_merged.rename(columns={'Commerce and Shopping': 'commerce_shopping', 'Financial Services': 'fin_services', 'Lending and Investments': 'lending_invests', 'Payments': 'payments'}, inplace=True)

	return df_merged.to_csv(index=False)


@app.route('/features/funding-rounds')
def funding_rounds():
	df = pd.read_csv("../data_and_model/unified_csv.csv")
	series = df['num_funding_rounds'].value_counts().sort_index()

	# Remove num_funding_rounds == 0
	df = series.to_frame()
	df = series.reset_index().drop(index=0)

	# Tidy up the dataframe
	df['index'] = df['index'].astype(int).astype(str)
	df.rename(columns={'index': 'x_labels', 'num_funding_rounds': 'y_values'}, inplace=True)

	# Find the sum of companies
	df.iloc[7,1] = df.iloc[7:, 1].sum()
	df.iloc[7,0] = '≥10'
	df = df[:8]    # Only take the first 9 rows

	return df.to_csv(index=False)


@app.route('/features/funding-per-round', methods = ["POST"])
def funding_per_round():
	input = request.get_json()

	df = pd.read_csv("../data_and_model/frontend_funding_per_round_list.csv")
	row = df.loc[df["org_name"] == input["name"]]

	# remove signs and split string to array
	date = row.announced_on_list.array[0].replace("[", "").replace("]", "").replace("'", '').split(', ')
	invest_type = row.investment_type_list.array[0].replace("[", "").replace("]", "").replace("'", '').split(', ')
	raised_amount = row.raised_amount_usd_list.array[0].replace("[", "").replace("]", "").split(', ')
	investor_count = row.investor_count_list.array[0].replace("[", "").replace("]", "").split(', ')
	announced_on = row.announced_on_list.array[0].replace("[", "").replace("]", "").replace("'", '').split(', ')

	data =  {'date': date, 'invest_type': invest_type, 'raised_amount': raised_amount, 'investor_count': investor_count, 'announced_on': announced_on}
	df = pd.DataFrame(data)

	# add a dummy data for the visualization
	new_row = pd.DataFrame({'date': "2010-01-01", 'invest_type': "null", 'raised_amount': 0, 'investor_count': 0}, index=[0])
	df = pd.concat([new_row, df]).reset_index(drop = True) 

	return df.to_csv(index=False)


@app.route('/features/funds-raised')
def funds_raised():
	df = pd.read_csv("../data_and_model/unified_csv.csv")
	series = df['total_funding_usd']

	df = series.to_frame()
	df.dropna(inplace=True)

	# drop the index greater than 50,000,000
	#df.drop(df[df['total_funding_usd'] > 50000000].index, inplace = True)
	df.drop(df[df['total_funding_usd'] == 0].index, inplace = True)

	df['total_funding_usd'] = np.log10(df['total_funding_usd'])

	df.rename(columns={'total_funding_usd': 'x_values'}, inplace=True)

	return df.to_csv(index = False)

@app.route('/features/first-fund')
def first_fund():
	df = pd.read_csv("../data_and_model/unified_csv.csv")
	series = df['first_fund_raised']

	df = series.to_frame()
	df.dropna(inplace=True)

	df.drop(df[df['first_fund_raised'] == 0].index, inplace = True)

	df['first_fund_raised'] = np.log10(df['first_fund_raised'])

	df.rename(columns={'first_fund_raised': 'x_values'}, inplace=True)

	return df.to_csv(index = False)


@app.route('/features/executives-edu')
def founder_exp():
	df = pd.read_csv("../data_and_model/unified_csv.csv")
	df_degree = df['degree_type'].to_frame()
	df_degree.rename(columns={'degree_type': 'x_values'}, inplace=True)
	
	return df_degree.to_csv(index=False)


@app.route('/features/funding-location')
def funding_location():
	df = pd.read_csv("../data_and_model/unifed_csv_20210124_2.csv")

	# Count no. of startups from different countries
	df_countries = df['country_code'].value_counts().to_frame()
	df_countries.reset_index(inplace=True)
	df_countries.rename(columns={'index': 'country_code', 'country_code': 'count'}, inplace=True)

	return df_countries.to_csv(index=False)


@app.route('/features/top-companies-cities')
def top_companies_cities():
	df = pd.read_csv("../data_and_model/unified_csv.csv")
	cities = ['city_London','city_New York','city_San Francisco','city_Los Angeles','city_Singapore','city_Amsterdam','city_Toronto','city_Mumbai','city_Paris','city_Chicago','city_Bangalore','city_São Paulo','city_New Delhi','city_Berlin','city_Beijing','city_Sydney','city_Madrid','city_Tokyo','city_Austin','city_Boston']
	cols_to_keep = ['company_name', *cities]
	df = df[cols_to_keep]

	df_top = pd.read_csv("../data_and_model/predicted_best_100.csv")
	df_top = df_top['company_name'].to_frame()

	pd_merged = pd.merge(df, df_top, on='company_name')

	counts = {}

	for _ in cities:
			df_temp = pd_merged[_].value_counts().to_frame()
			if df_temp.iloc[0][_] == len(pd_merged):
					counts[_] = 0
			else:
					counts[_] = int(df_temp.iloc[1][_])
	
	return counts


'''
Misc
'''

@app.route('/map/countries-geojson')
def countries_geojson():
	with open('countries.json') as file:
		countries = json.load(file)

		return json.dumps(countries)
