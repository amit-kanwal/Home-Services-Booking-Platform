import './Login.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'

function Login() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
  return (
    <div className="login-container">
        <div className="login-form">
            <form action="/login" method="post">
                <h2>Login</h2>
                <div className="form-container">
                    <div>User Name</div>
                    <input type="text" name="username" id="username"/>
                    <div>Password</div>
                    <input type="password" name="password" value={password} onchange={()=>{e}}/>
                    <button className="login-btn" type="submit">Log In</button>
                    <div className="signup-text">Don't have a account <br /><Link to='/Signup'>Sign Up Now</Link></div>
                </div>
            </form>
        </div>
    </div>   
  )
}

export default Login