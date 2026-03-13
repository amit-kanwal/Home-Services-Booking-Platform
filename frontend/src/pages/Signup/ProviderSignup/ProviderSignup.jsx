import './ProviderSignup.css'
import GetLocation from '../../../Utils/GetLocation.js'
import { compressImage } from '../../../Utils/CompressImage.js';
import {useState, useEffect} from 'react'
import axios from "axios"
import CloseIcon from "@mui/icons-material/Close";

function ProviderSignup() {
  const [location, setLocation] = useState(null);
  const [locationText, setLocationText] = useState("Get Location")
  const [locationErr, setlocationErr] = useState("");
  const [locationBtnBorder, setLocationBtnBorder] = useState("2px solid rgb(86, 189, 230)")
  const [imgBorder, setImgBorder] = useState("2px solid rgb(86, 189, 230)")
  const [compressedImage, setCompressedImage] = useState(null)
  const [isAlertDisplay, setAlertDisplay] = useState("none")
  const [signupMessage, setSignupMessage] = useState("none")
  const [alertColor, setAlertColor] = useState("")
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    category: "",
    experience: "",
    address: "",
    description: "",
    price: "",
    business_name: ""
  })

  useEffect(()=>{
    if(isAlertDisplay == "flex"){
      const signupAlertTimeout = setTimeout(()=>{
        setAlertDisplay("none")
      }, 4000)

      return ()=> clearTimeout(signupAlertTimeout)
    }
  },[isAlertDisplay == "flex"])

  const handleProviderFormDataChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    }   
    )
  }

  const handleUpload = async (e)=>{
    const file = e.target.files[0];
    if(!file){
      return;
    } 
    
    try{
      const compressed = await compressImage(file);
      setCompressedImage(compressed);
      setImgBorder("2px solid green")
    } catch(err){
      console.error("Compression error:", err);
    }
  }

  const handleLocation = async() =>{
      try{
        const loc = await GetLocation();
        setLocation(loc);
        setLocationText("Location Obtained")
        setLocationBtnBorder("2px solid green")
      } catch(error){
        setlocationErr(error)
        alert("Cannot fetch your location")
      }
  }

  const handleProviderFormSubmit = async (e)=>{
    e.preventDefault()

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("category", formData.category);
    data.append("experience", formData.experience);
    data.append("address", formData.address);
    data.append("description", formData.description);
    data.append("price" , formData.price);
    data.append("business_name" , formData.business_name);

    if(location){
      data.append('location', JSON.stringify(location))
    }

    if(compressedImage){
      data.append("image", compressedImage)
    }

    try{
      const response = await axios.post("/api/providerSignup", data);     
      setFormData({
        fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    category: "",
    experience: "",
    address: "",
    description: "",
    price: "",
    business_name: ""
      })
      data.append('location', null)
      data.append('image', null)
      setCompressedImage(null);
      setImgBorder("2px solid rgb(86, 189, 230)")
      setAlertDisplay("flex");
      setSignupMessage("Signup successful, Log in now")
      setAlertColor("rgb(86, 189, 230)")
      setLocationBtnBorder("2px solid rgb(86, 189, 230)")
      setLocationText("Get Location")
    } catch(err){
      console.log(err)
      setAlertDisplay("flex");
      setSignupMessage(err.message)
      setAlertColor("rgb(245, 137, 137)")
    }
  }

  return (
    <div className='provider-signup-container'>
      <div className="provider-signup-form-container">
        <form onSubmit={handleProviderFormSubmit} className="provider-signup">
          <div className="top-heading">
          <h2 className='provider-signup-heading'>Provider Sign Up</h2>
        <p>Fill in your details to get started.</p>
          </div>
        
        <div className="signup-form-element">
          <label htmlFor="fullname" className='signup-form-label'>Full Name<span style={{color: "red"}}>*</span></label>
          <input type="text" name="fullname" placeholder='Enter full name' id="fullname" value={formData.fullname} required onChange={handleProviderFormDataChange}/>
        </div>
        <div className="signup-form-element">
        <label htmlFor="businessName" className='signup-form-label'>Business Name<span style={{color: "red"}}>*</span></label>
          <input type="text" name="business_name" placeholder='Enter your business name' id="businessname" value={formData.business_name} required onChange={handleProviderFormDataChange}/>
        </div>
        <div className="signup-form-element">
          <label htmlFor="username" className='signup-form-label'>Username<span style={{color: "red"}}>*</span></label>
          <input type="text" name="username" placeholder='Enter username' id="username" value={formData.username} required onChange={handleProviderFormDataChange}/>
        </div>
        <div className="signup-form-element">
          <label htmlFor="password" className='signup-form-label'>Password<span style={{color: "red"}}>*</span></label>
          <input type="password" name="password" placeholder='Enter password' id="passoword" value={formData.password} required onChange={handleProviderFormDataChange}/>
        </div>
        <div className="signup-form-element">
          <label htmlFor="confirmPassword" className='signup-form-label'>Confirm Password<span style={{color: "red"}}>*</span></label>
          <input type="password" name="confirmPassword" placeholder='Confirm password' id="confirmPassoword" value={formData.confirmPassword} required onChange={handleProviderFormDataChange}/>
        </div>
        {formData.confirmPassword && formData.password != formData.confirmPassword &&(
  <p style={{color:"red"}}>Passwords do not match</p>
)}
        <div className="signup-form-element">
          <label htmlFor="email" className='signup-form-label'>Email<span style={{color: "red"}}>*</span></label>
          <input name="email" type="email" placeholder='Enter email' id="email" value={formData.email} required onChange={handleProviderFormDataChange}/>
        </div>
        <div className="signup-form-element">
          <label htmlFor="contact-number" className='signup-form-label'>Phone Number<span style={{color: "red"}}>*</span></label>
          <input type="tel" name="phone" pattern="[0-9]{10}" placeholder='Enter phone number' id="contact-number" value={formData.phone} onChange={handleProviderFormDataChange} required/>
        </div>
        <div className="signup-form-element">
          <label htmlFor="category" className='signup-form-label'>Choose Category<span style={{color: "red"}}>*</span></label>
          <select name="category" id="category" value={formData.category} required onChange={handleProviderFormDataChange}>
            <option value="">Choose Category</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Repair">Repair</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Shifting">Shifting</option>
            <option value="Painting">Painting</option>
            <option value="Electrical">Electrical</option>
            <option value="Gardening">Gardening</option>
            <option value="Carwash">Car Wash</option>
          </select>
        </div>
        <div className="signup-form-element">
          <label htmlFor="experience" className='signup-form-label'>Experience</label>
          <select name="experience" id="experience" value={formData.experience} required onChange={handleProviderFormDataChange}>
            <option value="">Experience in years</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">More than 4</option>
          </select>
        </div>
        <div className="signup-form-element-textarea">
          <label htmlFor="address" name="address" className='signup-form-label' >Address<span style={{color: "red"}}>*</span></label>
          <textarea name="address" id="address" placeholder='Enter address' className="hoverEffect focusEffect" value={formData.address} required onChange={handleProviderFormDataChange}></textarea>
        </div>
        <div className="signup-form-element-textarea">
          <label htmlFor="provider-about" className='signup-form-label'>Description<span style={{color: "red"}}>*</span></label>
          <textarea name="description" id="provider-about"  placeholder='Complete description about your services' className='hoverEffect focusEffect' value={formData.description} required onChange={handleProviderFormDataChange}></textarea>
        </div>
        <div className="signup-form-element">
          <label htmlFor="price" className='signup-form-label'>Service Price<span style={{color: "red"}}>*</span></label>
          <input type="number" name="price" placeholder='Enter according to per hour' id="price" value={formData.price} required onChange={handleProviderFormDataChange}/>
        </div>
        <div className="signup-form-element">
          <div className="location-label">
            <label htmlFor="user-location" className='signup-form-label'>Provide Location</label>
            <p className='location-text'>(Provide location for better visibility)</p>
          </div>
          
          <div className="location-btn-container">
            <button className="location-btn hoverEffect" type="button" onClick={handleLocation} style={{border : locationBtnBorder}}>{locationText}</button>
          </div> 
        </div>
        <div className="signup-form-element">
            <label htmlFor="imgUpload" className='signup-form-label'>Upload Image</label>
            <input type="file" accept="image/png" onChange={handleUpload} style={{border : imgBorder}} className='img-input'/>
          </div>
        <div className="upload-img">
          <button type="submit" className="signup-submit-btn">Submit</button>
        </div>
      </form>
      <div className="alert-signup" style={{display: isAlertDisplay, background: alertColor}}>
        {signupMessage}
        <CloseIcon className="signup-close"/>
      </div>
      </div>
      
    </div>
  )
}

export default ProviderSignup