import "../Navbar/Navbar.css";
import "../NavLogin/NavLogin.css";
import logo from "/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ProviderNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDisplay, setDisplay] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user.id;

  const handleAccIconOnclick = () => {
    navigate("/Provider_dashboard");
  };

  const handleBookingclick = () => {
    navigate(`/ProviderBookings/${userId}`);
  };


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
      <nav>
        <div className="logoContainer">
          <img src={logo} alt="logo" />
          <span className="logo">SERVEASE</span>
        </div>
        <div className="nav-login">
          <ul className="nav-login-container">
            <li className="nav-login-item">
              <span onClick={handleBookingclick}>Manage Bookings</span>
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
                Manage Bookings
              </span>
            </li>  
          </div>
        </div>
      )}
    </>
  );
}

export default ProviderNav;
