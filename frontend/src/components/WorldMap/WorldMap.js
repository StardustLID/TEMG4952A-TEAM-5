import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { latLng, latLngBounds } from "leaflet";
import axios from "axios";
import { csvParse as d3_csvParse } from "d3";
import "./WorldMap.css";
import WorldMapLegend from "./WorldMapLegend";
import WorldMapGeoJSON from "./WorldMapGeoJSON";
import WorldMapMarkers from "./WorldMapMarkers";

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
export const getColor = (companyCount) => {
  // prettier-ignore
  return companyCount >= 1500 ? "#006837" :
         companyCount >= 500  ? "#1e9652" :
         companyCount >= 150  ? "#78c679" :
         companyCount >= 50   ? "#addd8e" :
         companyCount >  0    ? "#e1f0c0" :
                               "#f5fcfb";
};

// Define the boundary of the map
const corner1 = latLng(-56, -180);
const corner2 = latLng(80, 180); // upper right corner
const bounds = latLngBounds(corner1, corner2);

export default function WorldMap() {
  const [geoData, setGeoData] = useState(null);
  const [topCompanyCities, setTopCompanyCities] = useState(null);

  useEffect(() => {
    axios
      .all([
        axios.get(`/features/funding-location`), // Get CSV file of country codes & no. of startups
        axios.get("/map/countries-geojson"), // Get GeoJSON file containing polygon coordinates for all countries
        axios.get("/features/top-companies-cities"), // Get no. of top 100 startups found in top 20 cities
      ])
      .then(
        axios.spread((resFeature, resCountries, resTopCompanyCities) => {
          const features = d3_csvParse(resFeature.data);
          const countries = resCountries.data;
          setTopCompanyCities(resTopCompanyCities.data);

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
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={API_URL}
      />
      <WorldMapLegend />
      {geoData && <WorldMapGeoJSON geoData={geoData} />}
      {topCompanyCities && <WorldMapMarkers countData={topCompanyCities} />}
    </MapContainer>
  );
}
