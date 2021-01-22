# TEMG4952A - Team 5 Weekly Progress

## Week 1 (30 Dec - 3 Jan)

### Overall Project Related
* Pending for UBS Managers' reply to SOW/LOA
* Unified team members' dev environments and standards to use
* Obtained business insights after discussion, such as target of optimization, ways to measure "success" of companies, how to form a portfolio, etc

<br/>

### Front-End
| Date     | Tasks                                           |
|----------|-------------------------------------------------|
| 31-12-20 | Set up for the React app project with `Flask`   |
| 02-01-21 | Build header & sidebar by `React.js`            |
| 03-01-21 | Restructure header & sidebar with `Material-UI` |
| 03-01-21 | Discussed Figma design                          |

<br/>

### Back-End
| Date     | Tasks                                                        |
|----------|--------------------------------------------------------------|
| 30-12-20 | Obtained Crunchbase dataset                                  |
| 01-01-21 | Selected relevant columns for processing                     |
| 02-01-21 | Data cleansing for categories, funding rounds and other CSVs |
| 03-01-21 | Sliced the CSV into <100 MB each                             |

<br/>

## Week 2 (4 Jan - 10 Jan)

### Overall Project Related
* Confirmed that responsive UI, word description data have very low priority

<br/>

### Front-End
| Date     | Tasks                                         |
|----------|-----------------------------------------------|
| 05-01-21 | Improved Home page appearance and added cards |
| 07-01-21 | Added wrappers for Home page's D3.js charts   |
| 08-01-21 | Created a dynamic D3.js scatterplot           |
| 08-01-21 | Added tables with dummy data in Home page     |
| 10-01-21 | Added a wrapper for a dynamic multi-bar chart |

<br/>

### Back-End
| Date     | Tasks                                                      |
|----------|------------------------------------------------------------|
| 04-01-21 | Added generic one-hot encoder for `ipo.csv` and other CSVs |
| 06-01-21 | Joined all dataframes for data integration (file >60GB)    |
| 07-01-21 | Improved the efficiency of encoders used                   |
| 08-01-21 | Joined all dataframes for data integration (file 1.48GB)   |
| 11-01-21 | Added preliminary data visualizations                      |

<br/>

## Week 3 (11 Jan - 17 Jan)
### Overall Project Related

<br/>

### Front-End
| Date     | Tasks                                 |
|----------|---------------------------------------|
| 12-01-21 | Completed Iteration 1 of Figma design |
| 13-01-21 | Added generic D3 chart files          |
| 14-01-21 | Successfully served CSV from backend  |

<br/>

### Back-End
| Date     | Tasks                                                                     |
|----------|---------------------------------------------------------------------------|
| 12-01-21 | Parsed `datetime` objects and processed them                              |
| 16-01-21 | Decision tree model completed with 0.94 accuracy                          |
|          | Geographical plot by CSV from `Simplemap.com` and Python `folium` library |
|          | Percentile plot (x-axis: cumulative % of momentum, y-axis: momentum)      |

<br/>

## Week 4 (18 Jan - 24 Jan)
### Overall Project Related
* 1st meeting with UBS mentor, reviewed front-end design
* Agreed that the main focus should be the relationship between features, instead of the distributions of individual features

<br/>

### Front-End
| Date     | Tasks                                          |
|----------|------------------------------------------------|
| 18-01-21 | Learned and adopted `Leaflet.js` for world map |
<br/>

### Back-End
| Date     | Tasks                                                                                                                                                                    |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 19-01-21 | Linear and polynomial regression models completed. Low accuracy due to the discrete nature of x-labels including employee / investor counts and one-hot encoded features |
|          | K-means clustering model completed. Low accurary due to high dimensionality of data                                                                                      |
| 20-01-21 | Performed PCA (principle component analysis) on `category_list`. Used 5 components to represent 94% of fintech categories                                                |
<br/>

## Week 5 (25 Jan - 31 Jan)
**--------------------    Final week    --------------------**
### Overall Project Related
<br/>

### Front-End
<br/>

### Back-End
<br/>