# TEMG4952A - Team 5 Dependencies
This markdown gives a list of the programming languages, libraries and frameworks used in this project.

## Front-End
Front-end uses Javascript with `React.js` to code the web app front-end, and Python with `Flask` to code the web app back-end.
For the web app front-end, the followings are used:

## Back-End
Back-end uses Jupyter Notebook (`.ipynb` files) to perform data preprocessing and model training on CSV (`.csv` files). All codes are written in Python. The followings are used:

### Computation Related
```
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
```
import matplotlib.pyplot as plt         # MATLAB-like plotting library
import seaborn as sns                   # statistical graphics library
```

### PCA (Principle Component Analysis)
```
import prince                           # factor analysis library with sklearn API by randomized SVD
from sklearn.decomposition import PCA   # PCA library
```

### General ML
```
from sklearn.preprocessing import LabelEncoder          # label encoder for
from sklearn.preprocessing import OneHotEncoder         # one-hot encoder for categorical features
from sklearn.pipeline import Pipeline                   # pipeline to assemble cross-validated transformations

from sklearn.model_selection import train_test_split    # split training and testing sets

from sklearn import metrics
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
```

### Regression
```
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LogisticRegression
```

### Clustering
```
from sklearn.cluster import KMeans      # K-means library
```