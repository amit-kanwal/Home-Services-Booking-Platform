import "../Navbar/Navbar.css";
import "./NavLogin.css";
import logo from "/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function NavLogin() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDisplay, setDisplay] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user.id;

  const handleAccIconOnclick = () => {
    navigate("/CustomerProfile");
  };

  const handleBookingclick = () => {
    navigate(`/CustomerBookings/${userId}`);
  };

  const handleDashboardOnclick = ()=>{
    navigate("/Customer_Dashboard")
  }

  useEffect(() => {
    if (isDisplay) {
      const timeoutId = setTimeout(() => {
        setDisplay(false);
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [isDisplay]);

  return (
    <>
      <nav className="nav-login-bar">
        <div className="logoContainer">
          <img src={logo} alt="logo" />
          <span className="logo">SERVEASE</span>
        </div>
        <div className="nav-login">
          <ul className="nav-login-container">
            <li className="nav-login-item">
              <span onClick={handleDashboardOnclick}>My Dashboard</span>
            </li>
            <li className="nav-login-item">
              <span onClick={handleBookingclick}>My Bookings</span>
            </li>
            <li className="nav-login-item">
              <AccountCircleIcon
                className="acc-circle"
                sx={{ fontSize: 40 }}
                onClick={handleAccIconOnclick}
              />
            </li>
          </ul>
        </div>
        <div className="nav-menu-icon-login">
          <button onClick={() => setIsOpen(true)}>
            <MenuIcon style={{ color: "rgb(125, 125, 125)", padding: "1px" }} />
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="dropdown-login">
          <nav>
            <div className="logoContainer">
              <img src={logo} alt="logo" />
              <span className="logo">SERVEASE</span>
            </div>
            <div className="nav-menu-icon-close">
              <CloseIcon
                onClick={() => setIsOpen(false)}
                style={{ color: "rgb(125, 125, 125)", padding: "1px" }}
              />
            </div>
          </nav>
          <div className="dropdown-items">
            <li className="nav-login-item-dropdown">
              <span
                onClick={() => {
                  setIsOpen(false);
                  handleDashboardOnclick();
                }}
              >
                My Dashboard
              </span>
            </li>
            <li className="nav-login-item-dropdown">
              <span
                onClick={() => {
                  setIsOpen(false);
                  handleBookingclick(); 
                }}
              >
                My Bookings
              </span>
            </li>
            <li className="nav-login-item-dropdown">
              <span
                onClick={() => {
                  handleAccIconOnclick();
                  setIsOpen(false);
                }}
              >
                My Profile
              </span>
            </li>
            
          </div>
        </div>
      )}
    </>
  );
}

export default NavLogin;
