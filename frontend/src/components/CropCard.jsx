import { useLanguage } from "../LanguageContext"

function CropCard({ crop, onViewDetails, darkMode }) {
  const { t } = useLanguage()
<<<<<<< HEAD
=======
  const [showDetailsPopup, setShowDetailsPopup] = useState(false)
  const [showOfferPopup, setShowOfferPopup] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [offerData, setOfferData] = useState({
    offeredPrice: crop?.price || '',
    quantity: crop?.quantity ? Math.min(100, crop.quantity) : 100,
    message: ''
  })
  
  const cardRef = useRef(null)
  const detailsPopupRef = useRef(null)
  const offerPopupRef = useRef(null)

  // Get rating for this crop
  const rating = cropRatings[crop.name] || 4.5
  const reviews = reviewCounts[crop.name] || 120

  // Format price in Indian format
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price)
  }

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close details popup if clicked outside
      if (detailsPopupRef.current && !detailsPopupRef.current.contains(event.target) &&
          cardRef.current && !cardRef.current.contains(event.target)) {
        setShowDetailsPopup(false)
      }
      
      // Close offer popup if clicked outside
      if (offerPopupRef.current && !offerPopupRef.current.contains(event.target) &&
          cardRef.current && !cardRef.current.contains(event.target)) {
        setShowOfferPopup(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Toggle details popup when card is clicked
  const handleCardClick = (e) => {
    e.stopPropagation()
    // Close offer popup if open, toggle details popup
    setShowOfferPopup(false)
    setShowDetailsPopup(!showDetailsPopup)
  }

  // Handle make offer button in details popup
  const handleMakeOfferClick = (e) => {
    e.stopPropagation()
    setShowDetailsPopup(false)
    setShowOfferPopup(true)
    // Reset offer data with current crop values
    setOfferData({
      offeredPrice: crop.price,
      quantity: Math.min(100, crop.quantity || 100),
      message: ''
    })
  }

  // Handle offer form submission
  const handleSubmitOffer = (e) => {
    e.preventDefault()
    
    // Close the offer popup immediately
    setShowOfferPopup(false)
    
    // Create offer object
    const offer = {
      cropId: crop.id,
      cropName: crop.name,
      offeredPrice: offerData.offeredPrice,
      quantity: offerData.quantity,
      message: offerData.message,
      status: 'pending'
    }
    
    // Call the parent function with the offer
    if (onViewDetails) {
      onViewDetails(offer)
    }
    
    // Show success message
    alert(`✅ Offer sent for ${crop.name}!`)
  }

  // Handle offer input changes
  const handleOfferChange = (field, value) => {
    setOfferData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Render stars based on rating
  const renderStars = () => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <span key={i} style={{ color: '#fbbf24', fontSize: '14px' }}>★</span>
          } else if (i === fullStars && hasHalfStar) {
            return <span key={i} style={{ color: '#fbbf24', fontSize: '14px' }}>⯨</span>
          } else {
            return <span key={i} style={{ color: '#d1d5db', fontSize: '14px' }}>★</span>
          }
        })}
        <span style={{ 
          fontSize: '12px', 
          marginLeft: '4px', 
          color: darkMode ? '#9ca3af' : '#6b7280',
          fontWeight: '500'
        }}>
          {rating.toFixed(1)} ({reviews})
        </span>
      </span>
    )
  }
>>>>>>> 221a801 (feat: Disable call button functionality)

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
        <p className="crop-farmer">👨‍🌾 {crop.farmer || t('localFarmer')}</p>
        <p className="crop-location">📍 {crop.location || t('locationNotSpecified')}</p>
        
        <div className="crop-price-section">
          <span className="crop-price">₹{crop.price}</span>
          <span className="crop-unit">/{crop.unit || 'quintal'}</span>
        </div>
        
        <button 
          className="view-details-btn"
          onClick={() => onViewDetails(crop)}
        >
          {t('viewDetails')}
        </button>
      </div>
