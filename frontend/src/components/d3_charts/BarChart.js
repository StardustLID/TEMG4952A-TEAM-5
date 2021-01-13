import * as d3 from "d3";

const data = [
  { group: "lorem", all: 12, personal: 1, blockchain: 13 },
  { group: "ipsum", all: 6, personal: 6, blockchain: 33 },
  { group: "sample", all: 11, personal: 28, blockchain: 12 },
  { group: "text", all: 19, personal: 6, blockchain: 1 },
];

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 60, RIGHT: 10 };
const WIDTH = 460 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

const XLabel = "Hello";
const YLabel = "898";

const ANIM_TIME = 300; // Transition animation time in ms

export default class Histogram {
  constructor(element, barColors) {
    let vis = this;

    /** Add a SVG canvas to the root element (div) */
    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.xLabel = vis.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + MARGIN.BOTTOM)
      .attr("text-anchor", "middle") //to put it in the middle
      .text(XLabel);

    vis.svg
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -30)
      .attr("text-anchor", "middle")
      .text(YLabel)
      .attr("transform", "rotate(-90)"); // rotate in clockwise, then it will revert x and y

    vis.xAxisGroup = vis.svg.append("g").attr("transform", `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append("g");

    Promise.all([
      d3.json("https://udemy-react-d3.firebaseio.com/tallest_men.json"),
      d3.json("https://udemy-react-d3.firebaseio.com/tallest_women.json"),
    ]).then((datasets) => {
      vis.menData = datasets[0];
      vis.womenData = datasets[1];
      this.update("men");
    });
  }

  update(gender) {
    const vis = this;

    vis.data = gender === "men" ? this.menData : this.womenData;

    //scales for x and y
    const y = d3
      .scaleLinear()
      .domain([d3.min(vis.data, (d) => d.height) * 0.95, d3.max(vis.data, (d) => d.height)])
      .range([HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(vis.data.map((d) => d.name))
      .range([0, WIDTH])
      .padding(0.4);

    //Call Axis
    const xAxisCall = d3.axisBottom(x);
    vis.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);

    //Data Join
    const rects = vis.svg.selectAll("rect").data(vis.data);

    //Exit remove the element on the screen but no in the data array,
    //ie. when like length 6 to length 5, one will exit and the 5 elements will update
    rects.exit().transition().duration(400).attr("height", 0).attr("y", HEIGHT).remove();
    //transition make it short within 500ms

    //Update update the new rect that still exist in the data but also exist in the screen
    rects
      .transition()
      .duration(500)
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", (d) => HEIGHT - y(d.height));

    //Enter enter the new rect that not exist on the screen but in the data array
    rects
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("width", x.bandwidth)
      .attr("fill", "grey")
      .attr("y", HEIGHT)
      .transition()
      .duration(500)
      .attr("height", (d) => HEIGHT - y(d.height))
      .attr("y", (d) => y(d.height));

    //console.log(rects);
  }
}
