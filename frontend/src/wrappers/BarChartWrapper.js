import { useRef, useState, useEffect } from "react";
import BarChart from "../components/d3_charts/BarChart";

export default function BarChartWrapper(props) {
  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of InvestmentHistogram

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    setPlot(new BarChart(plotArea.current));
  }, []);

  // Calls the update(category) method of InvestmentHistogram class when props.category updates
  // React will NOT re-render this component when props.category updates
  /*useEffect(() => {
    plot?.update(props.category);
  }, [plot, props.category]);*/

  return <div className="plot-area" ref={plotArea}></div>;
}
