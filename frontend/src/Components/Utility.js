import * as d3 from 'd3';

export const bar_color_palette = [ "#7400B8","#6930C3","#5E60CE","#5390D9","#4EA8DE","#48BFE3","#56CFE1","#64DFDF","#72EFDD","#80FFDB"];

// https://community.plotly.com/t/plotly-colours-list/11730
export const plotly_white_palette = [
    '#1f77b4',  // muted blue
    '#ff7f0e',  // safety orange
    '#2ca02c',  // cooked asparagus green
    '#d62728',  // brick red
    '#9467bd',  // muted purple
    '#8c564b',  // chestnut brown
    '#e377c2',  // raspberry yogurt pink
    '#7f7f7f',  // middle gray
    '#bcbd22',  // curry yellow-green
    '#17becf'   // blue-teal
]
export const primary_text_color_accent = "#242424";

// !REF: [PURPLE] https://coolors.co/palette/7400b8-6930c3-5e60ce-5390d9-4ea8de-48bfe3-56cfe1-64dfdf-72efdd-80ffdb
// !REF: [GOLD] https://coolors.co/palette/fff200-ffe600-ffd900-ffcc00-ffbf00-ffb300-ffa600-ff9900-ff8c00-ff8000
// const bar_color_palette = [ "#FF8000","#FF8C00","#FF9900","#FFA600","#FFB300","#FFBF00","#FFCC00","#FFD900","#FFE600","#FFF200"];

// const bar_color_palette2 = [ "#10002B","#240046","#3C096C","#5A189A","#7B2CBF","#9D4EDD","#C77DFF","#E0AAFF"];

//  Function to get a SVG container from a fresh div
export function getChartContainer(containerId, svgWidth, height, svgMargin) {

    var existing_svg = d3.select(containerId).select("svg");

    if (!existing_svg.empty()) {
        existing_svg.remove();
    }

    // Select the container element
    var chart_svg = d3.select(containerId)
        .append("svg")
        .style("width", "100%")
        .style("height", `${height}px`)
        .attr("viewBox", `0 0 ${svgWidth} ${height + svgMargin.top + svgMargin.bottom}`)
        .append("g")
        .attr("transform", `translate(${svgMargin.left*4},${svgMargin.top})`);

    return chart_svg;
}