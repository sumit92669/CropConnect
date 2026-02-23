import { useState } from "react"

function OfferModal({ crop, isOpen, onClose, onSubmitOffer, darkMode }) {
  const [offerData, setOfferData] = useState({
    price: crop?.price || '',
    quantity: crop?.quantity || 1,
    message: ''
  })

  if (!isOpen || !crop) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setOfferData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!offerData.price || !offerData.quantity) {
      alert("Please fill all required fields!")
      return
    }

    onSubmitOffer({
      cropId: crop.id,
      cropName: crop.name,
      offeredPrice: parseInt(offerData.price),
      quantity: parseInt(offerData.quantity),
      message: offerData.message,
      status: 'pending',
      date: new Date().toISOString()
    })

    setOfferData({
      price: crop.price,
      quantity: 1,
      message: ''
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content offer-modal ${darkMode ? 'modal-dark' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>💰 Make an Offer</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="offer-crop-summary">
          <img src={crop.image} alt={crop.name} />
          <div>
            <h3>{crop.name}</h3>
            <p>Listed Price: <strong>₹{crop.price}</strong> / {crop.unit}</p>
            <p>Farmer: {crop.farmer}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="offer-form">
          <div className="form-row">
            <div className="form-group">
              <label>Your Offer (₹) <span className="required">*</span></label>
              <input
                type="number"
                name="price"
                value={offerData.price}
                onChange={handleChange}
                min="1"
                max={crop.price * 1.5}
                required
                className={darkMode ? 'input-dark' : ''}
              />
              <small>Listed price: ₹{crop.price}</small>
            </div>

            <div className="form-group">
              <label>Quantity ({crop.unit}) <span className="required">*</span></label>
              <input
                type="number"
                name="quantity"
                value={offerData.quantity}
                onChange={handleChange}
                min="1"
                max={crop.quantity || 100}
                required
                className={darkMode ? 'input-dark' : ''}
              />
              <small>Available: {crop.quantity || 'Not specified'}</small>
            </div>
          </div>

          <div className="form-group">
            <label>Message (Optional)</label>
            <textarea
              name="message"
              value={offerData.message}
              onChange={handleChange}
              placeholder="Add a note to the farmer..."
              rows="3"
              className={darkMode ? 'input-dark' : ''}
            />
          </div>

          <div className="offer-summary">
            <h4>Offer Summary</h4>
            <div className="summary-row">
              <span>Total Value:</span>
              <span className="total-value">₹{offerData.price * offerData.quantity}</span>
            </div>
            <div className="summary-row">
              <span>Price per {crop.unit}:</span>
              <span>₹{offerData.price}</span>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-offer-btn">
              Submit Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OfferModal