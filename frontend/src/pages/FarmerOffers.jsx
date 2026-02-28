import { useState } from "react"
import { useLanguage } from "../LanguageContext"

function FarmerOffers({ darkMode }) {
  const { t } = useLanguage()
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
    alert(t('offerAccepted'))
  }

  const handleReject = (offerId) => {
    setOffers(offers.map(o => 
      o.id === offerId ? {...o, status: 'rejected'} : o
    ))
    alert(t('offerRejected'))
  }

  const handleCounter = (offerId) => {
    const newPrice = prompt(t('enterCounterPrice'))
    if (newPrice) {
      setOffers(offers.map(o => 
        o.id === offerId ? {...o, status: 'countered', counterPrice: parseInt(newPrice)} : o
      ))
      alert(t('counterSent', { price: newPrice }))
    }
  }

  return (
    <div className="farmer-offers">
      <div className="offers-header">
        <h1>💰 {t('offersReceived')}</h1>
        <p>{t('reviewOffers')}</p>
      </div>

      <div className="offers-stats">
        <div className="stat-card">
          <span className="stat-value">{offers.length}</span>
          <span className="stat-label">{t('totalOffers')}</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{offers.filter(o => o.status === 'pending').length}</span>
          <span className="stat-label">{t('pending')}</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{offers.filter(o => o.status === 'accepted').length}</span>
          <span className="stat-label">{t('accepted')}</span>
        </div>
      </div>

      <div className="offers-list">
        {offers.length === 0 ? (
          <div className="no-offers">
            <span className="no-offers-icon">💰</span>
            <h3>{t('noOffersYet')}</h3>
            <p>{t('noOffersMessage')}</p>
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
                  {t(offer.status)}
                </span>
              </div>

              <div className="offer-details">
                <div className="detail-row">
                  <span>{t('offeredPrice')}:</span>
                  <strong className="offered-price">₹{offer.offeredPrice}</strong>
                  <span className="listed-price">({t('listed')}: ₹{offer.listedPrice})</span>
                </div>
                <div className="detail-row">
                  <span>{t('quantity')}:</span>
                  <strong>{offer.quantity} {offer.unit}</strong>
                </div>
                <div className="detail-row">
                  <span>{t('date')}:</span>
                  <span>{offer.date}</span>
                </div>
                {offer.message && (
                  <div className="offer-message">
                    <span>{t('message')}:</span>
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
                    ✓ {t('accept')}
                  </button>
                  <button 
                    className="counter-btn"
                    onClick={() => handleCounter(offer.id)}
                  >
                    ↺ {t('counter')}
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => handleReject(offer.id)}
                  >
                    ✕ {t('reject')}
                  </button>
                </div>
              )}

              {offer.status === 'countered' && (
                <div className="counter-info">
                  <p>{t('yourCounter')}: <strong>₹{offer.counterPrice}</strong></p>
                  <p className="waiting-text">{t('waitingForBuyer')}</p>
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