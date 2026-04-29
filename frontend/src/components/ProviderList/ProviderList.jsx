import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../Utils/axiosApi'
import UserCard from '../UserCard/UserCard'
import "../CustomerList/CustomerList.css"

function ProviderList() {
  const [providers, setProviders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const usersPerPage = 6
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = providers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(providers.length / usersPerPage)

  useEffect(() => {
    api.get('/admin/providerList')
      .then((res) => {
        console.log(res.data)
        setProviders(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  return (
    <div>
      <h3 className="customer-list-heading" style={{ margin: "10px 20px", fontSize: "2rem", fontWeight: "400" }}>
        All Providers
      </h3>

      <div className="admin-users-grid">
        {currentUsers.map((provider, index) => (
          <UserCard key={provider.id || index} user={provider} />
        ))}
      </div>

      {providers.length > usersPerPage && (
        <div className="pagination">
          <button className="page-change-btn" onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button className="page-change-btn" onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default ProviderList