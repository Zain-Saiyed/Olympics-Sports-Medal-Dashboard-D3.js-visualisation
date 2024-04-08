// Function to display text
export function display_text(svg, x, y, text, font_size, text_color,font_weight=null) {
    var display_text = svg.append("text")
        .text(text)
        .attr("x", x) 
        .attr("y", y) 
        .style("font-size", font_size) 
        .style("fill", text_color); 
    if (font_weight !== null) {
        display_text.style("font-weight",font_weight);
    }
    return svg;
}

// Function to display axis label
export function display_axis_label(svg, label, width, height, degree_rotation=0) {
    svg.append("text")
    .attr("transform", "translate(" + (width / 2) + " ," + (height+15) + ") rotate("+degree_rotation+")")
    .style("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "18px")
    .style("letter-spacing", "1px")
    .text(label);
}
