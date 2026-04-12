import './Login.css'
import {Link , useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Login() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate()

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
            const data = response.data;
            localStorage.setItem("token" , data.token)
            const user = {
                id : data.id,
                role : data.role
            }
            localStorage.setItem("user", JSON.stringify(user));
            if(data.role === 'customer'){
                navigate('/Customer_dashboard')
            }

            if(data.role == 'service_provider'){
                navigate('/Provider_dashboard')
            }
        } catch(err){
            alert(err.response?.data?.message || "Login failed");
        }
    }

    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
        setUser(JSON.parse(localStorage.getItem('user')))
        if(token){
            if(user?.role === 'customer'){
                navigate('/Customer_dashboard')
            }

            if(user?.role === 'service_provider'){
                navigate('/Provider_dashboard')
            }
        }
    }, [])

  return (
    <div className="login-container" >
        
        <div className="login-form" style={{position: "relative"}}>
            <ArrowBackIcon className="back-btn-home" sx={{fontSize : "2rem"}} onClick={()=> navigate("/")}/>
            <form onSubmit={handleLoginFormSubmit}>
                <h2>Login</h2>
                <div className="form-container" >
                    
                    <div>User Name</div>
                    <input type="text" name="username" id="username" value={loginData.username} onChange={handleLoginFormChange}/>
                    <div>Password</div>
                    <input type="password" name="password" id="password" value={loginData.password} onChange={handleLoginFormChange}/>
                    <button className="login-btn" type="submit">Log In</button>
                    <div className="signup-text"><div className='account-text'>Don't have an <span>account</span> </div><Link to='/Signup'>Sign Up Now</Link></div>
                </div>
            </form>
        </div>
    </div>   
  )
}

export default Login