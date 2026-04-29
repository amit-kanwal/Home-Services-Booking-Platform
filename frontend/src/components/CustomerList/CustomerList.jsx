import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../Utils/axiosApi'
import UserCard from '../UserCard/UserCard'

function CustomerList() {
  const [customers, setCustomers] = useState([])

  useEffect(()=>{
    api.get('/admin/customerList')
    .then((res)=>{
      console.log(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  return (
    <div>
      <UserCard/>
    </div>
  )
}

export default CustomerList