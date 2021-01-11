import { useRef, useState, useEffect } from "react";
import D3Piechart from "../components/d3_charts/D3Piechart";

const PiechartWrapper = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new D3Piechart(chartArea.current, props.data, props.updateName));
    } else {
      chart.update(props.data);
    }
  }, [chart, props.data]);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default PiechartWrapper;
