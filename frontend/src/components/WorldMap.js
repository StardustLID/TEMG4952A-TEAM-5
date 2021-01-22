import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const styles = {
  mapRoot: {
    height: 500,
  },
};

// Mapbox Static Tiles API: https://docs.mapbox.com/api/maps/static-tiles/
const STYLE_URL = "mapbox/light-v9";
const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;

const API_URL = `https://api.mapbox.com/styles/v1/${STYLE_URL}/tiles/256/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`;

export default function WorldMap(props) {
  const { chartID } = props;

  // TODO: Use chartID to determine which API to call

  return (
    <MapContainer style={styles.mapRoot} center={[51.505, -0.09]} zoom={2}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={API_URL}
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>ABC Company</Popup>
      </Marker>
    </MapContainer>
  );
}
