import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// fix default icon path if necessary (Leaflet default icon needs a setup in some build systems)

export default function MapView({ center = [13.0109, 80.2120], cabs = [] }) {
  return (
    <div style={{ height: 400 }}>
      <MapContainer center={center} zoom={14} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cabs.map((cab) => (
          <Marker key={cab.id} position={[cab.latitude, cab.longitude]}>
            <Popup>
              {cab.cabNumber} <br /> {cab.status} <br /> Updated: {new Date(cab.updatedAt).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
