import * as d3 from "d3";
import "./GridLines.css";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 700 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 550 - MARGIN.TOP - MARGIN.BOTTOM;

export default class SingleBarChart {
  /**
   * @param element - Reference to the <div /> that the chart will be rendered in 
   * @param {string} csvData - The CSV data file
   * @param {string[]} axisLabels - The x-axis and y-axis labels
   */
  constructor(element, csvData, axisLabels) {
    let vis = this;

    const [XLabel, YLabel] = axisLabels;

    /** Add a SVG canvas to the root element (div) */
    vis.svg = d3
      .select(element)
      .append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    //Set the X Label
    vis.svg
      .append("text")
        .attr("x", WIDTH / 2)
        .attr("y", HEIGHT + MARGIN.BOTTOM - 10)
        .attr("text-anchor", "middle") //to put it in the middle
      .text(XLabel);

    //Set Y Label
    vis.svg
      .append("text")
        .attr("x", -(HEIGHT / 2))
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text(YLabel)
        .attr("transform", "rotate(-90)"); // rotate in clockwise, then it will revert x and y

    //Set x, y AxisGroup
    vis.xAxisGroup = vis.svg
      .append("g")
        .attr("transform", `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append("g");

    // Parse CSV
    const data = d3.csvParse(csvData);

    let max = d3.max(data, (d)=> +d.y_values) // `+d.y_values` coerces `d.y_values` from string to number
    // let min = d3.min(data, (d)=> +d.y_values)

    //scales for x and y
    const y = d3
      .scaleLinear()
      .domain([0, max * 1.05])
      .range([HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.x_labels))
      .range([0, WIDTH])
      .padding(0.4);

    //Call Axis
    const xAxisCall = d3.axisBottom(x);
    vis.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);

    /** Create horizontal grid lines (Ref: https://www.essycode.com/posts/adding-gridlines-chart-d3/)
     * Passing the negative chart height and width to the tickSize functions ensures that the axis lines will span across the chart. 
     * Passing an empty string to tickFormat ensures that tick labels aren’t rendered. 
     * The ticks function specifies the number of tick marks, here set to 10 to equal the count on the main axes.
     */
    const yAxisGridCall = d3.axisLeft(y).tickSize(-WIDTH).tickFormat("").ticks(10);
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
        .attr("y", HEIGHT)
        .attr("width", x.bandwidth)
        .attr("fill", "#750c0c")
        .transition().duration(500)
        .attr("height", (d) => HEIGHT - y(+d.y_values))
        .attr("y", (d) => y(+d.y_values));
    
    // Add a text label displaying the y value on top of each bar
    barGroups
      .append("text")
        .text((d) => d.y_values)
        .attr("text-anchor", "middle")
        .attr("x", (d) => x(d.x_labels) + x.bandwidth()/2)
        .attr("y", (d) => y(+d.y_values) - 8)
        .attr("font-size", "12px")
        .attr("opacity", "0")
        .transition().duration(500)
        .attr("opacity", "1");
  }

  removeGraph() {
    d3.selectAll("svg").remove();
  }
}
