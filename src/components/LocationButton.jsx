import React, { useState } from "react";
import { updateLocation } from "../api/driverApi";

export default function LocationButton({ onUpdated }) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by this browser.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          };
          const res = await updateLocation(data);
          setLoading(false);
          onUpdated && onUpdated(res.data);
          alert("Location updated");
        } catch (err) {
          setLoading(false);
          alert("Failed to send location");
          console.error(err);
        }
      },
      (err) => {
        setLoading(false);
        alert("Unable to get location: " + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <button onClick={handleUpdate} disabled={loading}>
      {loading ? "Updating..." : "Update My Location"}
    </button>
  );
}
