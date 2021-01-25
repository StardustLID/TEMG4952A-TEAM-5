import { useRef, useState, useEffect } from "react";
import ChangeableGraph from "../components/d3_charts/ChangeableGraph";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

const axisLabels = {
  employee_count: "Employee Count",
  company_age: "Company Age",
  degree_level: "Average Degree Level of Executives *",
  first_fund: "Fund Size in Seeds/Angels",
  num_invested: "Number Invested by Top 100",
  mean_momentum: "Mean Momentum",
};

export default function ChangeableWrapper(props) {
  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of ChangeableGraph

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Remove the error icon if a new graph is selected
    if (error) {
      setError(false);
    }

    let myParams = { xaxis: props.xaxis, yaxis: props.yaxis };
    let axisLabel = [axisLabels[props.xaxis], axisLabels[props.yaxis]];

    axios
      .post("/ChangableGraph", myParams)
      .then((res) => {
        setLoading(false);
        setPlot(new ChangeableGraph(plotArea.current, res.data, axisLabel, myParams));
      })
      .catch((error) => {
        console.log(error);
      }); // failed to fetch data
  }, []);

  // Calls the update(category) method of SingleBarChart class when props.category updates
  // React will NOT re-render this component when props.category updates
  useEffect(() => {
    let myParams = { xaxis: props.xaxis, yaxis: props.yaxis };
    let axisLabel = [axisLabels[props.xaxis], axisLabels[props.yaxis]];

    // Remove the error icon if a new graph is selected
    if (error) {
      setError(false);
    }

    axios
      .post("/ChangableGraph", myParams)
      .then((res) => {
        setLoading(false);
        plot?.update(res.data, axisLabel, myParams);
      })
      .catch(() => {
        setError(true);
      }); // failed to fetch data
  }, [plot, props.xaxis, props.yaxis]);

  const degreeTypeNote =
    props.xaxis === "degree_level" || props.yaxis === "degree_level" ? (
      <p style={{ fontSize: 14, color: "#555", margin: "15px 30px" }}>
        * 0 = No data / No university degree ; 1 = Bachelor ; 2 = Master ; 3 = PhD
      </p>
    ) : null;

  return loading || error ? (
    <LoadingSpinner error={error} />
  ) : (
    <>
      <div className="plot-area" ref={plotArea} />
      {degreeTypeNote}
    </>
  );
}
