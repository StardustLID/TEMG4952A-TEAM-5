# Project Dependencies

This markdown gives a list of the programming languages, libraries and frameworks used in this project.

## Front-End

Front-end uses [React](https://reactjs.org/) as the main library to build the user interface. On top of that, the following npm modules are used (The full list can be found in `frontend/package.json`):

### [Material UI](https://material-ui.com/)

A React component library that adopts the [Material Design](https://material.io/design) design language developed by Google.

```json
"@material-ui/core": "^4.11.2",
"@material-ui/data-grid": "^4.0.0-alpha.18",
"@material-ui/lab": "^4.0.0-alpha.57",
```

The `@material-ui/core` module contains the core components such as navigation bar, checkbox, button and card components. The `@material-ui/data-grid` module is for the data table component used to display the list of companies worth investing. The `@material-ui/lab` module contains the search bar with autocomplete component used in the "Funding per Round" tab in "Features Visualization" page.

### [D3.js](https://d3js.org/)

A Javascript library for drawing data visualization graphs using SVG. It is used extensively in the "Features Visualization" page for creating dynamic data visualization graphs such as bar charts, line graph and histogram.

```json
"d3": "^6.3.1",
```

### [Leaflet.js](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)

Leaflet.js is a Javascript library for adding interactive maps while React Leaflet is a React component library for adding Leaflet.js maps to the React app. These two libraries are used for adding the interactive world map used in "Founding Location" tab of "Features Visualization" page.

```json
"leaflet": "^1.7.1",
"react-leaflet": "^3.0.5",
```

### [Axios](https://github.com/axios/axios)

A Javascript library for making HTTP requests. This is used for calling APIs of our back-end Flask server.

```json
"axios": "^0.21.1"
```

## Back-End Server

### [Flask](https://flask.palletsprojects.com/en/1.1.x/)

A Python micro-framework that acts as a server. Flask APIs are written inside `backend/app.py` and they are used to pass data from the back-end model training results to the front-end.

## Back-end Model

Back-end uses Jupyter Notebook (`.ipynb` files) to perform data preprocessing and model training on CSV (`.csv` files). All codes are written in Python. The followings are used:

### Computation Related

```py
import pandas as pd                     # data analysis library
import numpy as np                      # array and matrix library
import scipy                            # scientific computing library
import dc_stat_think as dcst            # DataCamp Statistical Thinking utilities

import datetime as dt                   # Python module for date, time manipulation
from dateutil.relativedelta import *    # extensions to standard datetime module
from collections import Counter         # Python module for extra data structures
import math                             # Python module for math
```

### Data Visualization

```py
import matplotlib.pyplot as plt         # MATLAB-like plotting library
import seaborn as sns                   # statistical graphics library
```

### PCA (Principle Component Analysis)

```py
import prince                           # factor analysis library with sklearn API by randomized SVD
from sklearn.decomposition import PCA   # PCA library
```

### General ML

```py
from sklearn.preprocessing import LabelEncoder          # label encoder for
from sklearn.preprocessing import OneHotEncoder         # one-hot encoder for categorical features
from sklearn.pipeline import Pipeline                   # pipeline to assemble cross-validated transformations

from sklearn.model_selection import train_test_split    # split training and testing sets

from sklearn import metrics
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
```

### Regression

```py
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LogisticRegression
```

### Clustering

```py
from sklearn.cluster import KMeans      # K-means library
```
