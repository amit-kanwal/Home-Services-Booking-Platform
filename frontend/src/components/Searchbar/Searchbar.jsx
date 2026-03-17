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
    navigate(`/SerchResult/${searchValue}`)
  }

  return (
    <div className="search">
      <SearchIcon style={{ display: "none" }} />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search services by Category"
        value={searchValue}
        onChange={handleSearchOnchange}
      />
      <button onClick={handleSearch}>
        <SearchIcon className="search-icon" />
      </button>
    </div>
  );
}

export default Searchbar;
