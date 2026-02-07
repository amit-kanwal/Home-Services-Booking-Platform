import SearchIcon from '@mui/icons-material/Search'
import './Searchbar.css'

function Searchbar() {
    
    return (
        <div className="search">
            <SearchIcon style={{display:'none'}}/>
            <input type="search" name="search" id="search" placeholder="Search for Services"/>
            <button><SearchIcon className="search-icon" /></button>
        </div>
    )
}

export default Searchbar


