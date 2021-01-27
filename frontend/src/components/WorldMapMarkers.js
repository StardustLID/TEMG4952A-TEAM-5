import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import topCitiesLocation from "./topCitiesLocation.json";
import marker0_png from "../assets/map_marker0.png";
import marker1_png from "../assets/map_marker1.png";
import marker2_png from "../assets/map_marker2.png";

export default function WorldMapMarkers(props) {
  const { countData } = props;

  // Deep red marker
  const marker0 = L.icon({
    iconUrl: marker0_png,
    iconSize: [35, 35],
    iconAnchor: [17, 34],
    popupAnchor: [0, -30],
  });

  const marker1 = L.icon({
    iconUrl: marker1_png,
    iconSize: [35, 35],
    iconAnchor: [17, 34],
    popupAnchor: [0, -30],
  });

  const marker2 = L.icon({
    iconUrl: marker2_png,
    iconSize: [35, 35],
    iconAnchor: [17, 34],
    popupAnchor: [0, -30],
  });

  const chooseMarker = (count) => {
    // prettier-ignore
    return count >= 8 ? marker0 :
           count >= 5 ? marker1 :
           count >= 3 ? marker2 :
                        null;
  };

  return topCitiesLocation.map((element) => {
    const marker = chooseMarker(countData[element.id]);

    return marker ? (
      <Marker position={element.position} icon={marker}>
        <Popup>
          <p style={{ margin: "3px 0px" }}>{element.id.substring(5)}</p>
          <p style={{ margin: "3px 0px" }}>No. of Top 100 companies: {countData[element.id]}</p>
        </Popup>
      </Marker>
    ) : null;
  });
}
