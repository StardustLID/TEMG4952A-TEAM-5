import { useRef, useState, useEffect } from "react";
import D3Scatterplot from "../components/d3_charts/D3Scatterplot";

/** A wrapper for using D3.js code inside React to render the "Recent Investments" scatterplot
 * in the Home page. It serves as an interface between React code and D3.js code.
 */
const ScatterplotWrapper = (props) => {
  const chartArea = useRef(null); // To be set to reference to a div where the plot will be rendered inside
  const [chart, setChart] = useState(null); // "chart" will later point to an instance of D3Scatterplot

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    setChart(new D3Scatterplot(chartArea.current));
  }, []);

  // Calls the update(cluster) method of D3Scatterplot class when props.cluster updates
  // React will NOT re-render this component when props.cluster updates
  useEffect(() => {
    chart?.update(props.cluster);
  }, [chart, props.cluster]);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default ScatterplotWrapper;
