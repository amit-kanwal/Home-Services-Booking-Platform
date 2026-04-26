import React, { useState, useRef, useEffect } from "react";
import "./Editable.css";
import api from "../../Utils/axiosApi.js";

const Editable = ({ provider, userId }) => {
  const [editingField, setEditingField] = useState(null);
  const inputRef = useRef(null);
  const [isEdit, changeEdit] = useState(false);
  const textRef = useRef(null);
  const [descHeight, setDescHeight] = useState("auto");
  const [descWidth, setDescWidth] = useState("auto");
  const [emailErr, setEmailErr] = useState("")
  const [phoneErr, setPhoneErr] = useState("")
  const [phoneErrVisibility, setPhoneErrVisibility] = useState("hidden")
  const [emailErrVisibility, setEmailErrVisibility] = useState("hidden")

  const [formData, setFormData] = useState({
    email: provider.email,
    contact: provider.phone,
    about: provider.about,
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
    if (field === "about" && textRef.current) {
      setDescHeight(textRef.current.offsetHeight + "px");
      setDescWidth(textRef.current.offsetWidth + "px");
    }
    setEditingField(field);
  };

  const fieldMap = {
    email: "email",
    contact: "contact",
    about: "about",
    price: "price",
  };

  const handleSave = async () => {
    try {
      const updatedValue = formData[editingField];

      if (!updatedValue) {
        alert("Field cannot be empty");
        return;
      }

      const dbField = fieldMap[editingField];

      await api.put(`/provider/update/${userId}`, {
        field: dbField,
        value: updatedValue,
      });

      changeEdit(false);
      setEditingField(null);
    } catch (err) {
      let field;

      if (err.response && err.response.data) {
        field = err.response.data.field;
      }

      if (field === "email") {
        setEmailErr("Email already exists") 
        setEmailErrVisibility("visible")
      }
      else if (field === "contact") {
        setPhoneErr("Phone number already exists")
        setPhoneErrVisibility("visible")
      }
      else{
        alert("Something went wrong")
      }
      changeEdit(false);
      setEditingField(null);
      console.log("Update failed: ", err);
    }
  };

  const handleCancel = () => {
    setFormData({
      email: provider.email,
      contact: provider.phone,
      about: provider.about,
      price: provider.price,
    });
    changeEdit(false);
    setEditingField(null);
  };

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setPhoneErrVisibility("hidden")
      setEmailErrVisibility("hidden")
      setPhoneErr("")
      setEmailErr("")
    }, 4000)

    return ()=> clearTimeout(timer)
  }, [phoneErr , emailErr])

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
            <div className="provider-change-btn">
              <button onClick={handleSave} className="provider-save-btn">
                Update
              </button>
              <button onClick={handleCancel} className="provider-cancel-btn">
                Cancel
              </button>
            </div>
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
            <div style={{color : "red" , visibility : `${emailErrVisibility}`}}>{emailErr}</div>
          </>
        )}
      </div>

      <div className="editable-field">
        <label className="editable-label">Phone</label>
        {editingField === "contact" ? (
          <>
            <input
              ref={inputRef}
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              type="tel"
              minLength={10}
              maxLength={10}
              pattern="\d{10}"
              className="editable-phone-input change-input"
            />
            <div className="provider-change-btn">
              <button onClick={handleSave} className="provider-save-btn">
                Update
              </button>
              <button onClick={handleCancel} className="provider-cancel-btn">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="phone-data-change">{formData.contact}</p>
            <button
              onClick={() => handleEdit("contact")}
              disabled={isEdit}
              className="provider-detail-edit-btn"
            >
              Edit
            </button>
            <div style={{color : "red" , visibility : `${phoneErrVisibility}`}}>{phoneErr}</div>
          </>
        )}
      </div>

      <div className="editable-field">
        <label className="editable-label">Description</label>
        {editingField === "about" ? (
          <>
            <textarea
              ref={inputRef}
              name="about"
              value={formData.about}
              onChange={handleChange}
              style={{
                height: descHeight,
                width: descWidth,
                padding: "10px",
                fontFamily: "system-ui",
                fontSize: "14px",
              }}
              className="change-input"
            />
            <div className="provider-change-btn">
              <button onClick={handleSave} className="provider-save-btn">
                Update
              </button>
              <button onClick={handleCancel} className="provider-cancel-btn">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p
              ref={textRef}
              className="editable-description-text"
              style={{ width: "90%" }}
            >
              {formData.about}
            </p>
            <button
              onClick={() => handleEdit("about")}
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
              style={{ width: "80px", height: "30px" }}
              min="1"
            />
            <div className="provider-change-btn">
              <button onClick={handleSave} className="provider-save-btn">
                Update
              </button>
              <button onClick={handleCancel} className="provider-cancel-btn">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p style={{ height: "30px" }}>
              &#8377;{formData.price}/hour
            </p>
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