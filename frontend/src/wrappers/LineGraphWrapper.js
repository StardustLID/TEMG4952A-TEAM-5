import { useRef, useState, useEffect } from "react";
import LineGraph from "../components/d3_charts/LineGraph";

export default function LineGraphWrapper(props) {
  const { chartID } = props; // ID of features chart

  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of InvestmentHistogram

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    // Example: Fetch from API (See backend/app.py)
    fetch("/line-graph-test")
      .then((res) => res.json())
      .then((data) => {
        setPlot(new LineGraph(plotArea.current, data));
      });
  }, []);

  // TODO: if use update then need to uncomment this part
  // Calls the update(category) method of InvestmentHistogram class when props.category updates
  // React will NOT re-render this component when props.category updates
  /*useEffect(() => {
    plot?.update(props.category);
  }, [plot, props.category]);*/

  return <div className="plot-area" ref={plotArea}></div>;
}
