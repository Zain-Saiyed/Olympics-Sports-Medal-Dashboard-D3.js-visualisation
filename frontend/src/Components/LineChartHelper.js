import * as d3 from 'd3';

// Function to make multi line chart
export function createMultiLineChart(chart_svg, chartData,  height, width, svgMargin) {

    // Get all unique years
    const years = Object.keys(chartData);

    // Get all countries
    var countries = Object.keys(chartData[years[0]]);
    var filteredData = [];

    // Get medal-country data by year
    years.forEach(year => {
        var yearData = chartData[year];
        countries.forEach(country => {
            var value = yearData[country];
            if (!isNaN(value)) {
                filteredData.push({ year: +year, country: country, value: value });
            }
        });
    });

    // Group data by country
    var summary_stat = filteredData.reduce(function(acc, cur) {
        if (!acc[cur.country]) {
            acc[cur.country] = [];
        }
        acc[cur.country].push(cur);
        return acc;
    }, {});

    // Format data
    summary_stat = Object.keys(summary_stat).map(function(key) {
        return { key: key, values: summary_stat[key] };
    });

    //Define axes
    var x = d3.scaleLinear()
        .domain([d3.min(filteredData, d => d.year), d3.max(filteredData, d => d.year)])
        .range([0, width]);

    chart_svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(years.map(Number)).tickSize(6).tickFormat(d3.format(".0f")))
        .selectAll('text')
        .style('font-size', '15px');

    var y = d3.scaleLinear()
        .domain([0, d3.max(filteredData, function(d) { return d.value; })])
        .range([height, 0]);

    chart_svg.append("g")
        .call(d3.axisLeft(y)
            .tickSize(6)
            .tickValues(d3.range(0, d3.max(filteredData, function(d) { return d.value; }) + 50, 50))
            .tickFormat(d3.format(".0f"))
        ).selectAll('text')
        .style('font-size', '15px');

    // Color palette
    var color = d3.scaleOrdinal()
        .domain(countries)
        .range(d3.schemeCategory10);

    // Draw the lines
    var lines = chart_svg.selectAll(".line")
        .data(summary_stat)
        .enter()
        .append("path")
        .attr("class", "line") 
        .attr("fill", "none")
        .attr("stroke", function(d) { return color(d.key); })
        .attr("stroke-width", 1.5)
        .attr("d", function(d) {
            return d3.line()
                .x(function(d) { return x(d.year); })
                .y(function(d) { return y(d.value); })
                (d.values);
        });

    // Add legend heading
    chart_svg.append("text")
        .attr("class", "legend-heading")
        .attr("x", width+40)
        .attr("y", 0)
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("LEGEND");

    var legend = chart_svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width+40) + ", 20)")
        .selectAll(".legend-item")
        .data(summary_stat)
        .enter().append("g")
        .attr("class", "legend-item")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
        // Upon hovering the country Highlight that line
        .on("mouseover", function(d) {
            var selectedCountry = d3.select(this).datum().key;
            lines.style("opacity", function(lineData) {
            if (lineData.key === selectedCountry) {
                d3.select(this).attr("stroke-width", 5); // Make the line thicker
                return 1; // Highlight selected line
            } else {
                return 0.3;
            }
        });
        d3.select(this).select("text").attr("font-weight", "bold"); // Bold its text
        })
        // When leaving mouse reset all
        .on("mouseout", function() {
            // Reset opacity, font, and thickness for all lines
            lines.style("opacity", 1).attr("stroke-width", 1); 
            d3.select(this).select("text").attr("font-weight", "normal");
        });

    // Add legend rectangle coreesponding to the color
    legend.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function(d) { return color(d.key); });

    // Add legend text 
    legend.append("text")
        .attr("x", 15)
        .attr("y", 5)
        .attr("dy", ".35em")
        .style("font-size", "15px")
        .text(function(d) { return d.key; });

    return chart_svg;
}

// Function to make scatter plot
export function createScatterChart(chart_svg, data, chart2_height, chart2_width, margin, xAttribute, yAttribute) {
    // Set the margins for the scatter plot
    const width = chart2_width - margin.left - margin.right;
    const height = chart2_height - margin.top - margin.bottom;

    var max_x_value = d3.max(data, d => d[xAttribute])+100;
    var max_y_value = d3.max(data, d => d[yAttribute])+100;
    // Set x and y scales
    const x = d3.scaleLinear()
        .domain([0, max_x_value])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, max_y_value])
        .range([height, 0]);

    // Add X axis
    chart_svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(-height).ticks(Math.floor(max_x_value/100)).tickPadding(10).tickFormat(d3.format(".0f")))
        .selectAll(".tick line")
        .style("stroke", "#ccc")
        .style("stroke-opacity", 0.7); // Adding the grid lines

    // Add Y axis
    chart_svg.append("g")
        .call(d3.axisLeft(y).tickSize(-width).ticks(max_y_value/100).tickPadding(10).tickFormat(d3.format(".0f")))
        .selectAll(".tick line")
        .style("stroke", "#ccc")
        .style("stroke-opacity", 0.7); // Add grid lines

    chart_svg.selectAll("text")
        .attr("font-size", "15px");

    const color_scaler = d3.scaleOrdinal(d3.schemeCategory10);
    // Add scatter points
    chart_svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => x(d[xAttribute]))
        .attr("cy", d => y(d[yAttribute]) )
        .attr("r", 7) // Set the radius of the circles
        .style("fill", "none") // Set the circle fill color to none
        .style("stroke",  d => color_scaler(d.country)) // Set the border color to blue
        .style("stroke-width", 4) // Set the border width
        .append("title")
        .text(d => d.country);

        // addLegendScatterPlot(chart_svg, width, data, color_scaler);
        addLegend(chart_svg, width, data, color_scaler, "scatter");
}

// Create Legend against a type of Line chart
function addLegend(chart_svg, width, data, color, chartType) {
    // Add legend
    const legend = chart_svg.append("g")
        .attr("transform", `translate(${width + 10}, 0)`); // Position legend to the right of the chart

    legend.append("text")
        .attr("x", 0)
        .attr("y", -10)
        .text("LEGEND")
        .style("font-weight", "bold");

    data.forEach((d, i) => {
        const legendItem = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`)
            .on("mouseover", function() {
                // Highlight the corresponding data points in the chart
                const itemData = d.country;
                const selector = chartType === 'scatter' ? "circle" : ".area-path";
                
                chart_svg.selectAll(selector)
                .style(chartType === 'scatter' ? "opacity" : "fill-opacity", function(d) {
                    return chartType === 'scatter' ? (d.country === itemData ? 1 : 0.2) : (d.country === itemData ? 0.8 : 0.3);
                });
                // Make the item name bold
                legendItem.select("text").attr("font-weight", "bold");

                // Increase opacity of legend box
                legendItem.select("rect").style("opacity", 1);
            })
            .on("mouseout", function() {
                // Restore opacity for all points when mouse leaves legend item
                chart_svg.selectAll(chartType === 'scatter' ? "circle" : ".area-path")
                    .style(chartType === 'scatter' ? "opacity" : "fill-opacity", chartType === 'scatter' ? 1: 0.3);

                // Remove bold font weight from item name
                legendItem.select("text").attr("font-weight", "normal");

                // Restore opacity of legend box
                legendItem.select("rect").style("opacity", 0.4);
            });

        legendItem.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", color(d.country))
            .style("opacity", 1); // Initially set opacity to 1

        legendItem.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .text(d.country);
    });
}


export function createAreaChart(chart_svg, data, chart2_height, chart2_width, margin, xAttribute, yAttribute, xAxisLabel, yAxisLabel) {
    const width = chart2_width - margin.left - margin.right;
    const height = chart2_height - margin.top - margin.bottom;

    // Set x and y scales
    const x = d3.scaleLinear()
    .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
    .range([0, width]);

    const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.totalMedals)+2])
    .range([height, 0]);

    // Define the area
    const area = d3.area()
        .x(d => x(d.year))
        .y0(height)
        .y1(d => y(d.totalMedals));


    // Group data by country
    const nestedData = Array.from(d3.group(data, d => d.country), ([country, values]) => ({ country, values }));

    const color_scaler = d3.scaleOrdinal()
        .domain(nestedData.map(d => d.country))
        .range(d3.schemeCategory10); 

    // Add areas for each country with color coding
    chart_svg.selectAll(".area-path")
        .data(nestedData)
        .enter().append("path")
        .attr("class", "area-path")
        .attr("fill", d => color_scaler(d.country)) // Color coded based on country
        .attr("fill-opacity", 0.3 ) 
        .attr("d", d => area(d.values))
        .attr("value", d => d.country); 

    const uniqueYears = [...new Set(data.map(item => item.year))];

    // Add X axis
    chart_svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x)
                .ticks(Math.floor(data.length/2))
                .tickSize(-height)
                .tickPadding(10)
                .tickValues(uniqueYears)
                .tickFormat(d3.format(".0f")))
        .selectAll(".tick line")
        .style("stroke", "#ccc")
        .style("stroke-opacity", 0.7); 

    // Add Y axis
    chart_svg.append("g")
        .call(d3.axisLeft(y)
            .tickSize(-width)
            .tickPadding(10))
        .selectAll(".tick line")
        .style("stroke", "#ccc")
        .style("stroke-opacity", 0.7);

    chart_svg.selectAll("text")
        .attr("font-size", "15px");

    const uniqueCountries = [...new Set(data.map(item => item.country))].map((country, index) => ({ id: index, country }));
    addLegend(chart_svg, width, uniqueCountries, color_scaler, "area");

}

