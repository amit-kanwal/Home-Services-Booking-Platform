import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Services from './pages/Services/Services'
import About from './pages/About/About'
import Login from './pages/Login/Login'

function App() {

  return (
    <>  
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Services" element={ <Services/>}/>
      <Route path="/About" element={ <About/>}/>
      <Route path="/Login" element={ <Login/>}/>
    </Routes>
    </>
  )
}

export default App
