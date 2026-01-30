import './Home.css'
import SearchIcon from '@mui/icons-material/Search';

function Home() {
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
            <h2></h2>
          </div>
          <div className="search">
            <input type="search" name="search" id="search" />
            <SearchIcon className="search-icon" />
          </div>
        </div>

      </section>
    </>
  )
}

export default Home
