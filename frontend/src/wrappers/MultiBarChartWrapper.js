import { useRef, useState, useEffect } from "react";
import MultiBarChart from "../components/d3_charts/MultiBarChart";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SingleBarChartWrapper(props) {
  const { chartID } = props;

  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of MultiBarChart

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    // TODO: Use "chartID" to determine which API to call

    // Example API Call
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data!");
        }
        return res.text(); // TODO: Change to `res.json()` if the fetched file is JSON
      })
      .then((data) => {
        setLoading(false);
        setPlot(new MultiBarChart(plotArea.current, data));
      })
      .catch(() => setError(true)); // When failed to fetch data
  }, []);

  // TODO: if use update then need to uncomment this part

  // Calls the update(category) method of SingleBarChart class when props.category updates
  // React will NOT re-render this component when props.category updates
  /*useEffect(() => {
    plot?.update(props.category);
  }, [plot, props.category]);*/

  return (
    <div className="plot-area" ref={plotArea}>
      {loading ? <LoadingSpinner error={error} /> : null}
    </div>
  );
}
