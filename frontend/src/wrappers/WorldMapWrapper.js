import { useRef, useState, useEffect } from "react";
import WorldMap from "../components/d3_charts/WorldMap";

export default function WorldMapWrapper(props) {
  const { chartID } = props;

  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of SingleBarChart

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    setPlot(new WorldMap(plotArea.current));
  }, []);

  // TODO: if use update then need to uncomment this part

  // Calls the update(category) method of SingleBarChart class when props.category updates
  // React will NOT re-render this component when props.category updates
  /*useEffect(() => {
    plot?.update(props.category);
  }, [plot, props.category]);*/

  return <div className="plot-area" ref={plotArea}></div>;
}
