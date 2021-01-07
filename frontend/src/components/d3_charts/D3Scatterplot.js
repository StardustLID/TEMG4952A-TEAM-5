import * as d3 from "d3";

const url = "http://udemy-react-d3.firebaseio.com/children.json";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Scatterplot {
  constructor(element) {
    let vis = this;

    //Create Canvas
    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    //ScaleLinear
    vis.x = d3.scaleLinear().range([0, WIDTH]);
    vis.y = d3.scaleLinear().range([HEIGHT, 0]);

    //Axis Generator
    vis.xAxisGroup = vis.g.append("g").attr("transform", `translate(0, ${HEIGHT})`);
    vis.yAxisGroup = vis.g.append("g");

    vis.g
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Age");

    vis.g
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -50)
      .attr("transform", "rotate(-90)")
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Height in cm");

    d3.json(url).then((data) => {
      vis.data = data;

      // every second it will do "console.log"
      d3.interval(() => {
        vis.update();
      }, 1000);
    });

    /*this.update();
    console.log(vis.data);*/
  }

  update() {
    let vis = this;

    /*console.log("hi");
    console.log(vis.data);*/

    vis.x.domain([0, d3.max(vis.data, (d) => Number(d.age))]);
    vis.y.domain([0, d3.max(vis.data, (d) => Number(d.height))]);

    const xAxisCall = d3.axisBottom(vis.x);
    const yAxisCall = d3.axisLeft(vis.y);

    vis.xAxisGroup.call(xAxisCall);
    vis.yAxisGroup.call(yAxisCall);

    //data join
    const circles = vis.g.selectAll("circle").data(vis.data, (d) => d.name);

    //Exit
    circles.exit().transition(1000).attr("cy", vis.y(0)).remove();

    //update
    circles
      .transition(1000)
      .attr("cx", (d) => vis.x(d.age))
      .attr("cy", (d) => vis.y(d.height));

    //enter
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => vis.x(d.age))
      .attr("cy", (d) => vis.y(0))
      .attr("r", 5)
      .attr("fill", "red")
      .transition(1000)
      .attr("cy", (d) => vis.y(d.height));
  }
}

export default D3Scatterplot;
