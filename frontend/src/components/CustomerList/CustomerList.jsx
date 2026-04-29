import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../Utils/axiosApi'
import UserCard from '../UserCard/UserCard'
import "./CustomerList.css"

function CustomerList() {
  const [customers, setCustomers] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = customers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(customers.length / usersPerPage);

  useEffect(()=>{
    api.get('/admin/customerList')
    .then((res)=>{
      setCustomers(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])


  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div>
      <h3 className="customer-list-heading" style={{margin : "10px 20px", fontSize : "2rem", fontWeight : "400"}}>All Customers</h3>
    <div className="admin-users-grid">
      {currentUsers.map((customer, index) => (
        <UserCard key={index} customer={customer} user={customer} />
      ))}
    </div>

    {customers.length > usersPerPage && (
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    )}
  </div>
  )
}

export default CustomerList