import * as d3 from "d3";
import * as d3Utils from "./D3Utilities";
import "./GridLines.css";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 65, RIGHT: 10 };
const WIDTH = 575 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 525 - MARGIN.TOP - MARGIN.BOTTOM;

export const barColors = {
  all: "#750c0c",
  cat_pca_0: "#e60100",
  cat_pca_1: "#07871e",
  cat_pca_2: "#109ea1",
  cat_pca_3: "#fa5300",
  cat_pca_4: "#8f35d4",
};

export default class CompanyAgeChart {
  /**
   * @param element - Reference to the <div /> that the chart will be rendered in 
   * @param {string} csvData - The CSV data file
   * @param {string[]} axisLabels - The x-axis and y-axis labels
   */
  constructor(element, csvData, axisLabels) {
    let vis = this;

    const data = d3.csvParse(csvData);

    vis.subgroups = ["all"];  // Initially "Show All" category is selected
    vis.groups = data.map(d => d.company_age);

    // Add a SVG canvas to the root element
    vis.svg = d3Utils.createSvgCanvas(element, WIDTH, HEIGHT, MARGIN);

    // Set the x-axis & y-axis labels
    d3Utils.drawAxisLabels(vis.svg, axisLabels, WIDTH, HEIGHT, MARGIN);

    // Scales for x-axis and y-axis
    vis.x = d3.scaleBand()
      .domain(vis.groups)
      .range([0, WIDTH])
      .padding(0.2);

    const maxY = d3.max(data.map(d => +d.all));   // `+d.all` = `parseInt(d.all)`
    vis.y = d3.scaleLinear()
      .domain([0, maxY * 1.05])
      .range([HEIGHT, 0]);
    
    // Scale for x-axis subgroup
    vis.xSubgroup = d3.scaleBand()
      .domain(vis.subgroups)
      .range([0, vis.x.bandwidth()])
      .padding(0.05);
    
    // Render x-axis & y-axis
    [vis.xAxisGroup, vis.yAxisGroup] = d3Utils.createAxisGroups(vis.svg, HEIGHT);
    
    vis.xAxisGroup
      .transition().duration(500)
      .call(d3.axisBottom(vis.x));
    
    vis.yAxisGroup
      .transition().duration(500)
      .call(d3.axisLeft(vis.y));
    
    /** Create horizontal grid lines (Ref: https://www.essycode.com/posts/adding-gridlines-chart-d3/)
     * Passing the negative chart height and width to the tickSize functions ensures that the axis lines will span across the chart. 
     * Passing an empty string to tickFormat ensures that tick labels aren’t rendered. 
     * The ticks function specifies the number of tick marks, here set to 10 to equal the count on the main axes.
     */
    const yAxisGridCall = d3.axisLeft(vis.y).tickSize(-WIDTH).tickFormat("").ticks(10);
    vis.svg
      .append("g")
        .attr("class", "axis-grid")
      .call(yAxisGridCall);
    

    /* Render the bars */

    // Each group's bars is wrapped by a <g>.
    // It selects every <g> for every group and associate each group with an element from the "data" array
    vis.barsGroup = vis.svg.append("g")
      .selectAll("g")
      .data(data);
    
    // For each CSV row, create a new <g> and insert corresponding bars
    vis.barsGroup.enter()
      .append("g")
        .attr("class", "bar")
        .attr("transform", d => `translate(${vis.x(+d.company_age)}, 0)`)
      // Select all rectangles within this <g>
      .selectAll("rect")
      .data(csvRow =>
        vis.subgroups.map(key => {
          return { key: key, value: +csvRow[key] };
        })
      )
      // eg. [{ key: "all", value: 138 }]
      // For each element in the above array, append a <rect> for it
      .enter()
        .append("rect")
          .attr("x", d => vis.xSubgroup(d.key))
          .attr("y", HEIGHT)
          .attr("width", vis.xSubgroup.bandwidth())
          .attr("fill", d => barColors[d.key])
          .transition().duration(500)
          .attr("y", d => vis.y(d.value))
          .attr("height", d => HEIGHT - vis.y(d.value));
  }

  update(category) {
    const vis = this;
    const {group, cat_pca_0, cat_pca_1, cat_pca_2, cat_pca_3, cat_pca_4 } = category;

    console.log(category);
  }

  removeGraph() {
    d3.selectAll("svg").remove();
  }
}