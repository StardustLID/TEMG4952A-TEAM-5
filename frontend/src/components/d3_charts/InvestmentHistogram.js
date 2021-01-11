import * as d3 from "d3";

const data = [
  { group: "banana", all: 12, personal: 1, blockchain: 13 },
  { group: "poacee", all: 6, personal: 6, blockchain: 33 },
  { group: "sorgho", all: 11, personal: 28, blockchain: 12 },
  { group: "triticum", all: 19, personal: 6, blockchain: 1 },
];

const MARGIN = { TOP: 10, BOTTOM: 20, LEFT: 50, RIGHT: 30 };
const WIDTH = 460 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

export default class InvestmentHistogram {
  constructor(element) {
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
    vis.groups = ["banana", "poacee", "sorgho", "triticum"];

    /** Scales for x-axis and y-axis */

    vis.x = d3.scaleBand().domain(vis.groups).range([0, WIDTH]).padding(0.2);

    vis.y = d3.scaleLinear().domain([0, 40]).range([HEIGHT, 0]);

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

    vis.color = d3.scaleOrdinal().domain(vis.subgroups).range(["#e41a1c", "#377eb8", "#4daf4a"]);

    /** Rendering */
    vis.barsGroup = vis.g.append("g").selectAll("g").data(data);

    // ENTER
    vis.barsGroup
      .enter()

      // Create a <g> for every group ("banana", "poacee", "sorgho", "triticum")
      // Each group has one <g> that holds the 3 bars
      .append("g")
      .attr("class", "bar")
      .attr("transform", (d) => `translate(${vis.x(d.group)}, 0)`)
      .selectAll("rect")
      .data((d) =>
        vis.subgroups.map((key) => {
          return { key: key, value: d[key] };
        }),
      )
      // [{key: "Nitrogen", value: "12"}, {key: "normal", value: "1"}, {key: "stress", value: "13"}]
      // For each element in the above array, append a <rect> for it
      .enter()
      .append("rect")
      .attr("x", (d) => vis.xSubgroup(d.key))
      .attr("y", (d) => vis.y(d.value))
      .attr("width", vis.xSubgroup.bandwidth())
      .attr("height", (d) => HEIGHT - vis.y(d.value))
      .attr("fill", (d) => vis.color(d.key));
  }

  update(category) {
    const vis = this;

    // Inititalize the filtered and newKeys arrays
    var filtered = [];
    var newKeys = [];

    const { all, personal, blockchain } = category;

    if (all) {
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

    console.log(filtered);
    console.log(newKeys);

    vis.xSubgroup.domain(newKeys).rangeRound([0, vis.x.bandwidth()]);
    vis.y
      .domain([
        0,
        d3.max(data, function (d) {
          return d3.max(vis.subgroups, function (key) {
            if (filtered.indexOf(key) == -1) return d[key];
          });
        }),
      ])
      .nice();

    // update the y axis: (works)
    vis.yAxisGroup.transition().call(d3.axisLeft(vis.y).ticks(null, "s")).duration(500);

    //
    // Filter out the bands that need to be hidden:
    //
    var bars = vis.g
      .selectAll(".bar")
      .selectAll("rect")
      .data(function (d) {
        return vis.subgroups.map(function (key) {
          return { key: key, value: d[key] };
        });
      });

    bars
      .filter(function (d) {
        return filtered.indexOf(d.key) > -1;
      })
      .transition()
      .attr("x", function (d) {
        return d3.select(this).attr("x") + d3.select(this).attr("width") / 2;
      })
      .attr("height", 0)
      .attr("width", 0)
      .attr("y", function (d) {
        return HEIGHT;
      })
      .duration(500);

    //
    // Adjust the remaining bars:
    //
    bars
      .filter(function (d) {
        return filtered.indexOf(d.key) == -1;
      })
      .transition()
      .attr("x", function (d) {
        return vis.xSubgroup(d.key);
      })
      .attr("y", function (d) {
        return vis.y(d.value);
      })
      .attr("height", function (d) {
        return HEIGHT - vis.y(d.value);
      })
      .attr("width", vis.xSubgroup.bandwidth())
      .attr("fill", function (d) {
        return vis.color(d.key);
      })
      .duration(500);
  }
}
