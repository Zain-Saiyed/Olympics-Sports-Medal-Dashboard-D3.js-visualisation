# Olympics Sports Medal Dashboard - D3.js-visualisation
[![Netlify Status](https://api.netlify.com/api/v1/badges/5db0217c-f654-4524-8747-f7f0ae4364a3/deploy-status)](https://app.netlify.com/sites/olympic-sport-summary/deploys)

![D3 JS](https://img.shields.io/badge/d3%20js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white)
![Java Script](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)

#### Supported Web browsers:
![Google Chrome](https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white)
![Firefox](https://img.shields.io/badge/Firefox_Browser-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)
![Microsoft Edge](https://img.shields.io/badge/Microsoft_Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white)
![Brave](https://img.shields.io/badge/Brave-FF1B2D?style=for-the-badge&logo=Brave&logoColor=white)
![Opera GX](https://img.shields.io/badge/Opera-FF1B2D?style=for-the-badge&logo=Opera&logoColor=white)

## Overview:

D3 visualisation dashboard for Summer Olympics Sports Medals analysis. Dashboard contains the following charts: 
* Stacked bar
* Polar area diagram
* Bar chart
* Choropleth maps
* Radar chart
* Scatter plot
* Multi-line chart. 

| Description | URL|
| -- | -- |
| Deployed Site | https://olympic-sport-summary.netlify.app/ |
| Backend URL   | https://olympic-viz.onrender.com |
| Project code  | https://github.com/Zain-Saiyed/olympic-viz.git |

## Project structure:

The `backend` folder contains the FAST API Python REST API for serving the olympic sumamry data.
```
-- Folders --

olympic-viz/
└───backend/
    │   main.py
    │   render.yaml
    │   requirements.txt
    │   start_server.bat
    │
    ├───dataset
    │   |───data.csv
    │
    ├───routers
    │   │───homepage_router.py
```

**Folders:**

1. `dataset/`: Contains the dataset for the summer olympic data.
2. `routers/`: Contains router files for handling different routes.
3. `main.py` : Main Python file for the backend application.
4. `render.yaml`: YAML file for deploying on render as a web service.
5. `requirements.txt`: File listing the required Python packages for the application.
6. `start_server.bat`: Batch file for starting the server.
7. `data.csv`: CSV file containing the dataset.
8. `homepage_router.py`: Router file for handling the routes of the backend API.


The `backend` folder contains the FAST API Python REST API for serving the olympic sumamry data.
```
-- Folders --

olympic-viz/
└───frontend/
    │   .env
    │   .gitignore
    │   package-lock.json
    │   package.json
    │   README.md
    │   tsconfig.json
    │   yarn.lock
    │
    ├───public
    │       favicon.ico
    │       index.html
    │       logo192.png
    │       logo512.png
    │       manifest.json
    │       robots.txt
    │
    └───src
        │   App.css
        │   App.test.tsx
        │   App.tsx
        │   AppRouter.tsx
        │   index.css
        │   index.tsx
        │   logo.svg
        │   react-app-env.d.ts
        │   reportWebVitals.ts
        │   setupTests.ts
        │
        ├───assets
        │       world.geojson.txt
        │
        ├───Components
        │       BarChartHelper.js
        │       ChartHelper.js
        │       ChoroplethChartHelper.js
        │       LineChartHelper.js
        │       PolarAreaChartHelper.js
        │       RadarChartHelper.js
        │       TextHelper.js
        │       Utility.js
        │
        └───Pages
                AthleteAnalysis.js
                CountryComparison.js
                DemographicsInsights.js
                HistoricalTrends.js
                HomePage copy.js
                HomePage.js
                LayoutNavbar.js
```

**Folders:**

1. `frontend/`: Main directory containing the frontend code.
2. `public/`: Contains static assets and files.
3. `src/`: Contains the source code for the frontend application.

**Files:**

1. `.env`: Environment file which contains the backend URL.
2. `.gitignore`: Git ignore file.
3. `package-lock.json`: Package lock file for npm packages.
4. `package.json`: File containing npm package dependencies and scripts.
5. `index.html`: index HTML entry point file.
6. `robots.txt`: Robots.txt file for search engine indexing.
7. `App.css`: CSS file for the main App component.
8. `App.tsx`: Main App component file.
9. `AppRouter.tsx`: App Router component file.
10. `index.css`: CSS file for index.js.
11. `world.geojson.txt`: GeoJSON data file.
12. Files in the `Components/` directory: These are the chart components for rendering the different charts
    - `BarChartHelper.js`
    - `ChartHelper.js`
    - `ChoroplethChartHelper.js`
    - `LineChartHelper.js`
    - `PolarAreaChartHelper.js`
    - `RadarChartHelper.js`
    - `TextHelper.js`
    - `Utility.js`
13. Files in the `Pages/` directory: these are the main pages which render the different components on teh different pages. 
    - `AthleteAnalysis.js`
    - `CountryComparison.js`
    - `DemographicsInsights.js`
    - `HistoricalTrends.js`
    - `HomePage copy.js`
    - `HomePage.js`
    - `LayoutNavbar.js`


## Interactivity:

### I. [Bar Charts](https://github.com/Zain-Saiyed/olympic-viz/blob/main/frontend/src/Components/BarChartHelper.js)
#### 1. [createCountBarChart](https://github.com/Zain-Saiyed/olympic-viz/blob/main/frontend/src/Components/BarChartHelper.js) Function:

1. Upon hovering over a bar, the bar's border is highlighted with a black border of fixed width.
2. Upon hovering over a bar, the opacity of the bar is increased to 0.9 to make it fully visible.
3. Load animation is added such that upon page load, the bars are visible after a delay, and the legend pops up from the middle of the chart.

#### 2. [createStackedBarChart](https://github.com/Zain-Saiyed/olympic-viz/blob/main/frontend/src/Components/BarChartHelper.js) Function:

1. Upon hovering over a bar, the bar's border is highlighted with a black border of fixed width.
2. Upon hovering over a bar, the opacity of the bar is increased to 0.9 to make it fully visible.
3. Upon hovering over a bar, the corresponding legend entry is highlighted.
4. Upon hovering over a bar, its text labels are made bold and enlarged for clarity.
5. Upon moving out from a bar, the chart is reverted to its original attributes.

### II. [Choropleth Chart](https://github.com/Zain-Saiyed/olympic-viz/blob/main/frontend/src/Components/ChoroplethChartHelper.js)

#### 1. [createChoroplethChart](https://github.com/Zain-Saiyed/olympic-viz/blob/main/frontend/src/Components/ChoroplethChartHelper.js) Function:

1. Upon hovering over a country on the map:
   - Opacity of all other countries decreases to 0.5 to highlight the selected country.
   - Opacity of the selected country increases to 1.
   - The stroke color of the selected country changes to black for better visibility.
   - A tooltip appears, displaying the country name, total medals, and year.
   - Tooltip's position is dynamically adjusted to follow the mouse cursor.

2. After moving the mouse cursor away from the selected country:
   - Opacity of all countries resets to 0.8.
   - The stroke color of the selected country resets to transparent.
   - The tooltip fades out and disappears.

### III. [Line Charts](https://github.com/Zain-Saiyed/olympic-viz/blob/main/frontend/src/Components/LineChartHelper.js)
#### 1. [Multi-Line](https://github.com/Zain-Saiyed/olympic-viz/blob/main/frontend/src/Components/LineChartHelper.js) Chart:

1. Upon hovering over a legend item:
   - Opacity of lines corresponding to the selected country increases, highlighting them.
   - The stroke width of the selected line increases for better visibility.
   - Text of the legend item becomes bold to indicate the selection.

2. After moving the mouse away from the legend item:
   - Opacity of all lines resets to 1, removing the highlight effect.
   - The stroke width of all lines resets to default.
   - Text of the legend item returns to normal font weight.

#### 2. [Scatter](https://github.com/Zain-Saiyed/olympic-viz/blob/main/frontend/src/Components/LineChartHelper.js)  Chart:

1. Upon hovering over a legend item:
   - Opacity of points corresponding to the selected country increases, highlighting them.
   - The border color of the selected points changes to match the color of the legend item.
   - The border width of the selected points increases for better visibility.
   - Text of the legend item becomes bold to indicate the selection.

2. After moving the mouse away from the legend item:
   - Opacity of all points resets to 1, removing the highlight effect.
   - The border color and width of all points reset to default.
   - Text of the legend item returns to normal font weight.


### IV. [Polar Area Diagram](https://github.com/Zain-Saiyed/olympic-viz/blob/main/frontend/src/Components/PolarAreaChartHelper.js):
1. Upon hovering over a pie slice:
    - The stroke color of the slice changes to black, enhancing visibility.
    - Opacity of other pie slices decreases, providing focus on the selected slice.
    - Corresponding text labels and connecting lines become bold and opaque, respectively.

2. After moving the mouse away from the slice:
    - The stroke color of the slice resets to white.
    - Opacity of all pie slices resets to full, restoring visibility.
    - Text labels return to normal font weight and opacity.
    - Connecting lines return to normal opacity.

## Setup:

### Pre-requisite:

1. **Python Installation:**

    _If Python is already installed, please skip this step. else continue._

    For Windows, MacOS & Linux:

    Visit the official Python downloads website ( [Downlaod Python Here](https://www.python.org/downloads/) ), and download and install latest Python by following instructions given on the website.

2. **Download the Project Code:**

    To download the project code follow either step-1 or step-2:

    1. _Clone the repository:_

        Clone the repository by executing the following command:

        ```
        git clone https://github.com/Zain-Saiyed/olympic-viz.git

        cd backend/
        ```

    2. _Download the repository as .zip:_

        - Click the green **"<> Code"** button on top right corner.
        - then, Click **"Download ZIP"**. 
        - Extract the zip file contents, and open the folder containing the extarcted files.

3. **Start the server:**

    _For Windows OS:_
    - Double click the `start_server.bat` file.

    _For MacOS / Linux based OS:_
    - On terminal run `./start_server.sh` script.

    _The above files will first start the Python FASTAPI backend server on `localhost:8000`. You can visist the `/docs` route to test the different GET APIs in the backend._

4. **Frontend Installation:**

    1. Navigate to the `frontend` folder. 
    2. Execute `npm install`, to install all dependencies.
    3. To start the frontend server run: `npm start`
    4. The frontend webapp will open at `http://localhost:3000`. 

## References:

1. **BarChartHelper.js:**

    [1] “Linear scales | D3 by Observable,” _d3js.org_ [Online]. Available: https://d3js.org/d3-scale/linear (accessed Apr. 06, 2024).

2. **ChoroplethChartHelper.js:**

    [1] "World Geo Json Data" _Githubusercontent_ [Online]. Available: https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson (accessed Apr. 06, 2024).
    
    [2] “Basic choropleth map in d3.js,” _d3-graph-gallery.com_ [Online]. Available: https://d3-graph-gallery.com/graph/choropleth_basic.html (accessed Apr. 06, 2024).
    
3. **RadarChartHelper.js:**
    
    [1] “JavaScript function similar to Python range(),” _Stack Overflow_ [Online]. Available: https://stackoverflow.com/questions/8273047/javascript-function-similar-to-python-range (accessed Feb. 12, 2024).
    
    [2] “D3 Spider Chart Tutorial,” _yangdanny97.github.io_ [Online]. Available: https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart (accessed Feb. 12, 2024).
    
    [3] “Radar Chart D3 V4,” _Gist_ [Online]. Available: https://gist.github.com/alandunning/4c36eb1abdb248de34c64f5672afd857 (accessed Feb. 12, 2024).
    
    [4] “radar-chart-d3/src/radar-chart.js at master · alangrafu/radar-chart-d3,” _GitHub_ [Online]. Available: https://github.com/alangrafu/radar-chart-d3/blob/master/src/radar-chart.js (accessed Feb. 12, 2024).

4. **Utility.js:**

    [1] “Plotly colours list,” _Plotly Community Forum_ [Online]. Available: https://community.plotly.com/t/plotly-colours-list/11730 (accessed Apr. 06, 2024).

    [2] “Palette - Coolors,” _Coolors.co_ [Online]. Available: https://coolors.co/palette/7400b8-6930c3-5e60ce-5390d9-4ea8de-48bfe3-56cfe1-64dfdf-72efdd-80ffdb (accessed Apr. 06, 2024).
    
    [3] “Palette - Coolors,” _Coolors.co_ [Online]. Available: https://coolors.co/palette/fff200-ffe600-ffd900-ffcc00-ffbf00-ffb300-ffa600-ff9900-ff8c00-ff8000 (accessed Apr. 06, 2024).

5. **DemographicsInsights.js:**

    [1] “How to style HTML5 range input to have different color before and after slider?,” Stack Overflow [Online]. Available: https://stackoverflow.com/questions/18389224/how-to-style-html5-range-input-to-have-different-color-before-and-after-slider (accessed Apr. 06, 2024).



---
