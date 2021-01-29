import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { getColor } from "./WorldMap";

export default function WorldMapLegend() {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [0, 50, 150, 500, 1500];

      let labels = [];
      labels.push(`<div><i style="background:${getColor(0)}"></i> No data</div>`);

      grades.forEach((item, index) => {
        let from = item;
        let to = grades[index + 1];

        labels.push(
          `<div><i style="background:${getColor(from + 1)}"></i> ${from}${to ? "&ndash;" + to : "+"}</div>`,
        );
      });

      div.innerHTML = labels.join("");
      return div;
    };

    legend.addTo(map);
  }, []);

  return null;
}
