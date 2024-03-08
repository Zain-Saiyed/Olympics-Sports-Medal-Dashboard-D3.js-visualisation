import React, { useEffect } from 'react';
import * as d3 from 'd3';
import LayoutNavbar from '../Pages/LayoutNavbar';

const HomePage = () => {
  // const svgRef = React.useRef();
  const data = {
    "United States": { Gold: 2235, Silver: 1252, Bronze: 1098, Total: 4585 },
    "United Kingdom": { Gold: 546, Silver: 621, Bronze: 553, Total: 1720 },
    "France": { Gold: 408, Silver: 491, Bronze: 497, Total: 1396 },
    "Germany": { Gold: 452, Silver: 378, Bronze: 475, Total: 1305 },
    "Norway": { Gold: 320, Silver: 278, Bronze: 375, Total: 1005 },
    "China": { Gold: 252, Silver: 178, Bronze: 275, Total: 805 },
  };
  // !REF: [PURPLE] https://coolors.co/palette/7400b8-6930c3-5e60ce-5390d9-4ea8de-48bfe3-56cfe1-64dfdf-72efdd-80ffdb
  const bar_color_palette = [ "#7400B8","#6930C3","#5E60CE","#5390D9","#4EA8DE","#48BFE3","#56CFE1","#64DFDF","#72EFDD","#80FFDB"];
  // !REF: [GOLD] https://coolors.co/palette/fff200-ffe600-ffd900-ffcc00-ffbf00-ffb300-ffa600-ff9900-ff8c00-ff8000
  // const bar_color_palette = [ "#FF8000","#FF8C00","#FF9900","#FFA600","#FFB300","#FFBF00","#FFCC00","#FFD900","#FFE600","#FFF200"];

  const bar_color_palette2 = [ "#10002B","#240046","#3C096C","#5A189A","#7B2CBF","#9D4EDD","#C77DFF","#E0AAFF"];

  useEffect(() => {
    // Create a SVG container
    var svg = d3.select("body")
      .append("svg")
      .attr("height", "45%")
      .attr("viewBox", "0 0 " + 1200 + " " + 2360);

    svg.attr("transform","translate(10,10)");
    
    var XLimit = 800;
    var YLimit = 400;

    // Get country names and Gold medal counts
    const countries = Object.keys(data);
    const goldMedals = countries.map(country => data[country].Gold);

    // Set the X axis range distribution, so that the country labels can be equally distributed 
    const XScale = d3.scaleBand().domain(countries).range([0, XLimit]).padding(0.1);
    // Set the Y axis range distribution, so that the medal counts are equally distributed 
    const YScale = d3.scaleLinear().domain([0, d3.max(goldMedals)]).range([YLimit, 0]);
    var color_scale = d3.scaleLinear()
      .domain([d3.min(goldMedals), d3.max(goldMedals)]) // value range
      .range([0, bar_color_palette.length - 1]); // color palette indexes range

      svg
      .selectAll('rect')
      .data(goldMedals)
      .enter()
      .append('rect')
      .attr('x', (d, i) => XScale(countries[i]) + XScale.bandwidth() / 4)
      .attr('y', d => 35+YScale(d))
      .attr('height', d => YLimit - YScale(d))
      .attr('width', XScale.bandwidth() / 2)
      .attr('fill', function (data, idx) {
        return bar_color_palette[idx];
      });
    
    // Add Y-axis values on the bars
    svg
      .selectAll('.bar-label')
      .data(goldMedals)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d, i) => XScale(countries[i]) + XScale.bandwidth() / 2)
      .attr('y', d => YLimit - YScale(d)) // Adjust the vertical position of the label
      .text(d => d)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', 'black');
    
    // ...
    
    // Add axes
    const XAxis = d3.axisBottom(XScale);
    // const YAxis = d3.axisLeft(YScale);
    
    svg.append('g').attr('transform', `translate(40, ${YLimit+35})`).call(XAxis);
    // svg.append('g').attr('transform', `translate(${25+15}, ${35})`).call(YAxis);
    // svg.attr('transform',`translate(230,230)`)
  }, []);

  return (
    <>
      <LayoutNavbar />
      {/* <svg ref={svgRef}></svg> */}
    </>
  )
};

export default HomePage;