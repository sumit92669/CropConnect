function CropDetailModal({ crop, isOpen, onClose, onMakeOffer, darkMode }) {
  if (!isOpen || !crop) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content crop-detail-modal ${darkMode ? 'modal-dark' : ''}`} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="crop-detail-grid">
          <div className="crop-detail-image">
            <img 
              src={crop.image || 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=400'} 
              alt={crop.name}
            />
          </div>
          
          <div className="crop-detail-info">
            <h2>{crop.name}</h2>
            
            <div className="detail-section">
              <h3>Farmer Information</h3>
              <p><strong>Name:</strong> {crop.farmer || 'Local Farmer'}</p>
              <p><strong>Location:</strong> {crop.location || 'Not specified'}</p>
            </div>

            <div className="detail-section">
              <h3>Crop Details</h3>
              <p><strong>Price:</strong> ₹{crop.price} / {crop.unit || 'quintal'}</p>
              <p><strong>Available Quantity:</strong> {crop.quantity || 'Not specified'} {crop.unit || 'quintal'}</p>
              {crop.quality && <p><strong>Quality:</strong> {crop.quality}</p>}
            </div>

            {crop.description && (
              <div className="detail-section">
                <h3>Description</h3>
                <p>{crop.description}</p>
              </div>
            )}

            <div className="detail-actions">
              <button 
                className="make-offer-btn"
                onClick={() => {
                  onMakeOffer(crop)
                  onClose()
                }}
              >
                Make an Offer
              </button>
              <button className="contact-btn">Contact Farmer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropDetailModal