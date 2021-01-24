# TEMG4952A - Team 5

This is the repository of Team 5 for the HKUST course TEMG4952A "Special Project: Financial Investment Prototyping for UBS Zurich" in 2020-21 Winter Semester.

## Table of Contents

1. [Initial Set-up](#1-initial-set-up)
2. [Start Development Server](#2-start-development-server)
3. [Dependencies](#3-dependencies)
4. [Weekly Progress](#3-weekly-progress)
5. [Weekly Progress](#3-weekly-progress)

## 1. Initial Set-up

Prerequisite: Install Python 3 in your system.

This project's GUI uses [Mapbox](https://www.mapbox.com/maps/)'s APIs to render a world map in data visualization. Mapbox's APIs require an access token that is obtainable after registering for an account in [this page](https://account.mapbox.com/auth/signup/). After registering for an account, head to your [Mapbox account page](https://account.mapbox.com/) and copy your default public token.

1. Create a file called `.env` in the root of the `frontend/` folder
2. Copy the content in `frontend/.env.example` and paste it into the `.env` file you just created. Your `.env` file should look like:
   ```
   REACT_APP_MAPBOX_API_KEY=
   ```
3. At the end of the line, paste in the Mapbox default public token you previously copied from Mapbox's account page
4. For Windows users, follow the remaining steps in [section 1.1](#11-for-windows-users). For Mac users, follow the remaining steps in [section 1.2](#12-for-mac-users).

### 1.1 For Windows Users,

5. Open Powershell and change directory to this repository's root (`cd path\to\root\here`)
6. Run the following commands:

   ```
   cd .\backend\
   py -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   flask run
   ```

   If you encountered the following error when running `.\venv\Scripts\activate`, read item 1.3.1 in the Troubleshooting section.

7. Keep this Powershell window running in background. At the same time, open another Powershell window and change directory to this repository's root
8. Run the following commands:

   ```
   cd .\frontend\
   npm install
   npm start
   ```

### 1.2 For Mac Users,

5. Open Terminal and change directory to this repository's root (`cd path/to/root/here`)
6. Run the following commands:

   ```
   cd backend/
   python3 -m venv venv
   . venv/bin/activate
   pip install -r requirements.txt
   flask run
   ```

7. Keep this Terminal window running in background. At the same time, open another Terminal window and change directory to this repository's root
8. Run the following commands:

   ```
   cd frontend/
   npm install
   npm start
   ```

### 1.3 Troubleshooting

#### 1.3.1 Running scripts is disabled on the system

For Windows users, if you encounter the following error while running `.\venv\Scripts\activate`:

> .\venv\Scripts\activate : File path\to\repo\root\backend\venv\Scripts\Activate.ps1 cannot be loaded because running scripts is disabled on this system.

1. Open "Start" menu by pressing the Window key on the keyboard
2. Search for "Windows Powershell"
3. Run Powershell as Administrator
4. Run the following command:

   `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted`

5. Type `Y` (Yes) when it asks whether you want to change the execution policy
6. Retry the commands in section 1.1 item 6

#### 1.3.2 `npm start` not working

If you failed to run `npm start` after running `npm install` at the `frontend/` directory, try re-installation all the npm packages:

1. Delete `frontend/package-lock.json`
2. Delete `frontend/node_modules` folder
3. Run `npm cache clear --force` at the `frontend` directory
4. Re-run `npm install`

## 2. Start Development Server

### 2.1 Via Command Line

1. `cd frontend/`
2. Windows users: `npm run flask-run-win` ; Mac users: `npm run flask-run-mac`
3. Keep this terminal running in background and open another terminal window. Change directory to this repository's root
4. Run the following commands:

   ```
   cd frontend/
   npm start
   ```

### 2.2 Via VS Code Interface

1. If you have VS Code installed, open this repository's root folder in VS Code.
2. Open the "Explorer" tab at the sidebar with the shortcut of "Ctrl + Shift + E"
3. Expand the "NPM SCRIPTS" tab at the bottom of the Explorer sidebar window
   <br />
   ![npm scripts](./pics/vs_code_npm_scripts.png)
4. For Windows users, hover over `flask-run-win - frontend` and press the right button to run the script
   <br />
   ![npm run flask-run-win](./pics/vs_code_click_flask-run-win.png)

   If you are a Mac user, hover over `flask-run-mac - frontend` and press the right button

5. Hover over `start - frontend` and press the right button to run the script

## 3. Dependencies

[Click here](./Dependencies.md) to see the libraries and frameworks used in this project.

## 4. Project Methodology

[Click here](./ProjectMethodology.md) to see the methodology used in the project, e.g. code structure.

## 5. Weekly Progress

[Click here](./WeeklyProgress.md) to see the work progress for each week.
