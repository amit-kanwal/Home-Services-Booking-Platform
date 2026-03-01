import {Link} from 'react-router-dom'
import './Navbar.css'
import logo from '/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react'

function Navbar() {
    const [isOpen, setIsOpen]= useState(false);

    return (
        <>

            <nav>
                    <div className='logoContainer'><img src={logo} alt="logo" />
                    <span className="logo">SERVEASE</span></div>
                <div className="nav-menu" >
                    <ul>
                        <li className="nav-link"><Link to="/">Home</Link></li>
                        <li className="nav-link"><Link to="/Services">Services</Link></li>
                        <li className="nav-link"><Link to="/About">About</Link></li>
                    </ul>
                </div>
                <div className="nav-btn">
                    <Link to='/Login'>
                        <button className="btn" id="logIn">Log In</button>
                    </Link>
                    <Link to="/Signup">
                        <button className="btn" id="signUp">Get Started</button>
                    </Link>
                </div>
                <div className="nav-menu-icon">
                    <button  onClick={() => setIsOpen(true)}>
                        <MenuIcon style={{ color: "rgb(125, 125, 125)", padding: "1px" }}/>
                    </button>
                </div>
            </nav>
            {isOpen && (
        <div className="dropdown">
                <nav>
                    <div className='logoContainer'><img src={logo} alt="logo" />
                    <span className="logo">SERVEASE</span></div>
                <div className="nav-menu-icon-close">
                    <CloseIcon onClick={() => setIsOpen(false)} style={{ color: "rgb(125, 125, 125)", padding: "1px" }}/>
                </div>
            </nav>
                <div className="dropdown-items">
                <Link to="/" className="drop-link" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/Services" className="drop-link" onClick={() => setIsOpen(false)}>Services</Link>
                <Link to="/About" className="drop-link" onClick={() => setIsOpen(false)}>About</Link>
                <Link to='/Login' onClick={() => setIsOpen(false)}>
                    <button className="btn" id="logIn">Log In</button>
                </Link>
                <Link to="/SignUp" onClick={() => setIsOpen(false)}>
                <button className="btn" id="signUp">Get Started</button>
                </Link>
                </div>
                
            </div>
      )}
        </>
    )
}

export default Navbar