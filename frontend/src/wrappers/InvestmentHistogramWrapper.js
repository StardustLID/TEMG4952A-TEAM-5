import { useRef, useState, useEffect } from "react";
import InvestmentHistogram from "../components/d3_charts/InvestmentHistogram";
import LoadingSpinner from "../components/LoadingSpinner";

export default function InvestmentHistogramWrapper(props) {
  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of InvestmentHistogram

  const [loading, setLoading] = useState(true);

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    setLoading(false);
    setPlot(new InvestmentHistogram(plotArea.current, props.barColors));
  }, []);

  // Calls the update(category) method of InvestmentHistogram class when props.category updates
  // React will NOT re-render this component when props.category updates
  useEffect(() => {
    plot?.update(props.category);
  }, [plot, props.category]);

  return (
    <div className="plot-area" ref={plotArea}>
      {loading ? <LoadingSpinner /> : null}
    </div>
  );
}
