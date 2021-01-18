import { useRef, useState, useEffect } from "react";
import SingleBarChart from "../components/d3_charts/SingleBarChart";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

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
    axios
      .get("/features/num-employees")
      .then((res) => {
        const axisLabels = ["Number of Employees", "Number of Companies"];

        setLoading(false);
        setPlot(new SingleBarChart(plotArea.current, res.data, axisLabels)); // res.data is a JSON array
      })
      .catch(() => setError(true)); // failed to fetch data
  }, []);

  // TODO: if use update then need to uncomment this part

  // Calls the update(category) method of SingleBarChart class when props.category updates
  // React will NOT re-render this component when props.category updates
  /*useEffect(() => {
    plot?.update(props.category);
  }, [plot, props.category]);*/

  return loading || error ? <LoadingSpinner error={error} /> : <div className="plot-area" ref={plotArea} />;
}
