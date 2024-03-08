import React, { useEffect } from 'react';
import * as d3 from 'd3';
import LayoutNavbar from '../Pages/LayoutNavbar';
import { display_text, display_axis_label } from '../Components/TextHelper.js';
import { createBarChart, createStackedBarChart } from '../Components/ChartHelper.js';

const HomePage = () => {
  // const svgRef = React.useRef();
  
  
  useEffect(() => {
    const data = {
      "United States": { Gold: 2235, Silver: 1252, Bronze: 1098, Total: 4585 },
      "United Kingdom": { Gold: 546, Silver: 621, Bronze: 553, Total: 1720 },
      "France": { Gold: 408, Silver: 491, Bronze: 497, Total: 1396 },
      "Germany": { Gold: 452, Silver: 378, Bronze: 475, Total: 1305 },
      "Italy": { Gold: 476, Silver: 416, Bronze: 404, Total: 1296 },
      "Australia": { Gold: 312, Silver: 405, Bronze: 472, Total: 1189 },
      "Hungary": { Gold: 412, Silver: 316, Bronze: 351, Total: 1079 },
      "Sweden": { Gold: 349, Silver: 367, Bronze: 328, Total: 1044 },
      "Netherlands": { Gold: 233, Silver: 279, Bronze: 339, Total: 851 },
      "China": { Gold: 290, Silver: 296, Bronze: 221, Total: 807 },
      "Japan": { Gold: 213, Silver: 272, Bronze: 303, Total: 788 },
      "Russia": { Gold: 239, Silver: 238, Bronze: 291, Total: 768 },
      "Canada": { Gold: 155, Silver: 232, Bronze: 262, Total: 649 },
      "Norway": { Gold: 209, Silver: 200, Bronze: 145, Total: 554 },
      "South Korea": { Gold: 158, Silver: 204, Bronze: 167, Total: 529 },
      "Poland": { Gold: 106, Silver: 174, Bronze: 231, Total: 511 },
      "Denmark": { Gold: 150, Silver: 197, Bronze: 160, Total: 507 },
      "Finland": { Gold: 124, Silver: 120, Bronze: 212, Total: 456 },
      "Spain": { Gold: 98, Silver: 227, Bronze: 117, Total: 442 },
      "Brazil": { Gold: 73, Silver: 173, Bronze: 185, Total: 431 }
    };
    // !REF: [PURPLE] https://coolors.co/palette/7400b8-6930c3-5e60ce-5390d9-4ea8de-48bfe3-56cfe1-64dfdf-72efdd-80ffdb
    const bar_color_palette = [ "#7400B8","#6930C3","#5E60CE","#5390D9","#4EA8DE","#48BFE3","#56CFE1","#64DFDF","#72EFDD","#80FFDB"];
    // !REF: [GOLD] https://coolors.co/palette/fff200-ffe600-ffd900-ffcc00-ffbf00-ffb300-ffa600-ff9900-ff8c00-ff8000
    // const bar_color_palette = [ "#FF8000","#FF8C00","#FF9900","#FFA600","#FFB300","#FFBF00","#FFCC00","#FFD900","#FFE600","#FFF200"];
  
    // const bar_color_palette2 = [ "#10002B","#240046","#3C096C","#5A189A","#7B2CBF","#9D4EDD","#C77DFF","#E0AAFF"];
    const primary_text_color_accent = "#242424";
    const countries = Object.keys(data);
    const totalMedals = countries.map(country => data[country].Total);
    
    // Create a SVG container
    const chartWidth = 75;
    const svgWidth = window.innerWidth * (chartWidth / 100);
    const svgMargin = { top: 20, right: 20, bottom: 20, left: 20 };
    var height = 400;  // Fixing hight to 400px for now

    var chart_svg = d3.select("body")
      .append("svg")
      .style("width", "100%")
      .style("height", `${height}px`)
      .attr("viewBox", `0 0 ${svgWidth} ${height + svgMargin.top + svgMargin.bottom}`)
      .append("g")
      .attr("transform", `translate(${svgMargin.left},${svgMargin.top})`);
    
    
    var header1_x = 120;
    var header1_y = 30;
    chart_svg = chart_svg.append("svg");
    // .attr("x", 120)
    // .attr("y", 320);
    chart_svg = display_text(chart_svg,header1_x,header1_y,"Top 20 Countries with highest total Medals won in Summer Olympics:","28px",primary_text_color_accent)
    const max_height = 200;
    const max_bar_width = 40;
    const bar_spacing = 45;
    
    // Create a simple Bar chart for seeing total medals won by top 20 countries
    createBarChart(chart_svg, totalMedals, countries, bar_color_palette, max_height, max_bar_width, bar_spacing);
    display_axis_label(chart_svg,"Countries",svgWidth,height)

    // Set up chart dimensions
    const chart2Height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    height   = chart2Height - margin.top - margin.bottom;
  
    // Create SVG container
    var chart2_svg = d3.select("body")
      .append("svg")
      .attr("width", "100%")
      .attr("height", `${chart2Height}px`)
      .attr("viewBox", `0 0 ${svgWidth} ${height*1.4 + svgMargin.top + svgMargin.bottom}`)
      .append("g")
      .attr("transform", `translate(${svgMargin.left*4},${svgMargin.top*4})`);
    
    chart_svg = display_text(chart2_svg,header1_x,-header1_y*0.5,"Top 20 Countries Medals Distribution in Summer Olympics:","28px",primary_text_color_accent)
  
    // Create a stacked bar chart which dsiplays the Total, Gold, Silver and Bronze medal counts for easy comparison
    createStackedBarChart(data,chart2_svg,svgWidth, height, bar_color_palette, max_height, max_bar_width, bar_spacing);
    display_axis_label(chart2_svg,"Countries",svgWidth,chart2Height*1.05)

  });

  return (
    <>
      <LayoutNavbar />
      {/* <svg ref={svgRef}></svg> */}
    </>
  )
};

export default HomePage;