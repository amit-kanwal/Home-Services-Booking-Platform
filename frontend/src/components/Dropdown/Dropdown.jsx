import { useState, useRef, useEffect } from "react";
import "./Dropdown.css"

function Dropdown({ value, onChange , admin}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  let options
  if(admin){
    options = [
    { label: "My Profile", value: "profile" },
    { label: "Flagged Bookings", value: "flaggedBookings" },
    { label: "Customer List", value: "customer" },
    { label: "Provider List", value: "provider" },
  ];
  }
  else{
    options = [
    { label: "My Profile", value: "profile" },
    { label: "Editable", value: "editable" },
    { label: "Change Image", value: "image" },
    { label: "Change Password", value: "password" },
  ];
  }  

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "Select";

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className="dropdown-selected"
        onClick={() => setOpen(!open)}
      >
        <span>{selectedLabel}</span>
        <span className={`arrow ${open ? "rotate" : ""}`}>▼</span>
      </div>

      {open && (
        <div className="dropdown-options">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="dropdown-option"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;