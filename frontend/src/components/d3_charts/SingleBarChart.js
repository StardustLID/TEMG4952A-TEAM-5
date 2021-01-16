import * as d3 from "d3";

// TODO: Total 2 Tasks, Reference: O'Reilly for Higher Education

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 60, RIGHT: 10 };
const WIDTH = 460 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

// TODO: Task 1 input the XLabel, YLabel, json/csv
const XLabel = "Hello";
const YLabel = "898";
const json =
  "https://udemy-react-d3.firebaseio.com/tallest_men.json";
//TODO: Task 2 CHange the d.name and d.height to d.dataname on line 84, 56, 57, 90, 91
// where d.name is for x axis and d.height is for y axis

export default class SingleBarChart {
  constructor(element) {
    let vis = this;

    /** Add a SVG canvas to the root element (div) */
    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    //Set the X Label
    vis.xLabel = vis.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + MARGIN.BOTTOM)
      .attr("text-anchor", "middle") //to put it in the middle
      .text(XLabel);

    //Set Y Label
    vis.svg
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .text(YLabel)
      .attr("transform", "rotate(-90)"); // rotate in clockwise, then it will revert x and y

    //Set x, y AxisGroup
    vis.xAxisGroup = vis.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append("g");

    
    d3.json(json).then((data) => {
      
      let max = d3.max(data, (d)=> d.height)
      let min = d3.min(data, (d)=> d.height)

      //scales for x and y
      const y = d3
        .scaleLinear()
        .domain([min * 0.95, max])
        .range([HEIGHT, 0]);

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
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
        .attr("x", (d) => x(d.name))
        .attr("width", x.bandwidth)
        .attr("fill", "grey")
        .attr("y", HEIGHT)
        .transition()
        .duration(500)
        .attr("height", (d) => HEIGHT - y(d.height))
        .attr("y", (d) => y(d.height));

    });
  }
}
