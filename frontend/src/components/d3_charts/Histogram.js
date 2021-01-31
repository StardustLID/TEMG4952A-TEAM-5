import * as d3 from "d3";
import * as d3Utils from "./D3Utilities";

// Reference: https://www.d3-graph-gallery.com/graph/histogram_basic.html

// Use default WIDTH, HEIGHT & MARGIN from d3Utils

export default class Histogram {
  /**
   * @param element - Reference to the <div /> that the chart will be rendered in 
   * @param {string} csvData - The CSV data file
   * @param {string[]} axisLabels - The x-axis and y-axis labels
   */
  constructor(element, csvData, axisLabels) {
    let vis = this;

    // Add a SVG canvas to the root element
    vis.svg = d3Utils.createSvgCanvas(element);

    // Set the x-axis & y-axis labels
    d3Utils.drawAxisLabels(vis.svg, axisLabels);

    //Set x, y AxisGroup
    [vis.xAxisGroup, vis.yAxisGroup] = d3Utils.createAxisGroups(vis.svg);

    const data = d3.csvParse(csvData); // Parse a string of CSV data
        
    let max = d3.max(data, (d) => +d.x_values)

    var x = d3
        .scaleLinear()
        .domain([0, max * 1.1])
        .range([0, d3Utils.WIDTH]);

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
      .value((d) => {return +d.x_values;}) // I need to give the vector of value
      .domain(x.domain()) // then the domain of the graphic
      .thresholds(x.ticks(70)); // then the numbers of bins
      
    // And apply this function to data to get the bins
    var bins = histogram(data);
    
    // Y axis: scale and draw:
    var y = d3.scaleLinear().range([d3Utils.HEIGHT, 0]);
    y.domain([0,1.1 * d3.max(bins, function (d) {return d.length;})]); // d3.hist has to be called before the Y axis obviously
    vis.yAxisGroup.transition().duration(500).call(d3.axisLeft(y));

    // Create horizontal grid lines (Ref: https://www.essycode.com/posts/adding-gridlines-chart-d3/)
    const yAxisGridCall = d3.axisLeft(y).tickSize(-d3Utils.WIDTH).tickFormat("").ticks(10);
    vis.svg.append("g")
      .attr("class", "axis-grid")
      .call(yAxisGridCall);
      
    // append the bar rectangles to the svg element
    vis.svg
      .selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", (d)=>x(d.x0))
      .attr("width",(d)=> x(d.x1) - x(d.x0) - 1)
      .attr("fill", "#69b3a2")
      .attr("y", d3Utils.HEIGHT)
      .transition()
      .duration(500)
      .attr("height", (d) => d3Utils.HEIGHT - y(d.length))
      .attr("y", (d)=>y(d.length));
  }

  removeGraph() {
    d3.selectAll("svg").remove();
  }
}
