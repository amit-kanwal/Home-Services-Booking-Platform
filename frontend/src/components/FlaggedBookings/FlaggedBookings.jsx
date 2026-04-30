import React, { useEffect, useState } from "react";
import api from "../../Utils/axiosApi";
import "./FlaggedBookings.css";

import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Wrench,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

function FlaggedBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchFlaggedBookings();
    
  }, []);

  const fetchFlaggedBookings = async () => {
    try {
      const res = await api.get("/admin/flaggedBookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching flagged bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const result = await api.put(`/bookings/${id}/status`, { status });
      setBookings(result.data);
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  if (loading) return <div className="flagged-loading">Loading...</div>;



  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  return (
    <div className="flagged-container">
      <h2 className="flagged-title">
        <span><AlertTriangle size={20} color="red" /> Flagged Bookings</span>
        <span className="seven-plus">( 7+ Days Active )</span>
      </h2>

      {bookings.length === 0 ? (
        <p className="no-data">No flagged bookings</p>
      ) : (
        <>
          <div className="flagged-grid">
            {bookings.map((b) => (
              <div key={b.id} className="flagged-card">

                <div className="flagged-section">
                  <h4><Calendar size={16} style={{ color: "#3b82f6" }} /> Booking Info</h4>
                  <p><Calendar size={14} style={{ color: "#4b5563" }} /> {new Date(b.booking_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit"
                  }).replace(/\//g, "-")}
                  </p>
                  <p><Clock size={14} style={{ color: "#4b5563" }} /> {b.booking_time}</p>
                </div>

                <div className="flagged-section">
                  <h4><User size={16} style={{ color: "purple" }} /> Customer</h4>
                  <p><User size={14} style={{ color: "#4b5563" }} /> {b.customer_name}</p>
                  <p><Phone size={14} style={{ color: "#4b5563" }} /> {b.customer_contact}</p>
                  <p><Mail size={14} style={{ color: "#4b5563" }} /> {b.customer_email}</p>
                </div>

                <div className="flagged-section">
                  <h4><Wrench size={16} style={{ color: "blue" }} /> Provider</h4>
                  <p><User size={14} style={{ color: "#4b5563" }} /> {b.provider_name}</p>
                  <p><Phone size={14} style={{ color: "#4b5563" }} /> {b.provider_contact}</p>
                </div>

                <div className="flagged-actions">
                  <button
                    className="cancel-btn-flagged"
                    onClick={() => updateStatus(b.id, "cancelled")}
                  >
                    <XCircle size={16} /> Cancel
                  </button>

                  <button
                    className="complete-btn-flagged"
                    onClick={() => updateStatus(b.id, "completed")}
                  >
                    <CheckCircle size={16} /> Completed
                  </button>


                </div>

              </div>
            ))}
          </div>
          {bookings.length > 6 && (
            <div className="pagination" style={{margin : "20px auto"}}>
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="page-change-btn"
              >
                Prev
              </button>

              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className="page-change-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FlaggedBookings;