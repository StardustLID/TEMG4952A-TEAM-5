import * as d3 from "d3";
import * as d3Utils from "./D3Utilities";
import "./ToolTip.css";

// Use default WIDTH, HEIGHT & MARGIN from d3Utils

export default class LineGraph {
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
        .range([ 0, d3Utils.WIDTH ]);

    var y = d3.scaleLinear()
        .domain([0, yMax * 1.2])
        .range([ d3Utils.HEIGHT, 0 ]);

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
    const xAxisGridCall = d3.axisBottom(x).tickSize(-d3Utils.HEIGHT).tickFormat('').ticks(10); 
    vis.svg.append('g')
      .attr('transform', 'translate(0,' + d3Utils.HEIGHT + ')').attr('class', 'x axis-grid').call(xAxisGridCall);

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

    // Define the div for the tooltip
    var div = d3.select(element).append("div")	
      .attr("class", "tooltip")				
      .style("opacity", 0);

    // Add circle
    vis.svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle") // enter append
        .attr("fill", "#855CF8")
        .attr("r", "5") // radius
        .attr("cx", d=> x(new Date(d.date)))   // center x passing through your xScale
        .attr("cy", d=> y(+d.value ))  // center y through your yScale
        .on("mouseover", function(event, d) {	
          // Reduce the opacity of the circle
          d3.select(this).transition()
            .duration('50')
            .style('opacity', '0.8');
          
          // Makes the div appears
          div.transition()
              .duration(200)		
              .style("opacity", 1);	
              
          // Put the value into the div and place it near the user’s mouse
          div	.html(d.date + "<br/>"  + d.value)	
              .style("left", (event.pageX + 10) + "px")		
              .style("top", (event.pageY + 10) + "px");	

        })
        .on("mouseout", function(d) {		

          // Bring back the opacity of the circle
          d3.select(this).transition()
            .duration('50')
            .style('opacity', '1');

          // Makes the div disappear
          div.transition()
            .duration('50')
            .style("opacity", 0);
        })
  }
}