import * as d3 from 'd3';

export function createBarChart(svg, data, countries, bar_color_palette, max_height, max_bar_width, bar_spacing) {
    // Create group to include the bars
    var bar_group = svg.append("g").attr("transform", "translate(150,120)");
  
    // Get maximum and minimum values in our data
    var max_value = d3.max(data);
    var min_value = d3.min(data);
    var scale_factor = max_height / max_value;
  
    // !Ref Link: https://d3js.org/d3-scale/linear
    var color_scale = d3.scaleLinear()
      .domain([min_value, max_value]) // value range
      .range([0, bar_color_palette.length - 1]); // color palette indexes range
  
    // Create bar chart with defined padding
    bar_group
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', max_bar_width) // bar width
      .attr('height', function (data) { return scale_factor * data; }) // scale up value
      .attr('x', function (data, idx) { return 2 + idx * bar_spacing; }) // spacing between bars
      .attr('y', function (data) { return max_height - scale_factor * data; }) // align bars from the bottom by adjusting y based on scaled value
      .attr('fill', function (data) { return bar_color_palette[Math.round(color_scale(data))]; });
  
    // Adding value label on top of each bar
    bar_group
      .selectAll('.value-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .text(function (data) { return data; })
      .attr('x', function (data, idx) { return 2 + idx * bar_spacing + max_bar_width / 2; }) // calculate bar's x distance and adjust to center of bar pad with half the bar's width
      .attr('y', function (data) { return max_height - scale_factor * data - max_bar_width * 0.15; }) // calculate bar's y distance, and add vertical padding of 15% of bar's max width
      .style('font-size', '15px')
      .style('font-weight', 'bold')
      .style('text-anchor', 'middle')
      .style('fill', 'black');
  
    // Create X axis scale
    var xAxisScale = d3.scaleBand().domain(countries).range([2 + max_bar_width / 2, 2 + countries.length * bar_spacing + max_bar_width / 2]);
    var xAxis = d3.axisBottom(xAxisScale);
  
    // Append X axis labels
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

// export function createStackedBarChart(svg, data, keys, colors, max_height, max_bar_width, bar_spacing) {
//     // Create group to include the bars
//     var bar_group = svg.append("g").attr("transform", "translate(150,120)");
  
//     // Stack the data
//     var stackedData = d3.stack().keys(keys)(data);
  
//     // Get the maximum value in the stacked data
//     var max_value = d3.max(stackedData, d => d3.max(d, e => e[1]));
  
//     // Set the Y axis range distribution, so that the stacked bars are equally distributed 
//     var YScale = d3.scaleLinear().domain([0, max_value]).range([max_height, 0]);
  
//     // Create color scale
//     var color_scale = d3.scaleOrdinal().domain(keys).range(colors);
  
//     // Create stacked bar chart with defined padding
//     bar_group
//       .selectAll('g')
//       .data(stackedData)
//       .enter().append('g')
//       .attr('fill', d => color_scale(d.key))
//       .selectAll('rect')
//       .data(d => d)
//       .enter().append('rect')
//       .attr('width', max_bar_width) // bar width
//       .attr('height', d => YScale(d[0]) - YScale(d[1])) // bar height
//       .attr('x', (d, idx) => 2 + idx * bar_spacing) // spacing between bars
//       .attr('y', d => YScale(d[1])) // align bars from the bottom by adjusting y based on the stacked values
//       .append('title')
//       .text(d => `${d.data.country}: ${d.data[d.key]} ${d.key}`);
  
//     // Create X axis scale
//     var xAxisScale = d3.scaleBand().domain(data.map(d => d.country)).range([2 + max_bar_width / 2, 2 + data.length * bar_spacing + max_bar_width / 2]);
//     var xAxis = d3.axisBottom(xAxisScale);
  
//     // Append X axis labels
//     bar_group
//       .append('g')
//       .attr('class', 'x-axis')
//       .attr('transform', `translate(${-max_bar_width / 2}, ${max_height})`)
//       .call(xAxis)
//       .selectAll('text')
//       .attr('dy', '0.5em') // Adjust the label spacing from axis
//       .attr('dx', '0.5em') // Adjust the label spacing from axis
//       .style('text-anchor', 'start')
//       .style('font-size', '12px')
//       .attr("transform", "rotate(45)");
//   }

  // Function to create a stacked bar chart
export function createStackedBarChart(data,svg,width, height, bar_color_palette, max_height, max_bar_width, bar_spacing) {
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
    // const totalMedals = countries.map(country => data[country].Total);

    // var max_value = d3.max(totalMedals);
    // var min_value = d3.min(totalMedals);
    // var scale_factor = max_height / max_value;
   // Use d3.stack() to create stacked data
  const stackedData = d3.stack().keys(medalTypes)(medalData);

// Create X and Y scales
  const xScale = d3.scaleBand().domain(countries).range([0, width]).padding(0.2);
  const yScale = d3.scaleLinear().domain([0, d3.max(stackedData, d => d3.max(d, d => d[1]))]).range([height, 0]);

  // Create color scale
  const color = d3.scaleOrdinal().domain(medalTypes).range(["#ffd700", "#c0c0c0", "#cd7f32", "#808080"]);

  // Create stacked bars
//   svg.selectAll(".bar")
//     .data(stackedData)
//     .enter().append("g")
//     .attr("fill", d => color(d.key))
//     .selectAll("rect")
//     .data(d => d)
//     .enter().append("rect")
//     .attr("x", d => xScale(d.data.country))
//     .attr("y", d => yScale(d[1]))
//     .attr("height", d => yScale(d[0]) - yScale(d[1]))
//     .attr("width", xScale.bandwidth()); // Decrease bandwidth for smaller bars
// console.log(max_bar_width);
    // Create bar chart with defined padding
  svg
    .selectAll('.bar')
    .data(stackedData)
    .enter()
    .append('g')
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter().append("rect")
    .attr('x', function (data, idx) { console.log(xScale(data.data.country));return xScale(data.data.country); }) // spacing between bars
    .attr('y', function (data) { return yScale(data[1]); }) // align bars from the bottom by adjusting y based on scaled value
    .attr('height', function (data) { return yScale(data[0]) - yScale(data[1]); }) // scale up value
    .attr('width', max_bar_width); // bar width
  //   .attr('fill', function (data) { return bar_color_palette[Math.round(color_scale(data))]; });


  // Create X and Y axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll('text')
    .attr('dy', '0.5em') // Adjust the label spacing from axis
    .attr('dx', '0.5em') // Adjust the label spacing from axis
    .style('text-anchor', 'start')
    .style('font-size', '12px')
    .attr("transform", "rotate(45)");

  svg.append("g").call(yAxis);
}
  