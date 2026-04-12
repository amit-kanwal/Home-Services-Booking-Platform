import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import HandymanIcon from "@mui/icons-material/Handyman";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import GrassIcon from "@mui/icons-material/Grass";
import PestControlIcon from "@mui/icons-material/PestControl";
import { useNavigate } from "react-router-dom";
import "./categoryListHorizontal.css";

const icons = {
  cleaning: (
    <CleaningServicesIcon
      id="cleaning"
      className="service-icon"
      sx={{ height: 20, width: 20 }}
    />
  ),
  construction: (
    <HandymanIcon
      id="repair"
      className="service-icon"
      sx={{ height: 20, width: 20 }}
    />
  ),
  plumbing: (
    <PlumbingIcon
      id="plumbing"
      className="service-icon"
      sx={{ height: 20, width: 20 }}
    />
  ),
  local_shipping: (
    <LocalShippingIcon
      id="shipping"
      className="service-icon"
      sx={{ height: 20, width: 20 }}
    />
  ),
  format_paint: (
    <FormatPaintIcon
      id="paint"
      className="service-icon"
      sx={{ height: 20, width: 20 }}
    />
  ),
  electrical_services: (
    <ElectricBoltIcon
      id="electric"
      className="service-icon"
      sx={{ height: 20, width: 20 }}
    />
  ),
  gardening: (
    <GrassIcon
      id="gardening"
      className="service-icon"
      sx={{ height: 20, width: 20 }}
    />
  ),
  pest_control: (
    <PestControlIcon
      id="pestControl"
      className="service-icon"
      sx={{ height: 20, width: 20 }}
    />
  ),
};

function CategoryListVertical({ categoryList, setCategory, currentCategory }) {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    setCategory(name);
  };

  return (
    <>
      <div className="all-cat-login">
        <h2 className="all-cat-heading">Categories</h2>
        <div className="login-category-icon-horizontal">
          {categoryList.map((category, index) => (
            <div key={index}>
              <div
                className={`login-icon-container ${
                  currentCategory === category.name ? "active-category" : ""
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <span
                  className="login-category-icon-container"
                  style={{ color: category.color }}
                >
                  {icons[category.icon]}
                </span>

                <p className="login-category-name">
                  {category.name.trim() === "PestControl"
                    ? "Pest Control"
                    : category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryListVertical;
