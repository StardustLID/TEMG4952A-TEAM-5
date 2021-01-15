import * as d3 from "d3";

// TODO: Total 3 Tasks, Reference: https://www.d3-graph-gallery.com/graph/choropleth_hover_effect.html

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 60, RIGHT: 20 };
const WIDTH = 460 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

// TODO: Task 1 input the json/csv
const csv =
  "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv";
// TODO: Task 2 Change the d.price to d.dataname on line 60, 80


export default class WorldMap {
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

    // Map and projection
    vis.path = d3.geoPath();
    vis.projection = d3.geoMercator()
        .scale(70)
        .center([0,20])
        .translate([WIDTH / 2, HEIGHT / 2]);

    // Data and color scale
    vis.colorScale = d3.scaleThreshold()
      .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
      .range(d3.schemeBlues[7]);

    // d3.map() changed to new Map() from ES6
    var map1 = new Map()

    // HERE still need to change dk Y here return an array
    const data = d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", data => {
        console.log(data.code);
        console.log(data.pop);
        map1.set(data.code, +data.pop)
  }
    )
    
    console.log(map1)
   // console.log(data.all())
    //console.log(data.[0])
    console.log(map1.get("COG"))

/*
    // Load external data and boot
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then ((geoData) =>{

       let mouseOver = function(d) {
         d3.selectAll(".Country")
           .transition()
           .duration(200)
           .style("opacity", .5)
         d3.select(this)
           .transition()
           .duration(200)
           .style("opacity", 1)
           .style("stroke", "black")
       }

       let mouseLeave = function(d) {
         d3.selectAll(".Country")
           .transition()
           .duration(200)
           .style("opacity", .8)
         d3.select(this)
           .transition()
           .duration(200)
           .style("stroke", "transparent")
       }

       // Draw the map
       vis.svg.append("g")
         .selectAll("path")
         .data(geoData.features)
         .enter()
         .append("path")
           // draw each country
           .attr("d", vis.path
             .projection(vis.projection)
           )
           // set the color of each country
           .attr("fill", function (d) {
             d.total = data.get(d.id) || 0;
             return vis.colorScale(d.total);
           })
           .style("stroke", "transparent")
           .attr("class", function(d){ return "Country" } )
           .style("opacity", .8)
           .on("mouseover", mouseOver )
           .on("mouseleave", mouseLeave )
         }
     })*/
    }
}   