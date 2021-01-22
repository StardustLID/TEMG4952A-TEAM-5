import * as d3 from "d3";

// Dummy data to be deleted
const data1 = [
  { age: "10", height: "152", name: "Tony", score: "100"},
  { age: "12", height: "148", name: "Jessica", score: "50" },
  { age: "9", height: "135", name: "Andrew", score: "30" },
  { age: "10", height: "145", name: "Emily", score: "70" },
  { age: "11", height: "141", name: "Richard", score: "90" },
];

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 800 - MARGIN.TOP - MARGIN.BOTTOM;

class BubblePlot {
  constructor(element, csvData) {
    let vis = this;

    // Parse CSV
    vis.data = d3.csvParse(csvData);

    // Create a SVG canvas at the root element (div.chart-area) 
    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    // Create linear scales for x-axis and y-axis
    // We first define their ranges. Their domains are defined in the update(cluster) method
    vis.x = d3.scaleLinear().range([0, WIDTH]);
    vis.y = d3.scaleLinear().range([HEIGHT, 0]);

    //Create the linear scale for the circle radius
    vis.radius = d3.scaleLinear().range([0, 20]);

    // Axis groups (ie. "containers" for the axis)
    vis.xAxisGroup = vis.g.append("g").attr("transform", `translate(0, ${HEIGHT})`);
    vis.yAxisGroup = vis.g.append("g");

    // Legends for axis 
    vis.g
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Degree Level");

    vis.g
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -50)
      .attr("transform", "rotate(-90)")
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Company Age");
    

    // Finish the initial rendering of the plot
    vis.update("phases");
  }

  update(cluster) {
    let vis = this;

    // Define the domain of x-axis and y-axis
    vis.x.domain([0, d3.max(vis.data, (d) => +d.x_values)]);
    vis.y.domain([0, d3.max(vis.data, (d) => +d.y_values)]);

    //radius domain
    vis.radius.domain([d3.min(vis.data, (d) => +d.score), d3.max(vis.data, (d) => +d.score)])

    // Render x-axis and y-axis on screen
    const xAxisCall = d3.axisBottom(vis.x);
    vis.xAxisGroup
      .transition().duration(500)   // Transition animation for the axis
      .call(xAxisCall);
    
    const yAxisCall = d3.axisLeft(vis.y);
    vis.yAxisGroup
      .transition().duration(500)
      .call(yAxisCall);

    // Data join
    const circles = vis.g.selectAll("circle").data(vis.data);

    // Exit
    circles.exit()
      .transition().duration(500)
      .attr("cy", vis.y(0))   // Dots would move downwards and get removed
      .remove();

    // Update
    circles
      .transition().duration(500)
      .attr("cx", (d) => vis.x(+d.x_values))
      .attr("cy", (d) => vis.y(+d.y_values));

    // Enter
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => vis.x(+d.x_values))
      .attr("cy", vis.y(0))   // Place the dots at bottom of the plot initially
      .attr("r", (d) => vis.radius(+d.score))
      .style("opacity", 0.5)
      .style("fill", "red")
      .style("stroke", "black")
      .transition().duration(500)
      .attr("cy", (d) => vis.y(+d.y_values));
  }
}

export default BubblePlot;
