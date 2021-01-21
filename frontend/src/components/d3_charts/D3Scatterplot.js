import * as d3 from "d3";

// Dummy data to be deleted
const data1 = [
  { age: "10", height: "152", name: "Tony" },
  { age: "12", height: "148", name: "Jessica" },
  { age: "9", height: "135", name: "Andrew" },
  { age: "10", height: "145", name: "Emily" },
  { age: "11", height: "141", name: "Richard" },
];

const data2 = [
  { age: "29", height: "170", name: "Tony" },
  { age: "26", height: "180", name: "Jessica" },
  { age: "34", height: "169", name: "Andrew" },
  { age: "54", height: "174", name: "Emily" },
  { age: "33", height: "178", name: "Richard" },
];

const data3 = [
  { age: "67", height: "100", name: "Tony" },
  { age: "10", height: "100", name: "Jessica" },
  { age: "55", height: "100", name: "Andrew" },
  { age: "45", height: "100", name: "Emily" },
  { age: "33", height: "170", name: "Richard" },
];

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Scatterplot {
  constructor(element) {
    let vis = this;

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
      .text("Sample text");

    vis.g
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -50)
      .attr("transform", "rotate(-90)")
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Sample text");

    vis.data1 = data1;
    vis.data2 = data2;
    vis.data3 = data3;

    // Finish the initial rendering of the plot
    vis.update("phases");
  }

  update(cluster) {
    let vis = this;

    console.log(cluster);

    if (cluster === "phases") {
      vis.data = vis.data1;
    } else if (cluster === "sizes") {
      vis.data = vis.data2;
    } else {
      vis.data = vis.data3;
    }

    // Define the domain of x-axis and y-axis
    vis.x.domain([0, d3.max(vis.data, (d) => Number(d.age))]);
    vis.y.domain([0, d3.max(vis.data, (d) => Number(d.height))]);

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
    const circles = vis.g.selectAll("circle").data(vis.data, (d) => d.name);

    // Exit
    circles.exit()
      .transition().duration(500)
      .attr("cy", vis.y(0))   // Dots would move downwards and get removed
      .remove();

    // Update
    circles
      .transition().duration(500)
      .attr("cx", (d) => vis.x(d.age))
      .attr("cy", (d) => vis.y(d.height));

    // Enter
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => vis.x(d.age))
      .attr("cy", vis.y(0))   // Place the dots at bottom of the plot initially
      .attr("r", 5)
      .attr("fill", "red")
      .transition().duration(500)
      .attr("cy", (d) => vis.y(d.height));
  }
}

export default D3Scatterplot;
