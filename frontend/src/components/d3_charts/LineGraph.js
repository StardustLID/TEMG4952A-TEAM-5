import * as d3 from "d3";
import "./LineGraph.css";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 50, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class LineGraph {
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
   vis.xLabel = vis.svg
     .append("text")
     .attr("x", WIDTH / 2)
     .attr("y", HEIGHT + MARGIN.BOTTOM - 10)
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
      .attr("transform", `translate(0, ${HEIGHT})`)
      .attr("color", "black");

    vis.yAxisGroup = vis.svg.append("g");

    // Parse CSV
    const data = d3.csvParse(csvData);
    
    // Find the max of the y axis
    var yMax = d3.max(data, d => +d.value);

    // Find the domain of Date
    /** var extent = d3.extent(data, d => d.date)*/
  
    var extent = ["2010-01-01", "2021-01-01"]
    const xDomain = [new Date(extent[0]), new Date(extent[1])]

    // x, y Scale
    var x = d3.scaleTime()
        .domain(xDomain)
        .range([ 0, WIDTH ]);

    var y = d3.scaleLinear()
        .domain([0, yMax * 1.2])
        .range([ HEIGHT, 0 ]);

    // Call X and Y axis
    const xAxisCall = d3.axisBottom(x);
    vis.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);

    // Call Grid line
    /** Ref: https://www.essycode.com/posts/adding-gridlines-chart-d3/
     * Passing the negative chart height and width to the tickSize functions ensures that the axis lines will span across the chart. 
     * Passing an empty string to tickFormat ensures that tick labels aren’t rendered. 
     * The ticks function specifies the number of tick marks, here set to 10 to equal the count on the main axes.
     */
    const xAxisGridCall = d3.axisBottom(x).tickSize(-HEIGHT).tickFormat('').ticks(10); 
    vis.svg.append('g')
      .attr('transform', 'translate(0,' + HEIGHT + ')').attr('class', 'x axis-grid').call(xAxisGridCall);

    // Plot the graph
    vis.svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#4300FF")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x((d)=> x(new Date(d.date)) )
          .y((d)=> y(+d.value ))
        )

    // Remove 2010-01-01,0 from the data
    data.shift();
    
    // Add circle
    vis.svg
        .selectAll(".circle")
        .data(data)
        .join("circle") // enter append
        .attr("r", "5") // radius
        .attr("cx", d=> x(new Date(d.date)))   // center x passing through your xScale
        .attr("cy", d=> y(+d.value ))  // center y through your yScale
        .attr("fill", "#855CF8")
  }
}