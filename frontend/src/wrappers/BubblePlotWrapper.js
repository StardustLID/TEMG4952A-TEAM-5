import { useRef, useState, useEffect } from "react";
import BubblePlot from "../components/d3_charts/BubblePlot";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

export default function SingleBarChartWrapper(props) {
  const { chartID } = props;

  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of SingleBarChart

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Render the graph whenever props.chartID changes
  useEffect(() => {
    // Remove existing single bar chart when a new single bar chart is selected
   /*if (plot) {
      plot.removeGraph(); // Method of SingleBarChart
      setLoading(true);
    }*/

    // Remove the error icon if a new graph is selected
    if (error) {
      setError(false);
    }

    axios
      .get("/BubblePlot")
      .then((res) => {
        console.log(res.data)
        setLoading(false);
        setPlot(new BubblePlot(plotArea.current, res.data));
      })
      .catch(() => setError(true)); 


  }, []);

  // TODO: if use update then need to uncomment this part

  // Calls the update(category) method of SingleBarChart class when props.category updates
  // React will NOT re-render this component when props.category updates
  /*useEffect(() => {
    plot?.update(props.category);
  }, [plot, props.category]);*/

  return  loading || error ? <LoadingSpinner error={error} /> :<div className="plot-area" ref={plotArea} />;
}
