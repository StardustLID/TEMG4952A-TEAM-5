/** Utility functions for D3.js graph plotting */

import * as d3 from "d3";

// Default graph dimensions
export const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 75, RIGHT: 10 };
export const WIDTH = 810 - MARGIN.LEFT - MARGIN.RIGHT;
export const HEIGHT = 550 - MARGIN.TOP - MARGIN.BOTTOM;


/** Creates a <svg /> element with padding to the root div element.
 * 
 * @param {any} element - Reference to the <div /> that the chart will be rendered in
 * @param {number} [width] - The `WIDTH` constant
 * @param {number} [height] - The `HEIGHT` constant
 * @param {object} [margin] - The constant `MARGIN` object
 */
export function createSvgCanvas(element, width = WIDTH, height = HEIGHT, margin = MARGIN) {
  return d3
    .select(element)
    .append("svg")
      .attr("width", width + margin.LEFT + margin.RIGHT)
      .attr("height", height + margin.TOP + margin.BOTTOM)
    .append("g")
      .attr("transform", `translate(${margin.LEFT}, ${margin.TOP})`);
}


/** Draws x-axis and y-axis labels.
 * 
 * @param {d3.Selection<SVGGElement, any, null, undefined>} svgRoot - `vis.vsg`
 * @param {string[]} axisLabels - An array containing the x-axis and y-axis labels
 * @param {number} [width] - The `WIDTH` constant
 * @param {number} [height] - The `HEIGHT` constant
 * @param {object} [margin] - The constant `MARGIN` object
 */
export function drawAxisLabels(svgRoot, axisLabels, width = WIDTH, height = HEIGHT, margin = MARGIN) {
    const [xLabel, yLabel] = axisLabels;

    svgRoot
      .append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.BOTTOM - 3)
        .attr("text-anchor", "middle")  // center text
        .text(xLabel);

    svgRoot
      .append("text")
        .attr("x", -(height / 2))
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text(yLabel);
}