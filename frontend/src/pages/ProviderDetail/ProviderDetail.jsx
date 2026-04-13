import { useParams , useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import api from '../../Utils/axiosApi';
import NavLogin from "../../components/NavLogin/NavLogin.jsx"
import BusinessDescription from '../../components/BusinessDescription/BusinessDescription';
import BusinessInfo from "../../components/BusinessInfo/BusinessInfo.jsx"

function ProviderDetail() {
    const {userId} = useParams();
    const [provider, setProvider] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        api.get(`/ProviderDetail/${userId}`)
        .then((res)=>{
          if(res.status === 401){
            navigate("/Login")
          }
            const providerInfo = {
                id : res.data[0].id,
                name : res.data[0].name,
                image : res.data[0].image_url,
                businessName : res.data[0].business_name,
                category : res.data[0].category,
                address : res.data[0].address,
                email : res.data[0].email,
                about: res.data[0].about
            }
            setProvider(providerInfo)
        })
        .catch(() => {
        console.log("Error in userInfo");
      });
    },[userId])
  return (
    <>
    {}
    <NavLogin/>
    <div className='Business-info-container'>
      <BusinessInfo provider={provider}/>
    </div>
    <div className="business-desc-container">
      <BusinessDescription provider={provider}/>
    </div>
    </>
  )
}

export default ProviderDetail