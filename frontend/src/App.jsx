import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Services from './pages/Services/Services'

function App() {

  return (
    <>  
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Services" element={ <Services/>}/>
    </Routes>
    </>
  )
}

export default App
