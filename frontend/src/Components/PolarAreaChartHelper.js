import * as d3 from 'd3';

export function createPolarAreaDiagram(chart_svg, data, width, height) {
    // Set inner and Outer radius of pie
    const outerRadius = Math.min(width, height) / 2 - 20;
    const innerRadius = outerRadius * 0.2; // 20% of outer radious
    var scale_factor = 2.5;
    var padding = 5;

    // Define the color palette scale
    const color_palette_scale = d3.scaleOrdinal()
        .range(d3.schemeCategory10);

    // Create the pie generator
    const pie = d3.pie()
        .value(d => d.medal)
        .sort(null);

    // Get maximum medal value for scaling
    const max_medal = d3.max(data, d => d.medal);

    // Create the logarithmic scale for the radius for scaling the radius values 
    const radius_scale = d3.scaleLog()
        .domain([1, max_medal])
        .range([innerRadius, outerRadius]);

    // Create the arc generator
    const arc = d3.arc()
        .outerRadius(d => radius_scale(d.data.medal))
        .innerRadius(innerRadius); // Set inner radius

    // Draw the polar area diagram
    const arcs = chart_svg.selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => color_palette_scale(i))
    .attr("id", (d, i) => `${d.data.Key}`) // Add sport name to the paths
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    // On mouse hover highlight that pie slice
    .on("mouseover", function() {
        d3.select(this)
            .attr("stroke", "black")
            .attr("stroke-width", "2px");
        chart_svg.selectAll("path")
            .style("opacity", d => {
                const pathId = d3.select(this).attr("id"); // Get the ID of the current path in the iteration
                return (d.data.Key === pathId ? 1 : 0.2);
            });
        // Highlight corresponding text
        chart_svg.selectAll("text")
            .style("font-weight", d => {
                const textId = d3.select(this).attr("id"); // Get the text of the current label in the iteration
                return (d.data.Key === textId ? "bold" : "normal");
            })
            .style("opacity", d => {
                const textId = d3.select(this).attr("id"); // Get the text of the current label in the iteration
                return (d.data.Key === textId ? "1" : "0.2");
            });
            // Highlight that text
        chart_svg.selectAll("line")
            .style("opacity", d => {
                const textId = d3.select(this).attr("id"); // Get the text of the current label in the iteration
                return (d.data.Key === textId ? "1" : "0.2");
            });

    })
    // Reset on mose moving out of selection
    .on("mouseout", function() {
        d3.select(this)
            .attr("stroke", "white")
            .attr("stroke-width", "2px");
        chart_svg.selectAll("path")
            .style("opacity", 1); // Reset opacity for all arcs
        // Reset font weight for all labels
        chart_svg.selectAll("text")
            .style("font-weight", "normal")
            .style("opacity","1");
        chart_svg.selectAll("line")
            .style("opacity", "1");
    });

    // Add labels to the pie arcs
    arcs.append("title")
        .text(d => `${d.data.Key}: ${d.data.medal}`);
        
    // Add labels outside to the arc labels
    const outerArcs = chart_svg.selectAll("outer-text")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "outer-text");
    
    // Add the line extending from center of pie arc to its text label
    outerArcs.append("line")
        .attr("x1", d => arc.centroid(d)[0])
        .attr("y1", d => arc.centroid(d)[1])
        .attr("x2", d => arc.centroid(d)[0] * scale_factor)
        .attr("y2", d => arc.centroid(d)[1] * scale_factor)
        .attr("id", (d, i) => `${d.data.Key}`) 
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    // Add the text label of its corresponding pie arc
    outerArcs.append("text")
        .attr("id", (d, i) => `${d.data.Key}`) 
        .attr("transform", d => {
            const pos = arc.centroid(d);
            const x = pos[0] * scale_factor + (pos[0] < 0 ? -padding : padding);
            const y = pos[1] * scale_factor + (pos[1] < 0 ? -padding : padding);
            return `translate(${x}, ${y})`;
        })
        .attr("text-anchor", d => (d.startAngle + d.endAngle) / 2 > Math.PI ? "end" : "start")
        .text(d => d.data.Key);

    return chart_svg;
}