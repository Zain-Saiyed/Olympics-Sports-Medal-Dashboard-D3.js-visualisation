import React, { useEffect, useState } from 'react';
import { getChartContainer } from '../Components/Utility.js';
import { display_axis_label } from '../Components/TextHelper.js';
import { createCountBarChart } from '../Components/BarChartHelper.js';
import { createScatterChart } from '../Components/LineChartHelper.js';
import { bar_color_palette, plotly_white_palette } from '../Components/Utility.js';

const AthleteAnalysis = () => {
  const [apiFetchStatus, setApiFetchStatus] = useState(false);
  const [barChartData, setbarChartData] = useState([]);
  const [scatterChartData, setScatterChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Fetch stacked bar chart data
        const barResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/athlete_medal_by_year`);
        const barData = await barResponse.json();
        setbarChartData(barData);
        
        // Fetch line chart data
        const scatterChartResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/country_medals_athletes`);
        const scatterChartData = await scatterChartResponse.json();
        setScatterChartData(scatterChartData);

        setApiFetchStatus(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiFetchStatus(false);
      }
    };

    fetchChartData();
  }, []); 

  useEffect(() => { 
    const athleteNames = barChartData.map(item => item.Athlete);
    const chartWidth = 75;
    const svgWidth = window.innerWidth * (chartWidth / 100);
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
      const max_height = 200;
    const max_bar_width = 40;
    const bar_spacing = 45;
    var height = 600;  // Fixing hight to 500px for now
    
    var chart_svg = getChartContainer("#bar-chart-container", svgWidth, height, margin);

    createCountBarChart(chart_svg, barChartData, max_height, max_bar_width, bar_spacing, plotly_white_palette, athleteNames);
    display_axis_label(chart_svg,"Athletes",svgWidth*0.75,height*.85)
    display_axis_label(chart_svg, "Medals", chartWidth*3.5, height*0.4,-90);

    // =========================================================================================================
    var chart2_height = 500;
    var chart2_width  = 900;
    var chart2_svg = getChartContainer("#scatter-chart-container", svgWidth, height*1.2, margin);
    
    chart2_svg = chart2_svg.append("g") // Append a group element and move it to desired location
                  .attr("transform", `translate(${margin.left*10},${margin.top})`);
    createScatterChart(chart2_svg, scatterChartData, chart2_height, chart2_width, margin, "medals", "athletes");
    display_axis_label(chart2_svg, "# of Medals →"  , svgWidth/2 , height*.85)
    display_axis_label(chart2_svg, "# of Medals →"  , svgWidth/2 , height*.85)
},[apiFetchStatus])

  return (
    <div>
      <h1>Athlete Performance Analysis</h1>
      
      <h2>Bar Chart: Visualise performance of athletes over the years.</h2>
      <div id="bar-chart-container"></div>

      <h2>Scatter Chart: Compare the performance of athletes from different countries.</h2>
      <div id="scatter-chart-container"></div>

    </div>
  );
};

export default AthleteAnalysis;