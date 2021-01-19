import * as d3 from "d3";

// TODO: Total 2 Tasks, Reference: O'Reilly for Higher Education

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 700 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

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
    let min = d3.min(data, (d)=> +d.y_values)

    //scales for x and y
    const y = d3
      .scaleLinear()
      .domain([min * 0.95, max * 1.05])
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

    //Data Join
    const rects = vis.svg.selectAll("rect").data(data);

    rects
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.x_labels))
      .attr("width", x.bandwidth)
      .attr("fill", "#750c0c")
      .attr("y", HEIGHT)
      .transition().duration(500)
      .attr("height", (d) => HEIGHT - y(+d.y_values))
      .attr("y", (d) => y(+d.y_values));
  }

  removeGraph() {
    d3.selectAll("svg").remove();
  }
}
