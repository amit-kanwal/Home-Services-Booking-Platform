import './Navbar.css'
import logo from '/logo.png'

function Navbar() {
    return (
        <>
            <nav>
                    <div className='logoContainer'><img src={logo} alt="logo" />
                    <span className="logo">SERVEASE</span></div>
                <div className="nav-menu" >
                    <ul>
                        <li className="nav-link"><a href="/" className="home">Home</a></li>
                        <li className="nav-link"><a href="/">Service</a></li>
                        <li className="nav-link"><a href="/">About</a></li>
                    </ul>
                </div>
                <div className="nav-btn">
                    <a href="/">
                        <button className="btn" id="logIn">Log In</button>
                    </a>
                    <a href="/">
                        <button className="btn" id="signUp">Get Started</button>
                    </a>
                </div> 
            </nav>
        </>
    )
}

export default Navbar