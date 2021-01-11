import { useRef, useState, useEffect } from "react";
import InvestmentHistogram from "../components/d3_charts/InvestmentHistogram";

export default function InvestmentHistogramWrapper(props) {
  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of InvestmentHistogram

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    setPlot(new InvestmentHistogram(plotArea.current, plotArea.barColors));
  }, []);

  // Calls the update(gender) method of D3Scatterplot class when props.cluster updates
  // React will NOT re-render this component when props.cluster updates
  useEffect(() => {
    plot?.update(props.category);
    //console.log(props.category);
  }, [plot, props.category]);

  return <div className="plot-area" ref={plotArea}></div>;
}
