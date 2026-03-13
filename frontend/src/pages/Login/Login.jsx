import './Login.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import axios from "axios";

function Login() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const handleLoginFormChange = (e) =>{
        setLoginData({
            ...loginData,
            [e.target.name] : e.target.value
        });
    }

    const  handleLoginFormSubmit = async (e)=>{
        e.preventDefault();

        try {
            const response = await axios.post("/api/login", loginData);
            console.log(response);
        } catch(err){
            console.log(err);
        }
    }

  return (
    <div className="login-container">
        <div className="login-form">
            <form onSubmit={handleLoginFormSubmit}>
                <h2>Login</h2>
                <div className="form-container">
                    <div>User Name</div>
                    <input type="text" name="username" id="username" value={loginData.username} onChange={handleLoginFormChange}/>
                    <div>Password</div>
                    <input type="password" name="password" id="password" value={loginData.password} onChange={handleLoginFormChange}/>
                    <button className="login-btn" type="submit">Log In</button>
                    <div className="signup-text">Don't have a account <Link to='/Signup'>Sign Up Now</Link></div>
                </div>
            </form>
        </div>
    </div>   
  )
}

export default Login