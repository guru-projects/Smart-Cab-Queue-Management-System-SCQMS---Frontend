import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const cabIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
  iconSize: [30, 30],
});

export default function MapView({ cabs = [] }) {
  const center = cabs.length
    ? [cabs[0].lat, cabs[0].lng]
    : [13.007, 80.220]; // Chennai area default

  return (
    <div className="card">
      <MapContainer
        center={center}
        zoom={12}
        style={{ width: "100%", height: 380, borderRadius: 12 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {cabs.map((cab) => (
          <Marker key={cab.id} position={[cab.lat, cab.lng]} icon={cabIcon}>
            <Popup>
              <b>{cab.cabNumber}</b><br />
              {cab.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
