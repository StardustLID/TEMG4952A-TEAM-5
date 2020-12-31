# TEMG4952A - Team 5

The repository of Team 5 for the HKUST course TEMG4952A "Special Project: Financial Investment Prototyping for UBS Zurich".

## 1. Initial Set-up

Prerequisite: Install Python 3 in your system.

### 1.1 For Windows Users,

1. Open Powershell and change directory to this repository's root (`cd path\to\root\here`)
2. Run the following commands:

   ```
   cd .\backend\
   py -m venv venv
   .\venv\Scripts\activate
   pip install flask flask-cors python-dotenv
   flask run
   ```

3. Keep this Powershell window running in background. At the same time, open another Powershell window and change directory to this repository's root
4. Run the following commands:
   ```
   cd .\frontend\
   npm install
   npm start
   ```
5. Both frontend and backend servers are now running

### 1.2 For Mac Users,

1. Open Terminal and change directory to this repository's root (`cd path/to/root/here`)
2. Run the following commands:

   ```
   cd backend/
   python3 -m venv venv
   . venv/bin/activate
   pip install flask flask-cors python-dotenv
   flask run
   ```

3. Keep this Terminal window running in background. At the same time, open another Terminal window and change directory to this repository's root
4. Run the following commands:
   ```
   cd frontend/
   npm install
   npm start
   ```
5. Both frontend and backend servers are now running

## 2. Start Development Server

### 2.1 For Windows Users,

1. Open Powershell and change directory to this repository's root
2. Run the following commands:
   ```
   cd .\backend\
   .\venv\Scripts\activate
   flask run
   ```
3. Keep this Powershell window running in background. At the same time, open another Powershell window and change directory to this repository's root folder
4. Run the following commands:
   ```
   cd .\frontend\
   npm start
   ```
5. Also keep this Powershell window running in background

### 2.2 For Mac Users,

1. Open Terminal and change directory to this repository's root
2. Run the following commands:
   ```
   cd backend/
   . venv/bin/activate
   flask run
   ```
3. Keep this terminal window running in background. At the same time, open another terminal window and change directory to this repository's root folder
4. Run the following commands:
   ```
   cd frontend/
   npm start
   ```
5. Also keep this terminal window running in background
