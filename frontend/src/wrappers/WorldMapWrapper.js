import { useRef, useState, useEffect } from "react";
import WorldMap from "../components/d3_charts/WorldMap";
import LoadingSpinner from "../components/LoadingSpinner";

export default function WorldMapWrapper(props) {
  const { chartID } = props;

  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of WorldMap

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    // TODO: Use "chartID" to determine which API to call

    // Fetch multiple APIs together
    const geoDataPromise = fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch geoData!");
        }
        return res.json();
      })
      .catch(() => setError(true));

    const populationPromise = fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv",
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch population data!");
        }
        return res.text(); // TODO: Change to res.json() if the API returns JSON
      })
      .catch(() => setError(true));

    // Make sure that we finish all API fetches before we pass the fetched data to the constructor
    Promise.all([geoDataPromise, populationPromise]).then((values) => {
      const [geoData, populationCsv] = values;
      setLoading(false);
      setPlot(new WorldMap(plotArea.current, geoData, populationCsv));
    });
  }, []);

  // TODO: if use update then need to uncomment this part

  // Calls the update(category) method of SingleBarChart class when props.category updates
  // React will NOT re-render this component when props.category updates
  /*useEffect(() => {
    plot?.update(props.category);
  }, [plot, props.category]);*/

  return (
    <div className="plot-area" ref={plotArea}>
      {loading ? <LoadingSpinner error={error} /> : null}
    </div>
  );
}
