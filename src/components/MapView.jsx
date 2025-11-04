import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const cabIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
  iconSize: [30, 30],
});

export default function MapView({ cabs = [] }) {
  return (
    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={12}
      style={{ width: "100%", height: "350px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {cabs.map((cab) => (
        <Marker key={cab.id} position={[cab.lat, cab.lng]} icon={cabIcon}>
          <Popup>
            <b>{cab.cabNumber}</b> — {cab.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
