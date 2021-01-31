import * as d3 from "d3";
import * as d3Utils from "./D3Utilities";
import "./GridLines.css";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 65, RIGHT: 0 };
const WIDTH = 580 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 525 - MARGIN.TOP - MARGIN.BOTTOM;

export const barColors = {
  all: "#750c0c",
  commerce_shopping: "#e60100",
  fin_services: "#07871e",
  lending_invests: "#109ea1",
  payments: "#fa5300",
};

export default class CompanyAgeChart {
  /**
   * @param element - Reference to the <div /> that the chart will be rendered in 
   * @param {string} csvData - The CSV data file
   * @param {string[]} axisLabels - The x-axis and y-axis labels
   */
  constructor(element, csvData, axisLabels) {
    let vis = this;

    vis.allSubGroups = ["all", "commerce_shopping", "fin_services", "lending_invests", "payments"];

    vis.data = d3.csvParse(csvData);

    vis.subgroups = ["all"];  // Initially "Show All" category is selected
    vis.groups = vis.data.map(d => d.company_age);

    // Add a SVG canvas to the root element
    vis.svg = d3Utils.createSvgCanvas(element, WIDTH, HEIGHT, MARGIN);

    // Set the x-axis & y-axis labels
    d3Utils.drawAxisLabels(vis.svg, axisLabels, WIDTH, HEIGHT, MARGIN);

    // Scales for x-axis and y-axis
    vis.x = d3.scaleBand()
      .domain(vis.groups)
      .range([0, WIDTH])
      .padding(0.2);

    const maxY = d3.max(vis.data.map(d => +d.all));   // `+d.all` = `parseInt(d.all)`
    vis.y = d3.scaleLinear()
      .domain([0, maxY * 1.05])
      .range([HEIGHT, 0]);
    
    // Scale for x-axis subgroup
    vis.xSubgroup = d3.scaleBand()
      .domain(vis.subgroups)
      .range([0, vis.x.bandwidth()])
      .padding(0);
    
    // Render x-axis & y-axis
    [vis.xAxisGroup, vis.yAxisGroup] = d3Utils.createAxisGroups(vis.svg, HEIGHT);
    
    vis.xAxisGroup
      .transition().duration(500)
      .call(d3.axisBottom(vis.x));
    
    vis.yAxisGroup
      .transition().duration(500)
      .call(d3.axisLeft(vis.y));
    
    // Create horizontal grid lines (Ref: https://www.essycode.com/posts/adding-gridlines-chart-d3/)
    const yAxisGridCall = d3.axisLeft(vis.y).tickSize(-WIDTH).tickFormat("").ticks(10);
    vis.svg
      .append("g")
        .attr("class", "axis-grid")
      .call(yAxisGridCall);
    

    /* Render the bars */

    // Each group's bars is wrapped by a <g>.
    // It selects every <g> for every group and associate each group with an element from the "data" array
    vis.barsGroup = vis.svg
      .append("g")
        .attr("class", "bars-container")
      .selectAll("g")
      .data(vis.data);
    
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
    const {group, commerce_shopping, fin_services, lending_invests, payments } = category;

    /* Initialize the `newKeys` array */

    var newKeys = [];   // Stores subgroup names to be shown

    if (group === "all") {
      newKeys = ["all"];
    }
    else {
      commerce_shopping && newKeys.push("commerce_shopping");
      fin_services && newKeys.push("fin_services");
      lending_invests && newKeys.push("lending_invests");
      payments && newKeys.push("payments");
    }

    /* Update axis */

    vis.xSubgroup
      .domain(newKeys)
      .rangeRound([0, vis.x.bandwidth()]);
    
    const maxY = d3.max(vis.data, (d) => {
      return d3.max(newKeys, key => +d[key]);  // For each row, find maxY value for columns in `newKeys`
    });

    vis.y.domain([0, maxY * 1.05]);

    // Animate the update of y-axis
    vis.yAxisGroup
      .transition().duration(500)
      .call(d3.axisLeft(vis.y));
    
    /* Filter out the bands that need to be hidden */

    const barsGroup = vis.svg.selectAll(".bar");

    const bars = barsGroup
      .selectAll("rect")  // Similar to CSS selector "g.bar rect"
      .data(d => {
        return vis.allSubGroups.map(key => ({ key, value: +d[key] }));
      });
      // Example data array: [{ key: "all", value: 133 }, { key: "cat_pca_0", value: 11 }, ...]
    
    // Animate the removal of bars to be hidden
    bars
      .filter(d => newKeys.indexOf(d.key) < 0)  // ie. bars to be removed
      .transition().duration(500)
      .attr("height", 0)
      .attr("width", 0)
      .attr("y", HEIGHT);

    /* Add bars to the graph */

    vis.barsGroup.enter()
      .append("g")
        .attr("class", "bar")
        .attr("transform", d => `translate(${vis.x(+d.company_age)}, 0)`)
      .selectAll("rect")
      .data(csvRow =>
        newKeys.map(key => {
          return { key: key, value: +csvRow[key] };
        })
      )
      .enter()
        .append("rect")
          .attr("x", d => vis.xSubgroup(d.key))
          .attr("y", HEIGHT)
          .attr("width", vis.xSubgroup.bandwidth())
          .attr("fill", d => barColors[d.key])
          .transition().duration(500)
          .attr("y", d => vis.y(d.value))
          .attr("height", d => HEIGHT - vis.y(d.value));

    
    /* Adjust the remaining bars */
    
    bars
      .filter(d => newKeys.indexOf(d.key) !== -1) // ie. bars to be shown
      .transition().duration(500)
      .attr("x", d => vis.xSubgroup(d.key))
      .attr("y", d => vis.y(d.value))
      .attr("height", d => HEIGHT - vis.y(d.value))
      .attr("width", vis.xSubgroup.bandwidth())
      .attr("fill", d => barColors[d.key]);
  }

  removeGraph() {
    d3.selectAll("svg").remove();
  }
}