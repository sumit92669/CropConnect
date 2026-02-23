import { useState } from "react"

function FarmerOffers({ darkMode }) {
  const [offers, setOffers] = useState([
    {
      id: 1,
      cropName: "Wheat",
      buyerName: "NGO: Akshay Patra",
      offeredPrice: 2100,
      listedPrice: 2200,
      quantity: 200,
      unit: "quintal",
      status: "pending",
      date: "2024-01-15",
      message: "Need for mid-day meal scheme. Can pick up immediately."
    },
    {
      id: 2,
      cropName: "Rice",
      buyerName: "Delhi University Hostel",
      offeredPrice: 3000,
      listedPrice: 3100,
      quantity: 500,
      unit: "quintal",
      status: "pending",
      date: "2024-01-14",
      message: "Regular requirement for hostel mess."
    }
  ])

  const handleAccept = (offerId) => {
    setOffers(offers.map(o => 
      o.id === offerId ? {...o, status: 'accepted'} : o
    ))
    alert("Offer accepted! Buyer will be notified.")
  }

  const handleReject = (offerId) => {
    setOffers(offers.map(o => 
      o.id === offerId ? {...o, status: 'rejected'} : o
    ))
    alert("Offer rejected.")
  }

  const handleCounter = (offerId) => {
    const newPrice = prompt("Enter your counter price:")
    if (newPrice) {
      setOffers(offers.map(o => 
        o.id === offerId ? {...o, status: 'countered', counterPrice: parseInt(newPrice)} : o
      ))
      alert(`Counter offer of ₹${newPrice} sent!`)
    }
  }

  return (
    <div className="farmer-offers">
      <div className="offers-header">
        <h1>💰 Offers Received</h1>
        <p>Review and respond to buyer offers</p>
      </div>

      <div className="offers-stats">
        <div className="stat-card">
          <span className="stat-value">{offers.length}</span>
          <span className="stat-label">Total Offers</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{offers.filter(o => o.status === 'pending').length}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{offers.filter(o => o.status === 'accepted').length}</span>
          <span className="stat-label">Accepted</span>
        </div>
      </div>

      <div className="offers-list">
        {offers.length === 0 ? (
          <div className="no-offers">
            <span className="no-offers-icon">💰</span>
            <h3>No offers yet</h3>
            <p>When buyers make offers, they'll appear here</p>
          </div>
        ) : (
          offers.map(offer => (
            <div key={offer.id} className={`offer-card ${offer.status}`}>
              <div className="offer-header">
                <div>
                  <h3>{offer.cropName}</h3>
                  <p className="buyer-name">{offer.buyerName}</p>
                </div>
                <span className={`status-badge ${offer.status}`}>
                  {offer.status}
                </span>
              </div>

              <div className="offer-details">
                <div className="detail-row">
                  <span>Offered Price:</span>
                  <strong className="offered-price">₹{offer.offeredPrice}</strong>
                  <span className="listed-price">(Listed: ₹{offer.listedPrice})</span>
                </div>
                <div className="detail-row">
                  <span>Quantity:</span>
                  <strong>{offer.quantity} {offer.unit}</strong>
                </div>
                <div className="detail-row">
                  <span>Date:</span>
                  <span>{offer.date}</span>
                </div>
                {offer.message && (
                  <div className="offer-message">
                    <span>Message:</span>
                    <p>"{offer.message}"</p>
                  </div>
                )}
              </div>

              {offer.status === 'pending' && (
                <div className="offer-actions">
                  <button 
                    className="accept-btn"
                    onClick={() => handleAccept(offer.id)}
                  >
                    ✓ Accept
                  </button>
                  <button 
                    className="counter-btn"
                    onClick={() => handleCounter(offer.id)}
                  >
                    ↺ Counter
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => handleReject(offer.id)}
                  >
                    ✕ Reject
                  </button>
                </div>
              )}

              {offer.status === 'countered' && (
                <div className="counter-info">
                  <p>Your counter offer: <strong>₹{offer.counterPrice}</strong></p>
                  <p className="waiting-text">Waiting for buyer response...</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default FarmerOffers