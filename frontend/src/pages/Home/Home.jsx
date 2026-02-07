import './Home.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Searchbar from '../../components/Searchbar/SearchBar'
import CategoryList from '../../components/CategoryList/CategoryList'

function Home() {
  const [categories, setCategories] = useState([])

    useEffect(()=>{
        axios.get('/api/categories')
        .then(res => setCategories(res.data))
        .catch(err => console.log("error"))

        console.log(categories)
    }, [])

  return (
    <>
      <section className="hero-section">
        <div className="hero-section-container">
          <div className="hero">
            <h2 className="headline"><div>
              Trusted <span className="blue">Home Services</span> At
            </div>
              <div><span>Your Fingertips</span></div></h2>
            <h2 className="subheadline">Find best Home Service/Repairs near you <br /> <span>Near You</span></h2>
          </div>
            <Searchbar/> 
        </div>
      </section>
      <CategoryList categoryList={categories}/>
    </>
  )
}

export default Home
