import { useAuth } from "../context/AuthContext";
import { updateLocation } from "../api/driverApi";

export default function LocationButton() {
  const { token } = useAuth();

  async function sendLocation() {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      await updateLocation(token, {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      alert("Location sent ✅");
    });
  }

  return (
    <button onClick={sendLocation} className="p-2 bg-blue-600 text-white rounded">
      Send Location 📍
    </button>
  );
}
