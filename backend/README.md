# Documentation of Backend

## Week 1

### Current status:

1. Downloaded and pre-preprocessed csv files from crunchbase datasource,
("checksum_processed.csv", "acquisitions_processed.csv", "category_groups_processed.csv", "degrees.csv", "event_appearances_processed_1.csv", "events_processed.csv", "funding_rounds_processed.csv", "funds_processed.csv", "investment_partners_processed.csv", "investors_processed.csv", "ipos_processed.csv", "jobs_processed_1.csv", "org_parents_processed.csv", "organizations_processed_1.csv", "people_processed_1.csv)
including the deletion of unrelated and dummy columns, and revert all csv files to an identical format.

2. Preprocessed csv files, this included filling in NaN values and handle categorical data of csv files.

3. Building the relationship between various csv files, try to combine them together into one pandas dataframe.

4. Contacting the UBS mentors to double check on the expectations on our prediction label.


### Plan for the coming week:

1. Join all csv files, make sure no columns are left behind.

2. Format them neatly into pandas dataframe.

3. Further handle Null and categorical data, assign meaningful values to them.

4. Have a clear goal about what to predict upon receiving a reply from UBS.

5. Ready to build a statistical model and train our data, which will be the major task in the week after next.



## Week 2

### Current status:

1. Joined all csv files, make sure no columns are left behind.

2. Formatted them neatly into pandas dataframe.

3. Further handle Null and categorical data, assign meaningful values to them (partially complete).

4. Had a clear goal about what to predict upon receiving a reply from UBS.


### Plan for the coming week:

1. Consult TA about special data handling.

2. Plot graphs according to features required by UBS, and to plot meaningful graphs (if any).

3. Communicate with frontend for the presentation of those graphs.

4. Investigate on how to alocate $50m portfolio to companies specifying their "size" and "series".

5. Investigate on how to cluster the data by (i) phases, (ii) size, and (iii) FinTech category.

6. Research on PCA and statistical model selection.
