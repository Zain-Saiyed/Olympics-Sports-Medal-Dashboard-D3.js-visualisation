import * as d3 from 'd3';

//  Function to create simple bar chart
export function createCountBarChart(chart_svg, data, max_height, max_bar_width, bar_spacing, bar_color_palette, x_axis_values=null) {
  // Create group to include the bars
  var bar_group = chart_svg.append("g").attr("transform", "translate(150,120)");

  // Get maximum and minimum values in our data
  var max_value = d3.max(data.map(d => d.Medal));
  var min_value = d3.min(data.map(d => d.Medal));
  var scale_factor = max_height / max_value;

  // !Ref Link: https://d3js.org/d3-scale/linear
  var color_scale = d3.scaleLinear()
      .domain([min_value, max_value]) // value range
      .range([0, 9]); // color palette indexes range

  // Create X axis scale
  if (x_axis_values !== null) {
    var xAxisScale = d3.scaleBand().domain(x_axis_values).range([2 + max_bar_width / 2, 2 + x_axis_values.length * bar_spacing + max_bar_width / 2]);
    var xAxis = d3.axisBottom(xAxisScale);  
  }

  // Create bar chart with defined padding
  bar_group
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', max_bar_width) // bar width
      .attr('height', function (d) { return scale_factor * d.Medal; }) // scale up value
      .attr('x', function (d, idx) { return 2 + idx * bar_spacing; }) // spacing between bars
      .attr('y', function (d) { return max_height - scale_factor * d.Medal; }) // align bars from the bottom by adjusting y based on scaled value
      .attr('fill', function (d) { return bar_color_palette[Math.round(color_scale(d.Medal))]; });

  // Adding value label on top of each bar
  bar_group
      .selectAll('.value-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .text(function (d) { return d.Medal; })
      .attr('x', function (d, idx) { return 2 + idx * bar_spacing + max_bar_width / 2; }) // calculate bar's x distance and adjust to center of bar pad with half the bar's width
      .attr('y', function (d) { return max_height - scale_factor * d.Medal - max_bar_width * 0.15; }) // calculate bar's y distance, and add vertical padding of 15% of bar's max width
      .style('font-size', '15px')
      .style('font-weight', 'bold')
      .style('text-anchor', 'middle')
      .style('fill', 'black');

  bar_group
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${-max_bar_width / 2}, ${max_height})`)
      .call(xAxis)
      .selectAll('text')
      .attr('dy', '0.5em') // Adjust the label spacing from axis
      .attr('dx', '0.5em') // Adjust the label spacing from axis
      .style('text-anchor', 'start')
      .style('font-size', '12px')
      .attr("transform", "rotate(45)");

}

// Function to create a stacked bar chart
export function createStackedBarChart(data,chart_svg,width, height, bar_color_palette, max_height, max_bar_width, bar_spacing) {
  const medalTypes = ["Gold", "Silver", "Bronze", "Total"];

  // Get country names and medal counts
  const countries = Object.keys(data);
  const medalData = countries.map(country => {
    const entry = { country: country };
    medalTypes.forEach(medal => {
      entry[medal] = data[country][medal];
    });
    return entry;
  });

  const stackedData = d3.stack().keys(medalTypes)(medalData);

  // Create X and Y scales
  const xScale = d3.scaleBand().domain(countries).range([0, width]).padding(0.2);
  const yScale = d3.scaleLinear().domain([0, d3.max(stackedData, d => d3.max(d, d => d[1]))]).range([height, 0]);

  // Create color scale
  const color = d3.scaleOrdinal().domain(medalTypes).range(["#ffd700", "#c0c0c0", "#cd7f32", "#808080"]);

  // Create bar chart with defined padding
  chart_svg
    .selectAll('.bar')
    .data(stackedData)
    .enter()
    .append('g')
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter().append("rect")
    .attr('x', function (data, idx) { 
      // console.log(xScale(data.data.country));
      return xScale(data.data.country); }) // spacing between bars
    .attr('y', function (data) { return yScale(data[1]); }) // align bars from the bottom by adjusting y based on scaled value
    .attr('height', function (data) { return yScale(data[0]) - yScale(data[1]); }) // scale up value
    .attr('width', max_bar_width); // bar width
  //   .attr('fill', function (data) { return bar_color_palette[Math.round(color_scale(data))]; });

  // Create X and Y axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  chart_svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll('text')
    .attr('dy', '0.5em') // Adjust the label spacing from axis
    .attr('dx', '0.5em') // Adjust the label spacing from axis
    .style('text-anchor', 'start')
    .style('font-size', '12px')
    .attr("transform", "rotate(45)");

  chart_svg.append("g").call(yAxis);
}