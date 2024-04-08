import { useEffect, useState } from 'react';
import { display_text, display_axis_label } from '../Components/TextHelper.js';
import { createCountBarChart } from '../Components/BarChartHelper.js';
import { bar_color_palette, primary_text_color_accent, getChartContainer } from '../Components/Utility.js';


const HomePage = () => {
  
  const [medalsData, setMedalsData] = useState(null);
  
  // Iniital useEffect
  useEffect(() => {
    const fetchMedalsData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/summary/medals_trend`);
        const data = await response.json();
        setMedalsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMedalsData();
  }, []);

  // useEffect after data is fetched from backend 
  useEffect(() => {
    if (medalsData) {
      // Format API response for plotting a bar chart
      const formatted_data = Object.entries(medalsData).map(([athlete, medals]) => ({
        Athlete: athlete,
        Medal: medals.Total 
      })).sort((a, b) => b.Medal - a.Medal);
      
      // Get all countries
      const countries = Object.keys(medalsData);
      
      // Create a SVG container
      const chartWidth = 75;
      const svgWidth = window.innerWidth * (chartWidth / 100);
      const svgMargin = { top: 20, right: 20, bottom: 20, left: 20 };
      var height = 500;  

      // Get container
      var chart_svg = getChartContainer("#bar-chart-container", svgWidth, height, svgMargin);
      
      var header1_x = 120;
      var header1_y = 30;
      // Display heading
      chart_svg = chart_svg.append("svg");
      chart_svg = display_text(chart_svg,header1_x,header1_y,"Top 20 Countries with highest total Medals won in Summer Olympics:","28px",primary_text_color_accent)
      const max_height = 200;
      const max_bar_width = 40;
      const bar_spacing = 45;
      
      // Create a simple Bar chart for seeing total medals won by top 20 countries
      createCountBarChart(chart_svg, formatted_data, max_height, max_bar_width, bar_spacing, bar_color_palette,countries);
      display_axis_label(chart_svg,"Countries",svgWidth*.8,height*.8)
      display_axis_label(chart_svg, "Medals", chartWidth*3.5, height*0.4,-90);

     } 

  }, [medalsData]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Olympic Summary Dashboard</h1>

      <h2>Line Chart: Trend of total medals won over the years.</h2>
      <div id="bar-chart-container"></div>
      
    </div>
  )
};

export default HomePage;