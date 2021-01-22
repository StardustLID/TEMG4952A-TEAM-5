import { useRef, useState, useEffect } from "react";
import Histogram from "../components/d3_charts/Histogram";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import featuresData from "../pages/featuresData";

export default function HistogramWrapper(props) {
  const { chartID } = props;
  const selectedDataObj = featuresData.find((element) => element.id === chartID);

  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of HistogramWrapper

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    // TODO: Use "chartID" to determine which API to call
    // Remove existing single bar chart when a new single bar chart is selected
    if(plot){
      plot.removeGraph(); // Method of Histogram
      setLoading(true);
    }

    if(error){
      setError(false)
    }

    // Example API Call
    axios
      .get(`/features/${selectedDataObj.id}`)
      .then((res) => {
        setLoading(false);
        setPlot(new Histogram(plotArea.current, res.data, selectedDataObj.axisLabels)); // res.data is a string of CSV data
      })
      .catch(() => setError(true)); // failed to fetch data
  }, [chartID]);

  // TODO: if use update then need to uncomment this part
  // Calls the update(category) method of InvestmentHistogram class when props.category updates
  // React will NOT re-render this component when props.category updates
  /**useEffect(() => {
    plot?.update(props.category);
  }, [plot, props.category]);*/

  return loading || error ? <LoadingSpinner error={error} /> : <div className="plot-area" ref={plotArea} />;
}