<<<<<<< HEAD
=======

      {/* DETAILS POPUP */}
      {showDetailsPopup && !showOfferPopup && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
            onClick={() => setShowDetailsPopup(false)}
          />
          
          <div
            ref={detailsPopupRef}
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: '10px',
              width: '300px',
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
              zIndex: 1000,
              animation: 'popIn 0.2s ease',
              border: `1px solid ${darkMode ? '#374151' : '#f0f0f0'}`,
              overflow: 'hidden'
            }}
          >
            {/* Arrow */}
            <div style={{
              position: 'absolute',
              top: '-6px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '12px',
              height: '12px',
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              borderLeft: `1px solid ${darkMode ? '#374151' : '#f0f0f0'}`,
              borderTop: `1px solid ${darkMode ? '#374151' : '#f0f0f0'}`,
              zIndex: -1
            }} />

            {/* Popup Content */}
            <div style={{ padding: '16px' }}>
              {/* Quick Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '16px'
              }}>
                <div style={{
                  padding: '12px',
                  background: darkMode ? '#374151' : '#f9fafb',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: darkMode ? '#fff' : '#111827' }}>
                    {crop.quantity}
                  </div>
                  <div style={{ fontSize: '11px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
                    Available Stock
                  </div>
                </div>
                <div style={{
                  padding: '12px',
                  background: darkMode ? '#374151' : '#f9fafb',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: darkMode ? '#fff' : '#111827' }}>
                    {crop.quality || 'A'}
                  </div>
                  <div style={{ fontSize: '11px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
                    Quality Grade
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div style={{
                background: darkMode ? '#374151' : '#f9fafb',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: darkMode ? '#9ca3af' : '#6b7280' }}>Season</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#111827' }}>
                    {crop.season || 'All Year'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: darkMode ? '#9ca3af' : '#6b7280' }}>Harvested</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#111827' }}>
                    {new Date().getMonth() < 6 ? 'Recent' : 'Fresh'}
                  </span>
                </div>
              </div>

              {/* Market Price */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '16px',
                color: 'white'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', opacity: '0.9' }}>Market Price</span>
                  <span style={{ fontSize: '20px', fontWeight: '700' }}>₹{formatPrice(Math.round(crop.price * 1.15))}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                  padding: '6px 8px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}>
                  <span>You Save</span>
                  <span style={{ fontWeight: '600' }}>15% (₹{formatPrice(Math.round(crop.price * 0.15))})</span>
                </div>
              </div>

              {/* Description */}
              {crop.description && (
                <div style={{
                  padding: '12px',
                  background: darkMode ? '#374151' : '#f9fafb',
                  borderRadius: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
                    📝 Description
                  </div>
                  <p style={{
                    fontSize: '13px',
                    lineHeight: '1.5',
                    color: darkMode ? '#fff' : '#111827',
                    margin: 0
                  }}>
                    {crop.description}
                  </p>
                </div>
              )}

              {/* Action Buttons - Call button disabled */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleMakeOfferClick}
                  style={{
                    flex: 2,
                    padding: '12px',
                    background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  💰 Make Offer
                </button>
                
                {/* Disabled Call Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // Disabled - no action
                    console.log('Call button clicked (disabled)')
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: darkMode ? '#374151' : '#e5e7eb',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'not-allowed',
                    opacity: 0.7,
                    transition: 'all 0.2s ease'
                  }}
                  // No hover effects
                >
                  📞 Call
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* OFFER POPUP - Attached to card */}
      {showOfferPopup && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
            onClick={() => setShowOfferPopup(false)}
          />
          
          <div
            ref={offerPopupRef}
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: '10px',
              width: '320px',
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
              zIndex: 1001,
              animation: 'popIn 0.2s ease',
              border: `1px solid ${darkMode ? '#374151' : '#f0f0f0'}`,
              overflow: 'hidden'
            }}
          >
            {/* Arrow */}
            <div style={{
              position: 'absolute',
              top: '-6px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '12px',
              height: '12px',
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              borderLeft: `1px solid ${darkMode ? '#374151' : '#f0f0f0'}`,
              borderTop: `1px solid ${darkMode ? '#374151' : '#f0f0f0'}`,
              zIndex: -1
            }} />

            {/* Header */}
            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
                💰 Make Offer
              </h3>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                {crop.name} • {crop.farmer?.split(' ')[0] || 'Farmer'}
              </p>
            </div>

            {/* Offer Form */}
            <form onSubmit={handleSubmitOffer} style={{ padding: '16px' }}>
              {/* Price Input */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: darkMode ? '#9ca3af' : '#4b5563'
                }}>
                  Your Offer (₹) *
                </label>
                <input
                  type="number"
                  value={offerData.offeredPrice}
                  onChange={(e) => handleOfferChange('offeredPrice', parseInt(e.target.value))}
                  min="1"
                  max={crop.price * 2}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '15px',
                    border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                    borderRadius: '10px',
                    backgroundColor: darkMode ? '#374151' : '#f9fafb',
                    color: darkMode ? '#fff' : '#111827',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea'
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = darkMode ? '#4b5563' : '#e5e7eb'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '4px',
                  fontSize: '11px'
                }}>
                  <span style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
                    Listed: ₹{formatPrice(crop.price)}
                  </span>
                  {offerData.offeredPrice < crop.price && (
                    <span style={{ color: '#10b981' }}>
                      Save ₹{formatPrice(crop.price - offerData.offeredPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: darkMode ? '#9ca3af' : '#4b5563'
                }}>
                  Quantity ({crop.unit}) *
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="number"
                    value={offerData.quantity}
                    onChange={(e) => handleOfferChange('quantity', parseInt(e.target.value))}
                    min="1"
                    max={crop.quantity}
                    required
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      fontSize: '14px',
                      border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                      borderRadius: '10px',
                      backgroundColor: darkMode ? '#374151' : '#f9fafb',
                      color: darkMode ? '#fff' : '#111827',
                      textAlign: 'center'
                    }}
                  />
                </div>
                <div style={{ marginTop: '4px', fontSize: '11px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
                  Available: {crop.quantity} {crop.unit}
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: darkMode ? '#9ca3af' : '#4b5563'
                }}>
                  Message to Farmer
                </label>
                <textarea
                  value={offerData.message}
                  onChange={(e) => handleOfferChange('message', e.target.value)}
                  placeholder="e.g., I need this for community kitchen. Can pick up immediately."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '12px',
                    border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                    borderRadius: '10px',
                    backgroundColor: darkMode ? '#374151' : '#f9fafb',
                    color: darkMode ? '#fff' : '#111827',
                    resize: 'none',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Total */}
              <div style={{
                background: darkMode ? '#374151' : '#f3f4f6',
                borderRadius: '10px',
                padding: '12px',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '13px', color: darkMode ? '#9ca3af' : '#6b7280' }}>Total Value: </span>
                <span style={{ fontSize: '20px', fontWeight: '700', color: darkMode ? '#fff' : '#111827' }}>
                  ₹{formatPrice(offerData.offeredPrice * offerData.quantity)}
                </span>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowOfferPopup(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: darkMode ? '#374151' : '#f3f4f6',
                    border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: darkMode ? '#fff' : '#1f2937',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = darkMode ? '#4b5563' : '#e5e7eb'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = darkMode ? '#374151' : '#f3f4f6'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 2,
                    padding: '12px',
                    background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)'
                  }}
                >
                  Send Offer
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      <style>{`
        @keyframes popIn {
          from {
            opacity: 0;
            transform: translateX(-50%) scale(0.95) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) scale(1) translateY(0);
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
>>>>>>> 221a801 (feat: Disable call button functionality)
    </div>
  )
}

export default CropCard