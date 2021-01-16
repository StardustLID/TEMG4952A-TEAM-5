import { useRef, useState, useEffect } from "react";
import SingleBarChart from "../components/d3_charts/SingleBarChart";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SingleBarChartWrapper(props) {
  const { chartID } = props;

  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of SingleBarChart

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    // TODO: Use "chartID" to determine which API to call

    // Example API Call
    fetch("https://udemy-react-d3.firebaseio.com/tallest_men.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data!");
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setPlot(new SingleBarChart(plotArea.current, data));
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
