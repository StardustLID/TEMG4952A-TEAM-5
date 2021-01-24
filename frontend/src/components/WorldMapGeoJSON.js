import { useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { getColor } from "./WorldMap";

export default function WorldMapGeoJSON(props) {
  const { geoData } = props;

  // Reference to the Leaflet.js `map` instance
  const map = useMap();

  // Reference to <GeoJSON />
  // `geoJsonRef.current` is equivalent to `geojson = L.geojson(...)`
  const geoJsonRef = useRef();

  const info = L.control();

  useEffect(() => {
    info.onAdd = () => {
      info._div = L.DomUtil.create("div", "info");
      info.update();
      return info._div;
    };

    info.update = (properties) => {
      let message = "Hover over a country";

      if (properties) {
        message =
          properties.company_count === 0
            ? `<b>${properties.country_name}</b><br />No data`
            : `<b>${properties.country_name}</b><br />${properties.company_count} start-ups`;
      }

      info._div.innerHTML = "<h4>Number of Start-ups</h4>" + message;
    };

    info.addTo(map);
  }, [info, map]);

  const style = (feature) => {
    return {
      weight: 1.5, // ~ stroke width
      opacity: 1,
      color: "#b0b0b0",
      fillColor: getColor(feature.properties.company_count),
      fillOpacity: 0.7,
    };
  };

  // Highlight the country on hover
  const highlightFeature = (event) => {
    var layer = event.target;

    layer.setStyle({
      weight: 3,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.75,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    // Update the info box on top right corner
    info.update(layer.feature.properties);
  };

  // Reset the styling of a country when mouse leaves
  const resetHighlight = (event) => {
    geoJsonRef.current.resetStyle(event.target);
    info.update();
  };

  // Zoom to the country when it's clicked
  const zoomToFeature = (event) => {
    map.fitBounds(event.target.getBounds());
  };

  // Define which event handlers to run for each GeoJSON feature (ie. country)
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
    });
  };

  return <GeoJSON data={geoData} style={style} ref={geoJsonRef} onEachFeature={onEachFeature} />;
}
