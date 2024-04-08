import * as d3 from 'd3';
import React, { useEffect, useState } from 'react';
import { display_text, display_axis_label } from '../Components/TextHelper.js';
import { createStackedBarChart } from '../Components/BarChartHelper.js';
import { createMultiLineChart } from '../Components/LineChartHelper.js';
import { createRadarChart } from '../Components/RadarChartHelper.js';
import { bar_color_palette, primary_text_color_accent, getChartContainer } from '../Components/Utility.js';


const CountryComparison = () => {
  // State to store selected countries
  // TO DO: (later) ADD country filter
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [apiFetchStatus, setApiFetchStatus] = useState(false);

  // chart data states
  const [stackedBarChartData, setStackedBarChartData] = useState({});
  const [lineChartData, setLineChartData] = useState({});
  const [radarChartData, setRadarChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Fetch stacked bar chart data
        const stackedBarResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/summary/medals_trend`);
        const stackedBarData = await stackedBarResponse.json();
        setStackedBarChartData(stackedBarData);
        
        // Fetch line chart data
        const lineChartResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/total_medal_count_by_year`);
        const lineChartData = await lineChartResponse.json();
        setLineChartData(lineChartData);

        // Fetch radar chart data
        const radarChartResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get_medals_by_country?chart_type=radar`);
        const radarChartData = await radarChartResponse.json();
        setRadarChartData(radarChartData);

        setApiFetchStatus(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiFetchStatus(false);
      }
    };

    fetchChartData();
  }, []); 

  // Display charts
  useEffect(() => {
    if (!apiFetchStatus) {
      return;
    }
    const max_height = 200;
    const max_bar_width = 40;
    const bar_spacing = 45;
    const chartWidth = 75;
    const svgWidth = window.innerWidth * (chartWidth / 100);
    const svgMargin = { top: 50, right: 50, bottom: 50, left: 50 };
    var height = 605; 
    var chart_height = 500; 
    var width  = 800;
    var header1_x = 120;
    var header1_y = 30;
    // Get chart container
    var chart_svg = getChartContainer("#multi-line-chart-container", svgWidth, height, svgMargin);

    chart_svg = createMultiLineChart(chart_svg, lineChartData, chart_height, width, svgMargin);
    display_axis_label(chart_svg, "Year", width, chart_height*1.12);
    display_axis_label(chart_svg, "Medals", -width*0.2, chart_height*0.5,-90);

    // =========================================================================================================


    // Set up chart dimensions
    const chart2Height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    height   = 600 ;
    width   = 1000 ;
  
    // Create SVG container
    var chart2_svg = getChartContainer("#stacked-bar-chart-container", svgWidth, height, svgMargin);
    
    chart2_svg = display_text(chart2_svg,header1_x,-header1_y*0.5,"Top 20 Countries Medals Distribution in Summer Olympics:","28px",primary_text_color_accent)
  
    // Create a stacked bar chart which dsiplays the Total, Gold, Silver and Bronze medal counts for easy comparison
    createStackedBarChart(stackedBarChartData, chart2_svg, width, chart2Height, bar_color_palette, max_height, max_bar_width, bar_spacing);
    display_axis_label(chart2_svg, "Countries",  width, chart2Height*1.22);
    display_axis_label(chart2_svg, "Total number of Medals", -width*0.1, chart2Height*0.5,-90);

    // =========================================================================================================

    
    // Create SVG container
    var chart3_svg = getChartContainer("#radar-chart-container", svgWidth, height*2, svgMargin);
    
    chart3_svg = display_text(chart3_svg,header1_x,-header1_y*0.5,"Top 20 Countries Performance Comparison in Summer Olympics:","28px",primary_text_color_accent)
    chart3_svg = chart3_svg.append("g")
                  .attr("transform", "translate(" + (400) + "," + (300) + ")"); 

    // Create a stacked bar chart which dsiplays the Total, Gold, Silver and Bronze medal counts for easy comparison
    createRadarChart(chart3_svg, radarChartData, bar_color_palette);
  }, [apiFetchStatus]); 

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Country-wise Olympic Performance Comparison</h1>

      <h2>Line Chart: Trends of medal counts for selected countries</h2>
      <div id="multi-line-chart-container"></div>

      <h2>Stacked Bar Chart: Compare gold, silver, and bronze medals for selected countries</h2>
      <div id="stacked-bar-chart-container"></div>

      <h2>Radar Chart: Compare the performance of countries across multiple attributes</h2>
      <div id="radar-chart-container"></div>

    </div>
  );
};

export default CountryComparison;