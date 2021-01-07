import React, { useRef, useState, useEffect, Component } from "react";
import D3Scatterplot from "../components/d3_charts/D3Scatterplot";

const ScatterplotWrapper = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setChart(new D3Scatterplot(chartArea.current));
  }, []);

  useEffect(() => {
    if (chart != null) {
      console.log(props.cluster.cluster);
      chart.update(props.cluster.cluster);
    }
  }, [props.cluster]);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default ScatterplotWrapper;
