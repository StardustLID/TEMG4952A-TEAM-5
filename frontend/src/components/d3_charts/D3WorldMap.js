import * as d3 from "d3";
import "../WorldMap.css";

// Reference: https://www.d3-graph-gallery.com/graph/choropleth_hover_effect.html

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 60, RIGHT: 20 };
const WIDTH = 850 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class WorldMap {
  /**
   * @param element - Reference to the root <div /> the graph is rendered in
   * @param geoData - JSON object containing path coordinates to draw each country
   * @param {string} visualizationDataCsv - A CSV file containing data we wish to visualize.
   * It should contain a column called `code` which lists all the possible country codes
   */
  constructor(element, geoData, visualizationDataCsv) {
    let vis = this;

    /** Add a SVG canvas to the root element (div) */
    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    // Map and projection
    vis.path = d3.geoPath();
    vis.projection = d3.geoMercator()   // https://github.com/d3/d3-geo-projection#geoMercator
        .scale(130)
        .translate([WIDTH / 2 - 50, HEIGHT / 2 + 70]);

    // Data and color scale
    vis.colorScale = d3.scaleThreshold()
      .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
      .range(d3.schemeBlues[7]);

    // d3.map() changed to new Map() from ES6
    // It stores key-value pairs with key = country code ; value = population
    var map1 = new Map();

    const visData = d3.csvParse(visualizationDataCsv);
    visData.forEach((item) => {
      // TODO: Change item.pop to item.XXX
      map1.set(item.code, +item.pop)   // `+item.pop` is equivalent to `parseInt(item.pop)`
    });

    // Load external data and boot

    /* NOTE: Use function() instead of ES6 arrow function here
      * If we use "function()", "this" equals to the HTML element we hovered on it
      * If we use arrow function, "this" equals to the WorldMap object itself
      */
    const mouseOver = function() {
      d3.selectAll(".world-map-country")
        .transition().duration(150)
        .style("opacity", .4);

      d3.select(this)
        .transition().duration(150)
        .style("opacity", 1);
    }

    const mouseLeave = function() {
      d3.selectAll(".world-map-country")
        .transition().duration(150)
        .style("opacity", .8);
    }

    // Draw the map
    vis.svg.append("g")
      .selectAll("path")
      .data(geoData.features) // Coordinates for each country
      .enter()
      .append("path")
        // draw each country
        .attr("d", vis.path
          .projection(vis.projection)
        )
        // set the color of each country
        .attr("fill", (d) => {
          const population = map1.get(d.id) || 0;
          return vis.colorScale(population);
        })
        .style("stroke", "transparent")
        .attr("class", "world-map-country")
        .style("opacity", .8)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave);
  }
}   