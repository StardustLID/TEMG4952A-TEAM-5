# TEMG4952A - Team 5 Project Methodology

This markdown records the methodology used in this project, including Crunchbase CSV treatment, data preprocessing and model training, and analysis of the business insights to UBS.

## Crunchbase CSV Treatment

| File Name                      | Remarks                                |
|--------------------------------|----------------------------------------|
| acquisitions                   |                                        |
| <del>category_groups           | duplicate with `organizations.csv`     |
| <del>checksum                  | /                                      |
| degrees                        |                                        |
| event_appearances              |                                        |
| <del>events                    | little useful info                     |
| funding_rounds                 |                                        |
| funds                          |                                        |
| investment_partners            |                                        |
| investments                    |                                        |
| investors                      |                                        |
| ipos                           |                                        |
| jobs                           |                                        |
| org_parents                    |                                        |
| <del>organization_descriptions | too wordy, hard to extract useful info |
| organizations                  | fintech, 2010-1-1 to 2020-12-31 only   |
| people                         |                                        |
| <del>people_descriptions       | too wordy, hard to extract useful info |


## Data Preprocessing 
* `organizatons.csv` is used as the foundation to join other dataframes
* Most categorical features are one-hotted or dropped if there are too many null values
* Numerical features are min-max scaled


## Machine learning Models

### *Step 1 Filtering out "successful" companies by **Decision Tree** and **Logistic Regression***
Only companies predicted as successful by both models will proceed to the next stage.

### *Step 2 Rank the companies that are identified as "successful" by **Polynomial Regression***
The polynomial regression obtained about 60% accuracy.

### *Step 3 Top 100 companies sorted by Average Momentum are output for visualization*
Please see the front-end web app for details.


## Analysis of Business Insights
1. Geographical Startup Cradles like India, Los Angeles usually give more high-momentum startups. 

2. First Funding Metrics of startups are extensively used in model predictions

3. Startups tend to grow faster if they are invested by **Top 100 Investors**

4. Executives of high momentum startups usually major in STEM and Arts

