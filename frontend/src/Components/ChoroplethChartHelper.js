import * as d3 from 'd3';
// !REF: https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson
import worldGeojson from '../assets/world.geojson.txt';

// !REF [1]: https://d3-graph-gallery.com/graph/choropleth_basic.html 

// Function to create Choropleth Chart
export function createChoroplethChart(svg, choroplethData, width, height) {
    // Set up projection and path generator
    const projection = d3.geoMercator()
        .scale(120) // Decrease scale to fit screen
        .translate([width / 2 - width*0.05, height / 2]); // adjust map positioning 
    
    const path = d3.geoPath().projection(projection);

    // Create color scale
    const color_palete_scale = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(choroplethData, d => d.totalMedals)]);

    // Load World geojson data
    d3.json(worldGeojson).then(world => {
        // Merge choropleth data with geojson features by adding in our data keys
        world.features.forEach(feature => {
            const countryData = choroplethData.find(d => d.country === feature.properties.name);
            feature.totalMedals = countryData ? countryData.totalMedals : 0;
            feature.year = countryData ? countryData.year : "N/A";
    });

   // Draw chropleth map
   svg.selectAll("path")
       .data(world.features)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("fill", d => color_palete_scale(d.totalMedals)) // Fill color based on medal value for a country
       .style("stroke", "#bdbdbd") 
       .style("stroke-width", 0.5)
       .attr("class", "country") 
       .style("opacity", 0.8)
        //    WHen mouse hovered then 
       .on("mouseover", (event, d) => {
            // decrease opacity for all other maps
           d3.selectAll(".country")
               .transition()
               .duration(100)
               .style("opacity", 0.5);
            // Increase opacity of country highlighted
           d3.select(event.target)
               .transition()
               .duration(100)
               .style("opacity", 1)
               .style("stroke", "black");
            // Add tool tip over current highlighted country
           tooltip.transition()
               .duration(100)
               .style("opacity", 0.9);
               tooltip.html(`
                <div style="background-color: white; border: 2px solid #b9b6b6; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); padding: 10px; font-size: 14px; color: #333;">
                  <div style="font-weight: bold; font-Size: 18px;">${d.properties.name}</div>
                  <div style="display: flex; margin-top: 5px;">
                    <div>Total Medals:</div>
                    <div style="padding-left: 10px; font-weight: bold;">${d.totalMedals}</div>
                  </div>
                  <div style="display: flex; ">
                    <div>Year:</div>
                    <div style="padding-left: 10px; font-weight: bold;">${d.year}</div>
                  </div>
                </div>`)
               .style("left", (d3.pointer(event)[0] + 20) + "px")
               .style("top", (d3.pointer(event)[1] + 60) + "px")
               .style("opacity", 1)
               .style("pointer-events", "none")
               .transition()
               .duration(100);
       })
        // After mouse leaves the highlighted country    
       .on("mouseleave", (event, d) => {
            // Reset opacity value
            d3.selectAll(".country")
                .transition()
                .duration(100)
                .style("opacity", 0.8);
            // Reset the highlighted country
            d3.select(event.target)
                .transition()
                .duration(100)
                .style("stroke", "transparent");
            // Hide that tool tip
            tooltip.transition()
                .duration(250)
                .style("opacity", 0);
       });

    // Create tooltip palceholder to update & unhide and hide
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("pointer-events", "none");
    }); 
}
