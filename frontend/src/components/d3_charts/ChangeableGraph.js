import * as d3 from "d3";
import * as d3Utils from "./D3Utilities";

// Use default WIDTH, HEIGHT & MARGIN from d3Utils

export default class ChangableGraph {
  /**
   * @param element - Reference to the <div /> that the chart will be rendered in
   * @param {string} csvData - The CSV data file
   * @param {string[]} axisLabels - The x-axis and y-axis labels
   * @param axisIDs - Object of `{ xaxis: "XX", yaxis: "YY"}`
   */
  constructor(element, csvData, axisLabels, axisIDs) {
    let vis = this;

    // Add a SVG canvas to the root element
    vis.svg = d3Utils.createSvgCanvas(element);

    // Set x, y AxisGroup
    [vis.xAxisGroup, vis.yAxisGroup] = d3Utils.createAxisGroups(vis.svg);

    // Add x, y label
    vis.xlabel = vis.svg
      .append("text")
      .attr("x", d3Utils.WIDTH / 2)
      .attr("y", d3Utils.HEIGHT + d3Utils.MARGIN.BOTTOM - 3)
      .attr("text-anchor", "middle"); // center text

    vis.ylabel = vis.svg
      .append("text")
      .attr("x", -(d3Utils.HEIGHT / 2))
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)");

    this.update(csvData, axisLabels, axisIDs);
  }

  update(csvData, axisLabels, axisID) {
    const vis = this;

    const { xaxis, yaxis } = axisID;

    const isEmployeeCount = xaxis === "employee_count";

    vis.xlabel.text(axisLabels[0]);
    vis.ylabel.text(axisLabels[1]);

    // Parse CSV
    const data = d3.csvParse(csvData);

    let xmax = d3.max(data, (d) => +d.xdata);
    let ymax = d3.max(data, (d) => +d.ydata);
    console.log(ymax * 1.05);

    // Scales for x and y
    let x = d3
      .scaleLinear()
      .domain([0, xmax * 1.05])
      .range([0, d3Utils.WIDTH]);

    // Special case: Use ordinal scale for employee count
    if (isEmployeeCount) {
      x = d3
        .scaleBand()
        .domain(["1-10", "11-50", "51-100", "101-250", "251-500", "501-1000", "1001-5000", "5001-10000"])
        .range([0, d3Utils.WIDTH]);
    }

    const y = d3
      .scaleLinear()
      .domain([0, ymax * 1.05])
      .range([d3Utils.HEIGHT, 0]);

    // Render x-axis and y-axis on screen
    const xAxisCall = d3.axisBottom(x);
    vis.xAxisGroup
      .transition()
      .duration(500) // Transition animation for the axis
      .call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);

    // Data join
    const circles = vis.svg.selectAll("circle").data(data);

    // Exit
    circles.exit().remove();

    // Update
    circles
      .transition()
      .duration(500)
      .attr("cx", (d) => (isEmployeeCount ? x(d.xdata) + x.bandwidth() / 2 : x(+d.xdata)))
      .attr("cy", (d) => y(+d.ydata));

    // Enter
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => (isEmployeeCount ? x(d.xdata) + x.bandwidth() / 2 : x(+d.xdata)))
      .attr("cy", y(0)) // Place the dots at bottom of the plot initially
      .attr("r", 4)
      .attr("fill", "red")
      .attr("opacity", "0.2")
      .transition()
      .duration(500)
      .attr("cy", (d) => y(+d.ydata));
  }
}
