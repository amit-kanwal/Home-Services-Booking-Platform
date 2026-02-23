import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import HandymanIcon from "@mui/icons-material/Handyman";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import GrassIcon from '@mui/icons-material/Grass';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import "./CategoryList.css";

const icons = {
  cleaning: (
    <CleaningServicesIcon
      id="cleaning"
      className="service-icon"
      sx={{ height: 40, width: 40 }}
    />
  ),
  construction: (
    <HandymanIcon
      id="repair"
      className="service-icon"
      sx={{ height: 40, width: 40 }}
    />
  ),
  plumbing: (
    <PlumbingIcon
      id="plumbing"
      className="service-icon"
      sx={{ height: 40, width: 40 }}
    />
  ),
  local_shipping: (
    <LocalShippingIcon
      id="shipping"
      className="service-icon"
      sx={{ height: 40, width: 40 }}
    />
  ),
  format_paint: (
    <FormatPaintIcon
      id="paint"
      className="service-icon"
      sx={{ height: 40, width: 40 }}
    />
  ),
  electrical_services: (
    <ElectricBoltIcon
      id="electric"
      className="service-icon"
      sx={{ height: 40, width: 40 }}
    />
  ),
  gardening: (
    <GrassIcon
      id="gardening"
      className="service-icon"
      sx={{ height: 40, width: 40 }}
    />
  ),
  carwash: (
    <LocalCarWashIcon
      id="carwash"
      className="service-icon"
      sx={{ height: 40, width: 40 }}
    />
  ),
};

function CategoryList({ categoryList }) {
  return (
    <>
      <div className="all-cat">
        <h2 >All Categories</h2>     
      <div className="icon">
        {categoryList.map((category, index) => (
          <span
            key={index}
            className="material-symbols-outlined icon-container"
          >
            <span style={{ color: category.color }}>
              {icons[category.icon]}
            </span>
            <h2>{category.name}</h2>
          </span>
        ))}
      </div>
      </div>
    </>
  );
}

export default CategoryList;
