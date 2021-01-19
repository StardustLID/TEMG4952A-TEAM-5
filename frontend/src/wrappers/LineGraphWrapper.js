import { useRef, useState, useEffect } from "react";
import LineGraph from "../components/d3_charts/LineGraph";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import featuresData from "../pages/featuresData";

export default function LineGraphWrapper(props) {
  const { chartID } = props; // ID of features chart
  const selectedDataObj = featuresData.find((element) => element.id === chartID);

  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of LineGraph

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    // "chartID" prop would be useful here to determine which API to call

    // Example: Fetch from API (See backend/app.py)
    axios
      .get(`/features/${selectedDataObj.id}`)
      .then((res) => {

        setLoading(false);
        console.log(selectedDataObj.id)
        setPlot(new LineGraph(plotArea.current, res.data, selectedDataObj.axisLabels));
      })
      .catch(() => setError(true)); // failed to fetch data
  }, []);

  // TODO: if use update then need to uncomment this part
  // Calls the update(category) method of InvestmentHistogram class when props.category updates
  // React will NOT re-render this component when props.category updates
  /*useEffect(() => {
    plot?.update(props.category);
  }, [plot, props.category]);*/

  return loading || error ? <LoadingSpinner error={error} /> : <div className="plot-area" ref={plotArea} />;
}
