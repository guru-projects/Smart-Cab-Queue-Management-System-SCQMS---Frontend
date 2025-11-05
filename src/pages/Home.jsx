import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo.png";

export default function Home() {
  return (
    <div className="home-bg">
      <div className="home-card">
        <img src={logo} alt="SCQMS" className="home-logo" />

        <h2 className="home-title">Smart Cab Queue System</h2>
        <p className="home-sub">
          Fair • Fast • Location Based Cab Allocation
        </p>

        <div className="btn-box">
          <Link to="/employee/login" className="home-btn emp">
            👨‍💼 Employee Login
          </Link>

          <Link to="/driver/login" className="home-btn driver">
            🚕 Driver Login
          </Link>
        </div>

        <p className="admin-link">
          Transport Admin? <a href="/admin/login">Login here</a>
        </p>
      </div>
    </div>
  );
}
