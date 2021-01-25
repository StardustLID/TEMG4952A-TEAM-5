import { useRef, useState, useEffect } from "react";
import ChangableGraph from "../components/d3_charts/ChangeableGraph";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

var map = new Map();
map.set("employee_count", "Employee Count");
map.set("company_age", "Company Age");
map.set("degree_level", "Executive Degree Level");
map.set("first_fund", "Fund Size in Seeds/Angels");
map.set("num_invested", "Number Invested by Top 100");
map.set("mean_momentum", "Mean Momentum");

export default function ChangableWrapper(props) {
  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of SingleBarChart

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Render the graph whenever props.chartID changes
  useEffect(() => {
    // Remove existing single bar chart when a new single bar chart is selected
    /**if (plot) {
      plot.removeGraph(); // Method of SingleBarChart
      setLoading(true);
    }*/

    // Remove the error icon if a new graph is selected
    if (error) {
      setError(false);
    }

    let myParams = { xaxis: props.xaxis, yaxis: props.yaxis };
    let axisLabel = [map.get(props.xaxis), map.get(props.yaxis)];

    axios
      .post("/ChangableGraph", myParams)
      .then((res) => {
        setLoading(false);
        //console.log(res.data);
        setPlot(new ChangableGraph(plotArea.current, res.data, axisLabel));
      })
      .catch((error) => {
        setError(true);
        //console.log(error);
      }); // failed to fetch data
  }, []);

  // TODO: if use update then need to uncomment this part

  // Calls the update(category) method of SingleBarChart class when props.category updates
  // React will NOT re-render this component when props.category updates
  useEffect(() => {
    let myParams = { xaxis: props.xaxis, yaxis: props.yaxis };
    let axisLabel = [map.get(props.xaxis), map.get(props.yaxis)];

    // Remove the error icon if a new graph is selected
    if (error) {
      setError(false);
    }

    axios
      .post("/ChangableGraph", myParams)
      .then((res) => {
        setLoading(false);
        //console.log(res.data);
        plot?.update(res.data, axisLabel);
      })
      .catch(() => {
        setError(true);
      }); // failed to fetch data
  }, [plot, props.xaxis, props.yaxis]);

  return loading || error ? <LoadingSpinner error={error} /> : <div className="plot-area" ref={plotArea} />;
}
