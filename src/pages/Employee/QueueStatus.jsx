import { getDistanceMeters } from "../../utils/distanceCheck";
import { useState } from "react";

export default function QueueStatus() {
  const [error, setError] = useState("");

  const guindy = { lat: 13.0108, lon: 80.2170 }; // ✅ Geo-fence center
  const allowedRadius = 250; // meters

  async function checkGeoAndBook() {
    setError("");

    if (!navigator.geolocation) {
      setError("Location services not available");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        const distance = getDistanceMeters(
          latitude,
          longitude,
          guindy.lat,
          guindy.lon
        );

        console.log("Distance from Guindy:", distance, "meters");

        if (distance <= allowedRadius) {
          // ✅ Within 250m — allow booking
          alert("✅ Location verified. Booking allowed!");

          // 🔥 call your booking API here
          // await bookCab();
        } else {
          setError(
            "❌ You must be within 250 meters of Guindy Railway Station to book a cab."
          );
        }
      },
      () => setError("Enable GPS to proceed")
    );
  }

  return (
    <div>
      <button onClick={checkGeoAndBook} className="btn-primary">
        Book Cab
      </button>

      {error && (
        <p style={{ marginTop: 12, color: "red", fontWeight: 600 }}>{error}</p>
      )}
    </div>
  );
}
