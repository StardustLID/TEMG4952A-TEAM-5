import { useRef, useState, useEffect } from "react";
import SingleBarChart from "../components/d3_charts/SingleBarChart";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import featuresData from "../pages/featuresData";

export default function SingleBarChartWrapper(props) {
  const { chartID } = props;
  const selectedDataObj = featuresData.find((element) => element.id === chartID);

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

    axios
      .get(`/features/${selectedDataObj.id}`)
      .then((res) => {
        setLoading(false);
        setPlot(new SingleBarChart(plotArea.current, res.data, selectedDataObj.axisLabels));
      })
      .catch(() => setError(true)); // failed to fetch data
  }, [chartID]);

  return loading || error ? <LoadingSpinner error={error} /> : <div className="plot-area" ref={plotArea} />;
}
