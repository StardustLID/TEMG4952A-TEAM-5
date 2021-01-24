import { useRef, useState, useEffect } from "react";
import SingleBarChart from "../components/d3_charts/SingleBarChart";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

export default function ChangableWrapper(props) {
  const { chartID } = props;

  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of SingleBarChart

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Render the graph whenever props.chartID changes
  useEffect(() => {
    // Remove existing single bar chart when a new single bar chart is selected
    if (plot) {
      plot.removeGraph(); // Method of SingleBarChart
      setLoading(true);
    }

    // Remove the error icon if a new graph is selected
    if (error) {
      setError(false);
    }

    let myParams = { xaxis: props.xaxis, yaxis: props.yaxis };

    axios
      .post("/ChangableGraph", myParams)
      .then((res) => {
        setLoading(false);
        console.log([res.data]);
        //setPlot(new SingleBarChart(plotArea.current, res.data));
      })
      .catch(() => setError(true)); // failed to fetch data
  }, []);

  // TODO: if use update then need to uncomment this part

  // Calls the update(category) method of SingleBarChart class when props.category updates
  // React will NOT re-render this component when props.category updates
  useEffect(() => {
    let myParams = { xaxis: props.xaxis, yaxis: props.yaxis };

    axios
      .post("/ChangableGraph", myParams)
      .then((res) => {
        setLoading(false);
        console.log([res.data]);
        //plot?.update(props.category);
      })
      .catch(() => setError(true)); // failed to fetch data
  }, [plot, props.xaxis, props.yaxis]);

  return loading || error ? <LoadingSpinner error={error} /> : <div className="plot-area" ref={plotArea} />;
}
