import * as d3 from "d3";
import * as d3Utils from "./D3Utilities";

// Use default WIDTH, HEIGHT & MARGIN from d3Utils

export default class ChangableGraph {
  /**
   * @param element - Reference to the <div /> that the chart will be rendered in
   * @param {string} csvData - The CSV data file
   * @param {string[]} axisLabels - The x-axis and y-axis labels
   */
  constructor(element, csvData, axisLabels) {
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

    this.update(csvData, axisLabels);
  }

  update(csvData, axisLabels) {
    const vis = this;

    vis.xlabel.text(axisLabels[0]);
    vis.ylabel.text(axisLabels[1]);

    // Parse CSV
    const data = d3.csvParse(csvData);

    let xmax = d3.max(data, (d) => +d.xdata);
    let ymax = d3.max(data, (d) => +d.ydata);

    // Scales for x and y
    const x = d3
      .scaleLinear()
      .domain([0, xmax * 1.05])
      .range([0, d3Utils.WIDTH]);

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

    console.log(data);

    // Data join
    const circles = vis.svg.selectAll("circle").data(data);

    // Exit
    circles
      .exit()
      .transition()
      .duration(500)
      .attr("cy", y(0)) // Dots would move downwards and get removed
      .remove();

    // Update
    circles
      .transition()
      .duration(500)
      .attr("cx", (d) => x(+d.xdata))
      .attr("cy", (d) => y(+d.ydata));

    // Enter
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => x(+d.xdata))
      .attr("cy", y(0)) // Place the dots at bottom of the plot initially
      .attr("r", 5)
      .attr("fill", "red")
      .transition()
      .duration(500)
      .attr("cy", (d) => y(+d.ydata));
  }
}
