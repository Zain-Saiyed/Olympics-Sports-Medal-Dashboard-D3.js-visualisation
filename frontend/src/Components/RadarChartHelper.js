import * as d3 from 'd3';
import { primary_text_color_accent } from '../Components/Utility.js';

export function createRadarChart(radar_chart_svg, chartData, bar_color_palette) {
// like python range(n) function.
  // !REF: https://stackoverflow.com/questions/8273047/javascript-function-similar-to-python-range
  let range_function = (n, step) => Array.from({ length: n }, (_, i) => i * step);
  let axis_ticks = range_function(5,10);

  // radius of Radar plot
  var radius = 200;
  var maxDataValue = d3.max(chartData, d => d.value);
  var desiredMaxValue = 40; // Define your desired maximum value here
    var scaleFactor = desiredMaxValue / maxDataValue;

    // Scale the data values
    chartData.forEach(d => {
        d.value *= scaleFactor;
    });
 
  // Creating a radial scale for the radar plot.
  // i.e.: our Data values are mapped to the circular co-ordinate system
  var radial_scale = d3.scaleLinear()
    .domain([0, 40]) // since our max value is 39, selecting 40 for easy calculations
    .range([0, radius]); // mapping to scale.

  // Create the axes for each unique data.
  // i.e.: Partition 2 pi or 360 degrees for each unique data value in our dataset. 
  var angle_slice = Math.PI * 2 / chartData.length; // Divide 360 degree (2 pi) into quadrants each for each unique value in our dataset

  // Draw the concentric circles for each interval or x-tick
  // used !REF
  for (var j = 10; j <= 40; j += 10) {
    radar_chart_svg.selectAll(".circle-" + j)
      .data(axis_ticks)
      .attr("class", "circle-" + j)
      .join(
          enter => enter.append("circle")
              .attr("cx", 0)
              .attr("cy", 0)
              .attr("fill", "none")
              .attr("stroke", primary_text_color_accent)
              .attr("opacity", 0.2)
              .attr("r", d => radial_scale(d))
      );
  }

  // Draw the axes for each unique data value in our dataset.
  // i.e.: draw the axes for each unique data domain, defined based on the angle_slice or the partition angle from the entire circle.
  // [*] (x1,y1) => this is the initial point of line, which is (0,0)
  // [*] (x2,y2) => thsi is the destination point of line, which is the maximum value of our data domain converted to radial scale mapped to its angle slice.  
  radar_chart_svg.selectAll(".radar-axes")
    .data(chartData)
    .enter()
    .append("line")
    .attr("class", "radar-axes")
    .attr("x1", 0)
    .attr("y1", 0)             //                    
    .attr("x2", function (d, i) { return radial_scale(40) * Math.cos(angle_slice * i - Math.PI / 2); })
    .attr("y2", function (d, i) { return radial_scale(40) * Math.sin(angle_slice * i - Math.PI / 2); })
    .style("stroke", primary_text_color_accent)
    .style("stroke-width", "1px");

  // Write the label name for each domain against the axes
  // i.e.: write the domain label name for each axes by specifying x and y padding to adjust label distance from end of axis.
  // [*] x => Add maximum value of our data domain & a x-pad value (in below case 18px), convert it to radial scale and get the domain's corresponding cordinate by its angle slice in the circular cordinate.
  // [*] y => Same as x but with y-pad value (in below case 10px)
  radar_chart_svg.selectAll(".radar-label")
      .data(chartData)
      .enter()
      .append("text")
      .attr("class", "radar-label")
      .attr("x", function (d, i) { return radial_scale(40 + 10) * Math.cos(angle_slice * i - Math.PI / 2); })
      .attr("y", function (d, i) { return radial_scale(40 + 10) * Math.sin(angle_slice * i - Math.PI / 2); })
      .text(function (d) { return d.domain; })
      .style("font-size", "20px")
      .style("text-anchor", "middle");
  // ^FUTURE: add label specific x-pad and y-pad for length specific text placement. Ease of clarity.

  // Create the Radial line generator, to draw the path defining the radar plot.
  // Specify radial_scale (in radius()) & angle_slice (in angle()) to define at what distance and at what angle to draw the line.
  var line = d3.lineRadial()
    .angle(function (d, i) { return angle_slice * (i); })
    .radius(function (d) { return radial_scale(d.value); });

  // Add the path element with the Radial Line generator created above to draw and display the radar plot on screen. Set line attribute as well.
  radar_chart_svg.append("path")
    .datum([...chartData, Object.assign({}, chartData[0])]) // Adding first element at the end of the array, so as to get a closed figure, and not a open ended figure.
    .attr("class", "radar-path")
    .attr("d", line)
    .attr("fill", bar_color_palette[6])
    .attr("stroke", primary_text_color_accent)
    .attr("stroke-width", 2)
    .attr("fill-opacity", 0.4);

};

// !REF [1]: https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart
// !REF [2]: https://gist.github.com/alandunning/4c36eb1abdb248de34c64f5672afd857
// !REF [3]: https://github.com/alangrafu/radar-chart-d3/blob/master/src/radar-chart.js
