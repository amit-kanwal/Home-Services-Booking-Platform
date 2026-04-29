import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../Utils/axiosApi'

function FlaggedBookings() {
  const [flaggedBookings, setFlaggedBookings] = useState(null)

  useEffect(() => {
    api.get('/admin/flaggedBookings')
    .then((res)=>{
      console.log(res)
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])

  return (
    <div></div>
  )
}

export default FlaggedBookings