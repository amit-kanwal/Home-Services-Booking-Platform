import '../Navbar/Navbar.css'
import './NavLogin.css'
import logo from '/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function NavLogin() {
    const navigate = useNavigate();

    const handleAccIconOnclick = ()=>{
        navigate('/Customer_dashboard')
    }

    const handleBookingclick = ()=>{
        navigate('/CustomerBookings')
    }

  return (
    <>
      <nav>
        <div className="logoContainer">
          <img src={logo} alt="logo" />
          <span className="logo">SERVEASE</span>
        </div>
        <div className="nav-login">
            <ul className='nav-login-container'>
            <li className="nav-login-item">
              <span onClick={handleBookingclick}>My Bookings</span>
            </li>
            <li className="nav-login-item">
              <AccountCircleIcon className='acc-circle' sx={{ fontSize: 40 }} onClick={handleAccIconOnclick}/>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavLogin