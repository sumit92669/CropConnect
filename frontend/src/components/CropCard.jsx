function CropCard({ crop, onViewDetails, darkMode }) {
  return (
    <div className={`crop-card ${darkMode ? 'crop-card-dark' : ''}`}>
      <div className="crop-image">
        <img 
          src={crop.image || 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=400'} 
          alt={crop.name}
        />
        {crop.quantity && (
          <span className="crop-badge">{crop.quantity} {crop.unit}</span>
        )}
      </div>
      
      <div className="crop-info">
        <h3>{crop.name}</h3>
        <p className="crop-farmer">👨‍🌾 {crop.farmer || 'Local Farmer'}</p>
        <p className="crop-location">📍 {crop.location || 'Location not specified'}</p>
        
        <div className="crop-price-section">
          <span className="crop-price">₹{crop.price}</span>
          <span className="crop-unit">/{crop.unit || 'quintal'}</span>
        </div>
        
        <button 
          className="view-details-btn"
          onClick={() => onViewDetails(crop)}
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default CropCard  // ✅ THIS LINE IS MUST