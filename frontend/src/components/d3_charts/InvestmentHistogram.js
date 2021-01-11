import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };
const WIDTH = 700 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

const data1 = [
  { height: "777", name: "A" },
  { height: "999", name: "B" },
  { height: "1000", name: "C" },
  { height: "444", name: "D" },
  { height: "656", name: "E" },
  { height: "200", name: "F" },
];

const data2 = [
  { height: "200", name: "A" },
  { height: "555", name: "B" },
  { height: "400", name: "C" },
  { height: "222", name: "D" },
  { height: "400", name: "E" },
  { height: "199", name: "F" },
];

const data3 = [
  { height: "577", name: "A" },
  { height: "444", name: "B" },
  { height: "600", name: "C" },
  { height: "222", name: "D" },
  { height: "0", name: "E" },
  { height: "1", name: "F" },
];

export default class InvestmentHistogram {
  constructor(element, barColors) {
    let vis = this;

    // Create a SVG canvas at the root element (div.plot-area)
    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    // Create x Label
    vis.xLabel = vis.g
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + MARGIN.BOTTOM)
      .attr("text-anchor", "middle") //to put it in the middle
      .text("The World tallest");

    //Create y Label
    vis.g
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .text("Height in cm")
      .attr("transform", "rotate(-90)");

    // Axis groups ("containers" for axis)
    vis.xAxisGroup = vis.g.append("g").attr("transform", `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.g.append("g");

    vis.allData = data1;
    vis.personalData = data2;
    vis.blockchainData = data3;

    /*
    //THIS PART SHOULD BE IN THE UPDATE PART IF THE X AND Y AXIS NEED TO CHANGE
    vis.y = d3
      .scaleLinear()
      .domain([0, d3.max(vis.allData, (d) => d.height)])
      .range([HEIGHT, 0]);

    vis.x = d3
      .scaleBand()
      .domain(vis.allData.map((d) => d.name))
      .range([0, WIDTH])
      .padding(0.4);

    //Call Axis
    const xAxisCall = d3.axisBottom(vis.x);
    vis.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(vis.y);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);
    */

    this.update({
      all: true,
      personal: true,
      blockchain: true,
    });
  }

  createAll() {
    /*
    const vis = this;

    //Data Join
    const rects = vis.g.selectAll("rect").data(vis.allData);

    //Exit remove the element on the screen but no in the data array,
    //ie. when like length 6 to length 5, one will exit and the 5 elements will update
    rects.exit().transition().duration(400).attr("height", 0).attr("y", HEIGHT).remove();
    //transition make it short within 500ms

    //Update update the new rect that still exist in the data but also exist in the screen
    rects
      .transition()
      .duration(500)
      .attr("x", (d) => vis.x(d.name))
      .attr("y", (d) => vis.y(d.height))
      .attr("width", vis.x.bandwidth)
      .attr("height", (d) => HEIGHT - vis.y(d.height));

    //Enter enter the new rect that not exist on the screen but in the data array
    rects
      .enter()
      .append("rect")
      .attr("x", (d) => vis.x(d.name) - 10)
      .attr("width", vis.x.bandwidth)
      .attr("fill", "grey")
      .attr("y", HEIGHT)
      .transition()
      .duration(500)
      .attr("height", (d) => HEIGHT - vis.y(d.height))
      .attr("y", (d) => vis.y(d.height));

      */
  }

  createPersonal() {
    /*
    const vis = this;

    //Data Join
    const rects = vis.g.selectAll("rect").data(vis.personalData);

    //Exit remove the element on the screen but no in the data array,
    //ie. when like length 6 to length 5, one will exit and the 5 elements will update
    rects.exit().transition().duration(400).attr("height", 0).attr("y", HEIGHT).remove();
    //transition make it short within 500ms

    //Update update the new rect that still exist in the data but also exist in the screen
    rects
      .transition()
      .duration(500)
      .attr("x", (d) => vis.x(d.name))
      .attr("y", (d) => vis.y(d.height))
      .attr("width", vis.x.bandwidth)
      .attr("height", (d) => HEIGHT - vis.y(d.height));

    //Enter enter the new rect that not exist on the screen but in the data array
    rects
      .enter()
      .append("rect")
      .attr("x", (d) => vis.x(d.name))
      .attr("width", vis.x.bandwidth)
      .attr("fill", "grey")
      .attr("y", HEIGHT)
      .transition()
      .duration(500)
      .attr("height", (d) => HEIGHT - vis.y(d.height))
      .attr("y", (d) => vis.y(d.height));
      */
  }

  createBlockchain() {
    /*
    const vis = this;

    //Data Join
    const rects = vis.g.selectAll("rect").data(vis.BlockchainData);

    //Exit remove the element on the screen but no in the data array,
    //ie. when like length 6 to length 5, one will exit and the 5 elements will update
    rects.exit().transition().duration(400).attr("height", 0).attr("y", HEIGHT).remove();
    //transition make it short within 500ms

    //Update update the new rect that still exist in the data but also exist in the screen
    rects
      .transition()
      .duration(500)
      .attr("x", (d) => vis.x(d.name) + 10)
      .attr("y", (d) => vis.y(d.height))
      .attr("width", vis.x.bandwidth)
      .attr("height", (d) => HEIGHT - vis.y(d.height));

    //Enter enter the new rect that not exist on the screen but in the data array
    rects
      .enter()
      .append("rect")
      .attr("x", (d) => vis.x(d.name) + 10)
      .attr("width", vis.x.bandwidth)
      .attr("fill", "green")
      .attr("y", HEIGHT)
      .transition()
      .duration(500)
      .attr("height", (d) => HEIGHT - vis.y(d.height))
      .attr("y", (d) => vis.y(d.height));
      */
  }

  update(category) {
    const vis = this;

    console.log(category);

    if (category.all) this.createAll();

    if (category.personal) this.createPersonal();

    if (category.blockchain) this.createBlockchain();
  }
}
