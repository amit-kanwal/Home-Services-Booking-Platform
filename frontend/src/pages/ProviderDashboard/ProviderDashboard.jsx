import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProviderDashboard() {
  const navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div>ProviderDashboard
      <button onClick={handleLogout}>LogOut</button>
    </div>
    
  )
}

export default ProviderDashboard