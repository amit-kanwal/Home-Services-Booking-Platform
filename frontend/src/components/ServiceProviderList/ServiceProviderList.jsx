import './ServiceProvider.css'
import {Link} from "react-router-dom"
import { forwardRef } from 'react'

const ServiceProviderList = forwardRef(({providerInfo, currentCategory}, ref)=> {
  return (
    <div className='popular-services' ref={ref}>
        <h2 className="popular-services-heading">
            {currentCategory} Services
        </h2>
            <div className="provider-info">
            {console.log(providerInfo)}
            {providerInfo.map((provider, index)=>(
                <div className='provider-card' key= {index}>
                <img  src={provider.image_url} alt="ProviderImage" onError={(e) => {
    e.target.src = "/No_Image_Available.jpg";
  }}></img>
                <div className="provider-card-details">
                    <div className="tag-price">
                    <div className="service-tag">{provider.category}</div>
                <div className="price">&#8377;{provider.price}/hour </div>
                </div>
                <div className="business-name"><h3>
                    {provider.business_name}
                    </h3></div>
                <div className="provider-name" style={{color:"blue"}}>{provider.name}</div>
                <div className="address">{provider.address}</div>
                <Link to="/Login" className='book-btn'>Book Now</Link>
                </div>
                </div>
            ))}
        </div>       
    </div>
  )
}
)

export default ServiceProviderList