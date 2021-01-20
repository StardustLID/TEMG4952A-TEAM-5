import * as d3 from "d3";

// Reference: https://www.d3-graph-gallery.com/graph/histogram_basic.html

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 60, RIGHT: 20 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class Histogram {
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
    vis.xLabel = vis.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + MARGIN.BOTTOM-10)
      .attr("text-anchor", "middle") //to put it in the middle
      .text(XLabel);

    //Set Y Label
    vis.svg
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .text(YLabel)
      .attr("transform", "rotate(-90)"); // rotate in clockwise, then it will revert x and y

    //Set x, y AxisGroup
    vis.xAxisGroup = vis.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append("g");

    const data = d3.csvParse(csvData); // Parse a string of CSV data
        
    let max = d3.max(data, (d) => d.x_values)
    var x = d3
        .scaleLinear()
        .domain([0, max * 1.1])
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
      .value((d) => {return +d.x_values;}) // I need to give the vector of value
      .domain(x.domain()) // then the domain of the graphic
      .thresholds(x.ticks(70)); // then the numbers of bins
      
    // And apply this function to data to get the bins
    var bins = histogram(data);
    
    // Y axis: scale and draw:
    var y = d3.scaleLinear().range([HEIGHT, 0]);
    y.domain([0,1.1 * d3.max(bins, function (d) {return d.length;})]); // d3.hist has to be called before the Y axis obviously
    vis.yAxisGroup.transition().duration(500).call(d3.axisLeft(y));

    /** Create horizontal grid lines (Ref: https://www.essycode.com/posts/adding-gridlines-chart-d3/)
     * Passing the negative chart height and width to the tickSize functions ensures that the axis lines will span across the chart. 
     * Passing an empty string to tickFormat ensures that tick labels aren’t rendered. 
     * The ticks function specifies the number of tick marks, here set to 10 to equal the count on the main axes.
     */
    const yAxisGridCall = d3.axisLeft(y).tickSize(-WIDTH).tickFormat("").ticks(10);
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
      .attr("y", HEIGHT)
      .transition()
      .duration(500)
      .attr("height", (d) => HEIGHT - y(d.length))
      .attr("y", (d)=>y(d.length));
  }

  removeGraph() {
    d3.selectAll("svg").remove();
  }
}
