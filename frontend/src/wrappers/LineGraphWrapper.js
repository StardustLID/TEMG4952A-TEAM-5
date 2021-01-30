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

        setPlot(new LineGraph(plotArea.current, res.data));
      })
      .catch(() => setError(true)); // failed to fetch data
  }, []);

  // Calls the update() method of LineGraph class when props.selected updates
  useEffect(() => {
    let myParams = { name: props.selected };

    // Remove the error icon if a new graph is selected
    if (error) {
      setError(false);
    }

    if (props.selected != null) {
      if (plot) {
        plot.removeLineGraph(); // Method of LineGraph
      }

      axios
        .post("/features/funding-per-round", myParams)
        .then((res) => {
          setLoading(false);
          plot?.update(plotArea.current, res.data);
        })
        .catch(() => {
          setError(true);
        }); // failed to fetch data
    }
  }, [plot, props.selected]);

  return loading || error ? <LoadingSpinner error={error} /> : <div className="plot-area" ref={plotArea} />;
}
