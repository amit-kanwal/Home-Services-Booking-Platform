import React, { useState, useRef, useEffect } from "react";
import "./Editable.css";

const Editable = ({ provider }) => {
  const [editingField, setEditingField] = useState(null);
  const inputRef = useRef(null);
  const [isEdit, changeEdit] = useState(false);
  const textRef = useRef(null);
  const [descHeight, setDescHeight] = useState("auto");
  const [descWidth, setDescWidth] = useState("auto");

  const [formData, setFormData] = useState({
    email: provider.email,
    phone: provider.phone,
    description: provider.about,
    price: provider.price,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();

      const type = inputRef.current.type;
      if (type !== "number") {
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }
  }, [editingField]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (field) => {
    changeEdit(true);
    if (field === "description" && textRef.current) {
    setDescHeight(textRef.current.offsetHeight + "px");
    setDescWidth(textRef.current.offsetWidth + "px");
  }
    setEditingField(field);
  };

  const handleSave = () => {
    // TODO: API call here
    changeEdit(false);
    setEditingField(null);
  };

  return (
    <div className="editable-container">
      <h2 className="editable-title">Provider Details</h2>

      <div className="editable-field email-field">
        <label className="editable-label">Email</label>
        {editingField === "email" ? (
          <>
            <input
              ref={inputRef}
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="email-change-input change-input"
            />
            <button onClick={handleSave} className="provider-save-btn">
              Update
            </button>
          </>
        ) : (
          <>
            <p className="email-change-data">{formData.email}</p>
            <button
              onClick={() => handleEdit("email")}
              className="provider-detail-edit-btn"
              disabled={isEdit}
            >
              Edit
            </button>
          </>
        )}
      </div>

      <div className="editable-field">
        <label className="editable-label">Phone</label>
        {editingField === "phone" ? (
          <>
            <input
              ref={inputRef}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              minLength={10}
              maxLength={10}
              pattern="\d{10}"
              className="editable-phone-input change-input"
            />
            <button onClick={handleSave} className="provider-save-btn">
              Save
            </button>
          </>
        ) : (
          <>
            <p className="phone-data-change">{formData.phone}</p>
            <button
              onClick={() => handleEdit("phone")}
              disabled={isEdit}
              className="provider-detail-edit-btn"
            >
              Edit
            </button>
          </>
        )}
      </div>

      <div className="editable-field">
        <label className="editable-label">Description</label>
        {editingField === "description" ? (
          <>
            <textarea
              ref={inputRef}
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ height: descHeight, width: descWidth , padding : "10px" , fontFamily : "system-ui", fontSize : "14px"}}
              className="change-input"
            />
            <button onClick={handleSave} className="provider-save-btn">Save</button>
          </>
        ) : (
          <>
            <p ref={textRef} className="editable-description-text" style={{width : "90%"}}>
              {formData.description}
            </p>
            <button
              onClick={() => handleEdit("description")}
              disabled={isEdit}
              className="provider-detail-edit-btn"
            >
              Edit
            </button>
          </>
        )}
      </div>

      <div className="editable-field">
        <label className="editable-label">Price</label>
        {editingField === "price" ? (
          <>
            <input
              ref={inputRef}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="change-input"
              style={{width : "80px", height : "30px"}}
            />
            <button onClick={handleSave} className="provider-save-btn">
              Save
            </button>
          </>
        ) : (
          <>
            <p style={{height : "30px"}}>&#8377;{formData.price}/hour</p>
            <button
              onClick={() => handleEdit("price")}
              disabled={isEdit}
              className="provider-detail-edit-btn"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Editable;
