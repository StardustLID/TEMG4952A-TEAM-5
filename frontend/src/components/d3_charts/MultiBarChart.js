import * as d3 from "d3";
import * as d3Utils from "./D3Utilities";

// Reference: https://www.d3-graph-gallery.com/graph/barplot_grouped_basicWide.html

// Use default WIDTH, HEIGHT & MARGIN from d3Utils

export default class MultiBarChart {
  constructor(element, csvData, axisLabels) {
    let vis = this;

    // Add a SVG canvas to the root element
    vis.svg = d3Utils.createSvgCanvas(element);

    // Set the x-axis & y-axis labels
    d3Utils.drawAxisLabels(vis.svg, axisLabels);

    //Set x, y AxisGroup
    [vis.xAxisGroup, vis.yAxisGroup] = d3Utils.createAxisGroups(vis.svg);

    const data = d3.csvParse(csvData);  // Parse a string of CSV data

    // List of subgroups = header of the csv files 
    vis.subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    vis.groups = data.map((d)=>d.group)
    const maxY_values = data.map(d => {     // d = every object in the "data" array
        return d3.max(vis.subgroups, s => +d[s]);
    });
    const maxY = d3.max(maxY_values)
    
    //scales for x and y
    vis.x = d3
       .scaleBand()
       .domain(vis.groups)
       .range([0, d3Utils.WIDTH])
       .padding(0.4)
    vis.y = d3
       .scaleLinear()
       .domain([0, maxY * 1.2])
       .range([d3Utils.HEIGHT, 0]);

    //Call Axis
    const xAxisCall = d3.axisBottom(vis.x);
    vis.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(vis.y);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall)   
    
    /** Add another scale for subgroup position */
    vis.xSubgroup = d3
        .scaleBand()
        .domain(vis.subgroups)
        .range([0, vis.x.bandwidth()])
        .padding([0.05])

    /** scale for coloring */
    vis.color = d3
        .scaleOrdinal()
        .domain(vis.subgroups)
        .range(['#e41a1c','#377eb8','#4daf4a']);

        
    /** List for Category Ref: https://observablehq.com/@d3/grouped-bar-chart */
    /*vis.list = vis.svg
        .attr("transform", `translate(${d3Utils.WIDTH},0)`)
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
      .selectAll("g")
      .data(vis.subgroups)
      .enter()
        .append("rect")
          .attr("x", -19)
          .attr("width", 19)
          .attr("height", 19)
          .attr("fill", d => vis.color(d))
        .append("text")
          .attr("x", -24)
          .attr("y", 9.5)
          .attr("dy", "0.35em")
          .text(d => d);*
     /**  .join("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);*/
  
    // Each group's bars is wrapped by a <g>.
    // barsGroup would select every <g> for every group and associate each group
    // with an element from the "data" array.
    vis.barsGroup = vis.svg.append("g")
        .selectAll("g")
        .data(data)

    // Create a new <g> and add corresponding bars for every new group/category
    // Each <g> holds max. of 3 <rect> for the bars
    vis.barsGroup.enter()
        .append("g")
            .attr("class", "bar")
            .attr("transform", (d) => `translate(${vis.x(d.group)}, 0)`)
        // Select all rectangles within the <g> for a particular group
        .selectAll("rect")
        .data((d) =>
            vis.subgroups.map((key) => {
              return { key: key, value: d[key] };
            }),
        )
        // [{key: "all", value: 12}, {key: "personal", value: 1}, {key: "blockchain", value: 13}]
        // For each element in the above array, append a <rect> for it
        .enter()
          .append("rect")
            .attr("x", d => vis.xSubgroup(d.key))
            .attr("y", d3Utils.HEIGHT)
            .attr("width", vis.xSubgroup.bandwidth())
            .attr("fill", d => vis.color(d.key))
            .transition()
            .duration(500)
            .attr("height", d => d3Utils.HEIGHT - vis.y(d.value))
            .attr("y", d => vis.y(d.value))
  } 
}
