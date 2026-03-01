import { Link } from "react-router-dom";
import logo from '/logo2.png'
import './Footer.css'

function Footer() {
  return (
    <div className="footer">
      
      <div className="footer-container">
        <Link to='/' className="logo-link">
        <div className="logo-container footer-child">
          
          <img src={logo} alt="logo" />
          <span className="logo">SERVEASE</span>
           
        </div>
        </Link>
        
        <div className="services-section footer-child">
          <span><h2>Our Services</h2></span>          
          <span>Cleaning</span>          
          <span>Repairs</span>          
          <span>Plumbing</span>                    
          <span >
            <select name="footer-services" className="select-option" id="footer-services">
              <option value="shifting">Shifting</option>
              <option value="painting">Painting</option>
              <option value="electrical">Electrical</option>
              <option value="gardening">Gardening</option>
              <option value="carwash">Carwash</option>
            </select>  
          </span>                     
        </div>
        <div className="footer-links footer-child">
          <span><h2>Quick Links</h2></span>          
          <span><Link to='/' className="quick-link">Home</Link></span>           
          <span><Link to='/services' className="quick-link">Services</Link></span>           
          <span><Link to='/about' className="quick-link">About</Link></span>           
        </div>
        <div className="footer-contact footer-child">
          <span><h2>Support</h2></span>          
          <span>Contact Us</span>          
          <span>support@servease.com</span>          
          <span>+918218788163</span>          
        </div>
      </div>
      <div className="copy-right">&copy; 2026 Servease. All rights reserved.</div>
    </div>
  );
}

export default Footer;
