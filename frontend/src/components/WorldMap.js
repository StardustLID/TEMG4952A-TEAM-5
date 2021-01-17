import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const styles = {
  mapRoot: {
    height: 500,
  },
};

// Mapbox Static Tiles API: https://docs.mapbox.com/api/maps/static-tiles/
const STYLE_URL = "mapbox/light-v9";
const ACCESS_TOKEN =
  "pk.eyJ1IjoiYW5zb25oIiwiYSI6ImNrazB2M2tqYjA5anAyd3BqbmtvOG53MjYifQ.nv1WU0C7VoOfPdc7GYo6Fg";

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
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
