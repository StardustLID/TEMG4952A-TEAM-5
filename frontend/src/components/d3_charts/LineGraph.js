import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 60, RIGHT: 10 };
const WIDTH = 460 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

// TODO: Task 1 input the XLabel, YLabel, json/csv
const XLabel = "Hello";
const YLabel = "898";
const csv =
"https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv";
//TODO: Task 2 CHange the d.date and d.value to d.dataname on line 54, 57, 84, 85
// where d.date is for x axis and d.value is for y axis

export default class LineGraph {
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

    d3.csv(csv).then((data) => {
        // Find the max of the y axis
        var yMax = d3.max(data, function(d) { return +d.value; });

        // Find the domain of Date 
        var extent = d3.extent(data, function(d) { return d.date; })
        const xDomain = [new Date(extent[0]), new Date(extent[1])]

        // x, y Scale
        var x = d3.scaleTime()
            .domain(xDomain)
            .range([ 0, WIDTH ]);

        var y = d3.scaleLinear()
            .domain([0, yMax])
            .range([ HEIGHT, 0 ]);

        // Call X and Y axis
        const xAxisCall = d3.axisBottom(x);
        vis.xAxisGroup.transition().duration(500).call(xAxisCall);

        const yAxisCall = d3.axisLeft(y);
        vis.yAxisGroup.transition().duration(500).call(yAxisCall);

        // Plot the graph
        vis.svg
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
              .x((d)=> x(new Date(d.date)) )
              .y((d)=> y(d.value ))
            )
    })

}


}