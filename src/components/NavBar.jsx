// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import logo from "../assets/logo.png";
// import "./NavBar.css";
//
// export default function NavBar() {
//   const { user, logout, token } = useAuth();
//
//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         <img src={logo} alt="SCQMS Logo" className="nav-logo" />
//         <span className="nav-title">SCQMS</span>
//
//         {/* Driver Menu */}
//         <Link to="/driver/login">Driver Login</Link>
//         {token && <Link to="/driver/dashboard">Driver Dashboard</Link>}
//
//         {/* Admin Menu */}
//         {token && (
//           <>
//             <Link to="/admin/dashboard">Admin Dashboard</Link>
//             <Link to="/admin/analytics">Analytics</Link>
//             <Link to="/admin/cabs">Cabs</Link>
//           </>
//         )}
//
//         {/* Employee Menu */}
//         <Link to="/employee/login">Employee Login</Link>
//         {token && (
//           <>
//             <Link to="/employee/dashboard">Employee Dashboard</Link>
//             <Link to="/employee/queue">Queue Status</Link>
//             <Link to="/employee/qr">QR Booking</Link>
//             <Link to="/employee/history">Booking History</Link>
//           </>
//         )}
//       </div>
//
//       {/* Right Side */}
//       <div className="nav-right">
//         {token ? (
//           <>
//             <span className="user-text">Hi, {user?.username}</span>
//             <button className="logout-btn" onClick={logout}>Logout</button>
//           </>
//         ) : (
//           <span className="user-text">Not signed in</span>
//         )}
//       </div>
//     </nav>
//   );
// }
