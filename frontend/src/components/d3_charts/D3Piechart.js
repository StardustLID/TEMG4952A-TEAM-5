import * as d3 from "d3";

const MARGIN = { TOP: 30, BOTTOM: 40, LEFT: 60, RIGHT: 10 };
const WIDTH = 460 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

// TODO: change the d.value to d.dataname and d.data.key to d.data.dataname

export default class D3Piechart {
  constructor(element) {
    const vis = this;

    let radius = Math.min(WIDTH, HEIGHT)/2;

    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${WIDTH/2}, ${HEIGHT/2})`);

    const data = [{key: "a", value: 9},{ key: "b", value: 20},
      { key: "c", value : 30}, { key: "d", value : 8}, {key: "e", value: 12}]

    vis.color = d3
      .scaleOrdinal()
      .domain(data)
      .range(d3.schemeSet1)

    // Compute the position of each group on the pie:
    vis.pie = d3.pie()
      .value(d=>d.value)

    vis.data_ready = vis.pie(data)
    // Now I know that group A goes from 0 degrees to x degrees and so on.
    // shape helper to build arcs:
    vis.arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    vis.svg
      .selectAll('mySlices')
      .data(vis.data_ready)
      .enter()
      .append('path')
        .attr('d', vis.arcGenerator)
        .attr('fill', "null")
        .attr("stroke", "null")
        .transition()
        .duration(500)
          .attr('fill', (d)=>vis.color(d.data.key))
          .attr("stroke", "black")
          .style("stroke-width", "1px")


    // Now add the annotation. Use the centroid method to get the best coordinates
    vis.svg
      .selectAll('mySlices')
      .data(vis.data_ready)
      .enter()
      .append('text')
      .transition()
      .duration(500)
        .text((d)=>"grp " + d.data.key + " (" + d.data.value+ ")")
        .attr("transform", (d)=> "translate(" + vis.arcGenerator.centroid(d) + ")")
        .style("text-anchor", "middle")
        .style("font-size", 13)
      
  }
}
