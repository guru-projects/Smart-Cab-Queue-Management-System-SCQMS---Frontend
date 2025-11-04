import { updateLocation } from "../api/driverApi";

export default function LocationButton() {
  async function sendLocation() {
    if (!("geolocation" in navigator)) {
      alert("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        await updateLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        alert("Location updated ✅");
      },
      () => alert("Could not get your location"),
      { enableHighAccuracy: true }
    );
  }

  return (
    <button onClick={sendLocation}>
      Update Location 📍
    </button>
  );
}
