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

const ANIM_TIME = 300;  // Transition animation time in ms

export default class InvestmentHistogram {
  // barColors = { all: "#e60100", personal: "#07871e", blockchain: "#08a89e" }
  constructor(element, barColors) {
    let vis = this;

    /** Add a SVG canvas to the root element (div) */
    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.subgroups = ["all", "personal", "blockchain"];
    vis.groups = data.map(d => d.group);

    /** Scales for x-axis and y-axis */
    vis.x = d3.scaleBand()
      .domain(vis.groups)
      .range([0, WIDTH])
      .padding(0.2);

    // Find the max. numerical value in each object in the "data" array
    // ie. maxY_values = [13, 33, 28, 19]
    const maxY_values = data.map(d => {     // d = every object in the "data" array
      return d3.max(vis.subgroups, s => d[s]);
    });
    const maxY = d3.max(maxY_values);

    vis.y = d3.scaleLinear()
      .domain([0, maxY + 5])
      .range([HEIGHT, 0]);

    /** Draws x-axis and y-axis */
    vis.xAxisGroup = vis.g.append("g").attr("transform", `translate(0, ${HEIGHT})`);
    vis.xAxisGroup.call(d3.axisBottom(vis.x).tickSize(0));

    vis.yAxisGroup = vis.g.append("g");
    vis.yAxisGroup.call(d3.axisLeft(vis.y));

    /** Add another scale for subgroup position */
    vis.xSubgroup = d3
      .scaleBand()
      .domain(vis.subgroups)
      .range([0, vis.x.bandwidth()])
      .padding([0.05]);

    vis.color = d3.scaleOrdinal().domain(vis.subgroups).range(vis.subgroups.map(s => barColors[s]));

    /** Legends for axis */
    vis.g
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("font-size", 16)
      .attr("text-anchor", "middle")
      .text("x-axis Text");

    vis.g
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -40)
      .attr("transform", "rotate(-90)")
      .attr("font-size", 16)
      .attr("text-anchor", "middle")
      .text("y-axis Text");
    
    
    /** Rendering the bars */

    // Each group's bars is wrapped by a <g>.
    // barsGroup would select every <g> for every group and associate each group
    // with an element from the "data" array.
    vis.barsGroup = vis.g.append("g")
      .selectAll("g")
      .data(data);

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
          .attr("y", d => vis.y(d.value))
          .attr("width", vis.xSubgroup.bandwidth())
          .attr("height", d => HEIGHT - vis.y(d.value))
          .attr("fill", d => vis.color(d.key));
  }

  update(category) {
    const vis = this;

    /** Initialize the filtered and newKeys arrays */

    var filtered = [];  // Stores subgroup names to be hidden
    var newKeys = [];   // Stores subgroup names to be shown

    const { all, personal, blockchain } = category;

    if (all) {
      // Since all == true, we wish to show it. Thus, we push "all" into newKeys
      newKeys.push("all");  
    } else {
      filtered.push("all");
    }

    if (personal) {
      newKeys.push("personal");
    } else {
      filtered.push("personal");
    }

    if (blockchain) {
      newKeys.push("blockchain");
    } else {
      filtered.push("blockchain");
    }

    /** Update axis */

    vis.xSubgroup
      .domain(newKeys)
      .rangeRound([0, vis.x.bandwidth()]);

    vis.y
      .domain([
        0,
        d3.max(data, (d) => {
          return d3.max(vis.subgroups, key => {
            if (filtered.indexOf(key) === -1) return d[key];
          });
        }),
      ])
      .nice();

    // Animate the update of y-axis
    vis.yAxisGroup
      .transition().duration(ANIM_TIME)
      .call(d3.axisLeft(vis.y).ticks(null, "s"));

    
    /** Filter out the bands that need to be hidden */

    var bars = vis.g
      .selectAll(".bar")
      .selectAll("rect")
      .data(d => {
        return vis.subgroups.map(key => {
          return { key: key, value: d[key] };   // eg. {key: "all", value: 12}
        });
      });

    // Animate the removal of bars to be hidden
    bars
      .filter(d => {
        return filtered.indexOf(d.key) > -1;
      })
      .transition().duration(ANIM_TIME)
      // .attr("x", (d) => {
      //   return d3.select(this).attr("x") + d3.select(this).attr("width") / 2;
      // })
      .attr("height", 0)
      .attr("width", 0)
      .attr("y", HEIGHT);
      

    /** Adjust the remaining bars */
    bars
      .filter(d => {
        return filtered.indexOf(d.key) === -1;
      })
      .transition().duration(ANIM_TIME)
      .attr("x", d => {
        return vis.xSubgroup(d.key);
      })
      .attr("y", d => {
        return vis.y(d.value);
      })
      .attr("height", d => {
        return HEIGHT - vis.y(d.value);
      })
      .attr("width", vis.xSubgroup.bandwidth())
      .attr("fill", d => {
        return vis.color(d.key);
      });
  }
}
