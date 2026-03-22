import SearchIcon from "@mui/icons-material/Search";
import "./Searchbar.css";
import { useState} from "react";
import { useNavigate} from "react-router-dom";

function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate()
  const handleSearchOnchange = (e) => {
    setSearchValue(e.target.value)
  };

  const handleSearch = ()=>{
    if(searchValue.length >0){
      navigate(`/SerchResult/${searchValue}`)
    } 
  }

  return (
    <div className="search-container">
      <div className="search">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search by Category"
        value={searchValue}
        onChange={handleSearchOnchange}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-btn-first search-btn">
        <SearchIcon className="search-icon" />
      </button>
    </div>
    <button onClick={handleSearch} className="search-btn-second search-btn">
        <SearchIcon className="search-icon" />
    </button>
    </div>  
  );
}

export default Searchbar;
