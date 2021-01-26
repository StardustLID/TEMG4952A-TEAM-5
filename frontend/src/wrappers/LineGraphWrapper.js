import { useRef, useState, useEffect } from "react";
import LineGraph from "../components/d3_charts/LineGraph";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

export default function LineGraphWrapper(props) {
  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of LineGraph

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    // "chartID" prop would be useful here to determine which API to call
    if (error) {
      setError(false);
    }

    let myParams = { name: props.selected };

    // Example: Fetch from API (See backend/app.py)
    axios
      .post("/features/funding-per-round", myParams)
      .then((res) => {
        setLoading(false);

        console.log(res.data);
        setPlot(new LineGraph(plotArea.current, res.data));
      })
      .catch(() => setError(true)); // failed to fetch data
  }, []);

  // TODO: if use update then need to uncomment this part
  // Calls the update(category) method of InvestmentHistogram class when props.category updates
  // React will NOT re-render this component when props.category updates
  useEffect(() => {
    let myParams = { name: props.selected };

    // Remove the error icon if a new graph is selected
    if (error) {
      setError(false);
    }

    if (props.selected != null) {
      if (plot) {
        plot.removeLineGraph(); // Method of SingleBarChart
      }

      axios
        .post("/features/funding-per-round", myParams)
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          plot?.update(plotArea.current, res.data);
        })
        .catch(() => {
          setError(true);
        }); // failed to fetch data
    }
  }, [plot, props.selected]);

  return loading || error ? <LoadingSpinner error={error} /> : <div className="plot-area" ref={plotArea} />;
}
