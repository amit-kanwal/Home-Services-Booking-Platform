import { useNavigate } from "react-router-dom"
import "./logout.css"

function Logout({setToken, setUser}) {
    const navigate = useNavigate()

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
        navigate('/')
    }
  return (
    <div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  )
}

export default Logout