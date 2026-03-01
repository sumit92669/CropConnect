import { useLanguage } from "../LanguageContext"

function CropDetailModal({ crop, isOpen, onClose, onMakeOffer, darkMode }) {
  const { t } = useLanguage()

  if (!isOpen || !crop) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content modal-detail ${darkMode ? 'modal-dark' : ''}`} 
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-detail-content">
          {/* Crop Image */}
          <div className="modal-detail-image">
            <img 
              src={crop.image || 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg'} 
              alt={crop.name}
            />
            {crop.organic && <span className="organic-badge">🌱 Organic</span>}
          </div>

          {/* Crop Info */}
          <div className="modal-detail-info">
            <h2>{crop.name}</h2>
            
            <div className="detail-farmer">
              <span className="detail-label">👨‍🌾 {t('farmer')}:</span>
              <span className="detail-value">{crop.farmer || t('localFarmer')}</span>
            </div>

            <div className="detail-location">
              <span className="detail-label">📍 {t('location')}:</span>
              <span className="detail-value">{crop.location || t('locationNotSpecified')}</span>
            </div>

            <div className="detail-category">
              <span className="detail-label">📋 {t('category')}:</span>
              <span className="detail-value category-badge">
                {crop.category ? t(crop.category) : t('grains')}
              </span>
            </div>

            {crop.quality && (
              <div className="detail-quality">
                <span className="detail-label">⭐ {t('quality')}:</span>
                <span className="detail-value">{crop.quality}</span>
              </div>
            )}

            <div className="detail-price-section">
              <div className="detail-price">
                <span className="price-label">{t('price')}:</span>
                <span className="price-value">₹{crop.price}</span>
                <span className="price-unit">/{crop.unit || t('quintal')}</span>
              </div>

              <div className="detail-quantity">
                <span className="quantity-label">{t('available')}:</span>
                <span className="quantity-value">{crop.quantity} {crop.unit || t('quintal')}</span>
              </div>
            </div>

            {crop.description && (
              <div className="detail-description">
                <h4>{t('description')}</h4>
                <p>{crop.description}</p>
              </div>
            )}

            {crop.season && (
              <div className="detail-season">
                <span className="season-label">🌦️ {t('season')}:</span>
                <span className="season-value">{crop.season}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="modal-detail-actions">
              <button 
                className="make-offer-btn"
                onClick={() => onMakeOffer(crop)}
              >
                💰 {t('makeOffer')}
              </button>
              <button 
                className="contact-farmer-btn"
                onClick={() => window.open(`tel:${crop.farmerPhone || '1234567890'}`)}
              >
                📞 {t('contactFarmer')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropDetailModal