import * as d3 from "d3";
import * as d3Utils from "./D3Utilities";

// Use default WIDTH, HEIGHT & MARGIN from d3Utils

export default class SingleBarChart {
  /**
   * @param element - Reference to the <div /> that the chart will be rendered in 
   * @param {string} csvData - The CSV data file
   * @param {string[]} axisLabels - The x-axis and y-axis labels
   */
  constructor(element, csvData, axisLabels) {
    let vis = this;

    // Add a SVG canvas to the root element
    vis.svg = d3Utils.createSvgCanvas(element);

    // Set the x-axis & y-axis labels
    d3Utils.drawAxisLabels(vis.svg, axisLabels);

    // Set x, y AxisGroup
    [vis.xAxisGroup, vis.yAxisGroup] = d3Utils.createAxisGroups(vis.svg);

    // Parse CSV
    const data = d3.csvParse(csvData);

    let max = d3.max(data, (d)=> +d.y_values) // `+d.y_values` coerces `d.y_values` from string to number

    // Scales for x and y
    const y = d3
      .scaleLinear()
      .domain([0, max * 1.05])
      .range([d3Utils.HEIGHT, 0]);

    const xLabels = data.map((d) => d.x_labels);

    const x = d3
      .scaleBand()
      .domain(xLabels)
      .range([0, d3Utils.WIDTH])
      .padding(0.4);

    // Call (render) x-axis
    const xAxisCall = d3.axisBottom(x);
    const xAxisLabels = vis.xAxisGroup
      .transition().duration(500)
      .call(xAxisCall)
      .selectAll("text");
    
    // Automatically rotate the x-axis labels if any labels are too lengthy
    const longestXLabelLength = Math.max(...data.map((d) => d.x_labels.length));
    if (longestXLabelLength > 15) {
      xAxisLabels.style("text-anchor", "end")
        .attr("dx", "-0.5em")
        .attr("dy", "0.3em")
        .attr("transform", "rotate(-16)");
    }

    // Call (render) y-axis
    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup
      .transition().duration(500)
      .call(yAxisCall);

    /** Create horizontal grid lines (Ref: https://www.essycode.com/posts/adding-gridlines-chart-d3/)
     * Passing the negative chart height and width to the tickSize functions ensures that the axis lines will span across the chart. 
     * Passing an empty string to tickFormat ensures that tick labels aren’t rendered. 
     * The ticks function specifies the number of tick marks, here set to 10 to equal the count on the main axes.
     */
    const yAxisGridCall = d3.axisLeft(y).tickSize(-d3Utils.WIDTH).tickFormat("").ticks(10);
    vis.svg.append("g")
      .attr("class", "axis-grid")
      .call(yAxisGridCall);

    // Render the bars. Every bar is wrapped by a <g>
    const barGroups = vis.svg.selectAll(".bar-group")
      .data(data)
      .enter()
      .append("g")
        .attr("class", "bar-group");

    // Add a <rect> to the <g>
    barGroups
      .append("rect")
        .attr("x", (d) => x(d.x_labels))
        .attr("y", d3Utils.HEIGHT)
        .attr("width", x.bandwidth)
        .attr("fill", "#750c0c")
        .transition().duration(500)
        .attr("height", (d) => d3Utils.HEIGHT - y(+d.y_values))
        .attr("y", (d) => y(+d.y_values));
    
    // Add a text label displaying the y value on top of each bar
    barGroups
      .append("text")
        .text((d) => d.y_values)
        .attr("text-anchor", "middle")
        .attr("x", (d) => x(d.x_labels) + x.bandwidth()/2)
        .attr("y", (d) => y(+d.y_values) - 8)
        .attr("font-size", "11px")
        .attr("opacity", "0")
        .transition().duration(500)
        .attr("opacity", "1");
  }

  removeGraph() {
    d3.selectAll("svg").remove();
  }
}
