import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { latLng, latLngBounds } from "leaflet";
import axios from "axios";
import { csvParse as d3_csvParse } from "d3";
import "./d3_charts/WorldMap.css";
import L from "leaflet";

const styles = {
  mapRoot: {
    height: 500,
  },
};

// Mapbox Static Tiles API: https://docs.mapbox.com/api/maps/static-tiles/
const STYLE_URL = "mapbox/light-v9";
const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
const API_URL = `https://api.mapbox.com/styles/v1/${STYLE_URL}/tiles/256/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`;

// Create a simple index for the GeoJSON file
// eg. { ABW: 0, AFG: 1, ...}, where `0`, `1`, ... are the array index of geoJson.features
const createGeoJsonIndex = (geoJson) => {
  const geoIndex = {};

  geoJson.features.forEach((item, index) => {
    geoIndex[item.properties.ISO_A3] = index;
  });

  return geoIndex;
};

// Return a color for the choropleth
const getColor = (companyCount) => {
  // prettier-ignore
  return companyCount > 1500 ? "#006837" :
         companyCount > 400  ? "#1e9652" :
         companyCount > 100  ? "#78c679" :
         companyCount > 40   ? "#addd8e" :
         companyCount > 0    ? "#e1f0c0" :
                               "#f5fcfb";
};

const style = (feature) => {
  return {
    weight: 1.5, // ~ stroke width
    opacity: 1,
    color: "#b0b0b0",
    fillColor: getColor(feature.properties.company_count),
    fillOpacity: 0.7,
  };
};

// Define the boundary of the map
const corner1 = latLng(-56, -180);
const corner2 = latLng(80, 180); // upper right corner
const bounds = latLngBounds(corner1, corner2);

// Highlight the country on hover
function highlightFeature(event) {
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

  // Get the company count of each country
  console.log(layer.feature.properties.company_count);
}

export default function WorldMap(props) {
  const { chartID } = props;
  const [geoData, setGeoData] = useState(null);

  // To be equal to the Leaflet map instance, ie. similar to `const map = L.map('map');`
  // Reference: https://stackoverflow.com/q/65394203/11067496
  const [map, setMap] = useState(null);

  // Reference to <GeoJSON />. Then, `geoJsonRef` is similar to `geoJson = L.geojson(...)`
  const geoJsonRef = useRef();

  // Reset the styling of a country when mouse leaves
  const resetHighlight = (event) => {
    geoJsonRef.current.resetStyle(event.target);
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

  useEffect(() => {
    // 1st API - Get CSV file containing country codes and no. of startups
    // 2nd API - Get the GeoJSON file containing polygon coordinates for all countries
    axios.all([axios.get(`/features/${chartID}`), axios.get("/map/countries-geojson")]).then(
      axios.spread((resFeature, resCountries) => {
        const features = d3_csvParse(resFeature.data);
        const countries = resCountries.data;

        const countriesIndex = createGeoJsonIndex(countries);

        // Add a new property called `company_count` for every country
        countries.features.forEach((country) => {
          country.properties.company_count = 0;
        });

        // Add a new property called `company_count` to the GeoJSON data
        features.forEach((row) => {
          // `countries.features` is an array. This will get the array index of a country
          const countryIndex = countriesIndex[row.country_code];

          if (countries.features[countryIndex]) {
            // Add a new property called `company_count`
            countries.features[countryIndex].properties.company_count = +row.count;
          }
        });

        setGeoData(countries);
      }),
    );
  }, []);

  return (
    <MapContainer
      style={styles.mapRoot}
      center={[51.505, -0.09]}
      zoom={2}
      minZoom={2}
      maxZoom={10}
      maxBounds={bounds} // Set the map's viewable area
      whenCreated={(map) => setMap(map)} // Set the `map` state to be the Leaflet map instance
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={API_URL}
      />
      {geoData && <GeoJSON data={geoData} style={style} ref={geoJsonRef} onEachFeature={onEachFeature} />}
      <Marker position={[51.505, -0.09]}>
        <Popup>ABC Company</Popup>
      </Marker>
    </MapContainer>
  );
}
