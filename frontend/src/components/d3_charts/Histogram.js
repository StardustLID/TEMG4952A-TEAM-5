import * as d3 from "d3";

// TODO: Total 3 Tasks, Reference: https://www.d3-graph-gallery.com/graph/histogram_basic.html

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 60, RIGHT: 20 };
const WIDTH = 460 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

// TODO: Task 1 input the XLabel, YLabel, json/csv
const XLabel = "Hi";
const YLabel = "Bye";
const csv =
  "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv";
// TODO: Task 2 Change the d.price to d.dataname on line 60, 80


export default class Histogram {
  constructor(element, csvData) {
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

    const data = d3.csvParse(csvData); // Parse a string of CSV data
       
      /** TODO: Task 3 Choose Which Max
      *  if the maximum is too far from the general data, then choose 1000
      *  Otherwise, use the d3.max function*/
        
      //let max = d3.max(data, (d) => d.price)
      let max = 1000

      var x = d3
          .scaleLinear()
          .domain([0, max])
          .range([0, WIDTH]);

      //Call Axis
      const xAxisCall = d3.axisBottom(x);
      vis.xAxisGroup.transition().duration(500).call(xAxisCall);

      // set the parameters for the histogram
      // x.ticks divide the x.domain into different interval, ie. [0, 10), [10, 20), [20, 30) ...
      // Thresholds are defined as an array of values [x0, x1, …]. Any value less than x0 will be placed in the first bin; 
      // any value greater than or equal to x0 but less than x1 will be placed in the second bin; and so on. 
      // Thus, the generated bins will have thresholds.length + 1 bins.
      var histogram = 
        d3
        .bin()
        .value((d) => {return d.price;}) // I need to give the vector of value
        .domain(x.domain()) // then the domain of the graphic
        .thresholds(x.ticks(70)); // then the numbers of bins
        
      // And apply this function to data to get the bins
      var bins = histogram(data);
      
      // Y axis: scale and draw:
      var y = d3.scaleLinear().range([HEIGHT, 0]);
      y.domain([0,d3.max(bins, function (d) {return d.length;})]); // d3.hist has to be called before the Y axis obviously
      vis.yAxisGroup.transition().duration(500).call(d3.axisLeft(y));
        
      // append the bar rectangles to the svg element
        
      vis.svg
        .selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", (d)=>x(d.x0))
        .attr("width",(d)=> x(d.x1) - x(d.x0) - 1)
        .attr("fill", "#69b3a2")
        .attr("y", HEIGHT)
        .transition()
        .duration(500)
        .attr("height", (d) => HEIGHT - y(d.length))
        .attr("y", (d)=>y(d.length));
  }
}
