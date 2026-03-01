import { useState, useRef, useEffect } from "react"
import { useLanguage } from "../LanguageContext"

// Realistic ratings for different crops
const cropRatings = {
  "Wheat": 4.8,
  "Rice": 4.7,
  "Corn": 4.5,
  "Barley": 4.3,
  "Millet": 4.6,
  "Soybean": 4.4,
  "Green Gram": 4.7,
  "Black Gram": 4.5,
  "Chickpea": 4.6,
  "Pigeon Pea": 4.4,
  "Potato": 4.8,
  "Onion": 4.6,
  "Tomato": 4.7,
  "Cauliflower": 4.5,
  "Cabbage": 4.4,
  "Brinjal": 4.5,
  "Okra": 4.6,
  "Green Chili": 4.7,
  "Spinach": 4.8,
  "Carrot": 4.7,
  "Radish": 4.3,
  "Pumpkin": 4.4,
  "Bitter Gourd": 4.5,
  "Bottle Gourd": 4.3,
  "Banana": 4.7,
  "Mango": 4.9,
  "Orange": 4.8,
  "Apple": 4.8
}

// Review counts
const reviewCounts = {
  "Wheat": 234,
  "Rice": 189,
  "Corn": 156,
  "Barley": 98,
  "Millet": 112,
  "Soybean": 134,
  "Green Gram": 87,
  "Black Gram": 76,
  "Chickpea": 145,
  "Pigeon Pea": 69,
  "Potato": 312,
  "Onion": 278,
  "Tomato": 298,
  "Cauliflower": 134,
  "Cabbage": 112,
  "Brinjal": 98,
  "Okra": 87,
  "Green Chili": 156,
  "Spinach": 134,
  "Carrot": 167,
  "Radish": 78,
  "Pumpkin": 92,
  "Bitter Gourd": 67,
  "Bottle Gourd": 71,
  "Banana": 245,
  "Mango": 312,
  "Orange": 287,
  "Apple": 298
}

function CropCard({ crop, onViewDetails, darkMode }) {
  const { t } = useLanguage()
  const [showPopup, setShowPopup] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef(null)
  const popupRef = useRef(null)

  // Get rating for this crop
  const rating = cropRatings[crop.name] || 4.5
  const reviews = reviewCounts[crop.name] || 120

  // Format price in Indian format
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price)
  }

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) &&
          cardRef.current && !cardRef.current.contains(event.target)) {
        setShowPopup(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Toggle popup when card is clicked ANYWHERE
  const handleCardClick = (e) => {
    // Prevent event from bubbling up
    e.stopPropagation()
    setShowPopup(!showPopup)
  }

  // Handle button click - just opens the same popup, doesn't trigger onViewDetails
  const handleButtonClick = (e) => {
    e.stopPropagation()
    setShowPopup(!showPopup)
  }

  // Handle make offer from popup
  const handleMakeOfferFromPopup = (e) => {
    e.stopPropagation()
    onViewDetails(crop) // This will open the OfferModal
    setShowPopup(false)
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

  return (
    <div ref={cardRef} style={{ position: 'relative' }}>
      {/* Modern Crop Card - ENTIRE CARD IS CLICKABLE */}
      <div 
        className={`crop-card ${darkMode ? 'crop-card-dark' : ''}`}
        onClick={handleCardClick}
        style={{
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: showPopup ? 'scale(1.02)' : 'scale(1)',
          boxShadow: showPopup 
            ? '0 20px 25px -5px rgba(0,0,0,0.2), 0 10px 10px -5px rgba(0,0,0,0.1)' 
            : '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
          border: `1px solid ${darkMode ? '#374151' : '#f0f0f0'}`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Image Container with Gradient Overlay */}
        <div style={{ 
          height: '180px', 
          overflow: 'hidden', 
          position: 'relative',
          background: 'linear-gradient(45deg, #667eea20, #764ba220)'
        }}>
          {!imageLoaded && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              zIndex: 1
            }} />
          )}
          <img 
            src={crop.image || 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg'} 
            alt={crop.name}
            onLoad={() => setImageLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              opacity: imageLoaded ? 1 : 0
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
          
          {/* Organic Badge */}
          {crop.organic && (
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(34, 197, 94, 0.95)',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ fontSize: '12px' }}>🌱</span>
              <span>ORGANIC</span>
            </div>
          )}

          {/* Farmer Badge */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 2
          }}>
            <span>👨‍🌾</span>
            <span>{crop.farmer?.split(' ')[0] || 'Farmer'}</span>
          </div>
        </div>
        
        {/* Content Section */}
        <div style={{ 
          padding: '16px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* Top Row: Name and Rating */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <h3 style={{ 
              margin: 0, 
              fontSize: '18px', 
              fontWeight: '700',
              color: darkMode ? '#fff' : '#111827',
              letterSpacing: '-0.025em'
            }}>
              {crop.name}
            </h3>
            {renderStars()}
          </div>

          {/* Location with Icon */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            color: darkMode ? '#9ca3af' : '#6b7280',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            <span style={{ fontSize: '14px' }}>📍</span>
            <span>{crop.location?.split(',')[0] || 'Local'}</span>
            <span style={{ 
              background: darkMode ? '#374151' : '#f3f4f6',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: '600',
              marginLeft: '4px'
            }}>
              {crop.location?.split(',')[1]?.trim() || 'India'}
            </span>
          </div>

          {/* Farmer Name */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            color: darkMode ? '#9ca3af' : '#6b7280',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            <span style={{ fontSize: '14px' }}>👨‍🌾</span>
            <span>{crop.farmer || 'Local Farmer'}</span>
          </div>

          {/* Price Section */}
          <div style={{ 
            marginTop: '8px',
            padding: '12px 0',
            borderTop: `1px solid ${darkMode ? '#374151' : '#f0f0f0'}`,
            borderBottom: `1px solid ${darkMode ? '#374151' : '#f0f0f0'}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                color: darkMode ? '#fff' : '#111827',
                letterSpacing: '-0.025em'
              }}>
                ₹{formatPrice(crop.price)}
              </span>
              <span style={{ 
                fontSize: '13px', 
                color: darkMode ? '#9ca3af' : '#6b7280',
                marginLeft: '4px',
                fontWeight: '500'
              }}>
                /{crop.unit || 'quintal'}
              </span>
            </div>
            
            {/* Stock Indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: darkMode ? '#374151' : '#f3f4f6',
              padding: '4px 10px',
              borderRadius: '20px'
            }}>
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%',
                background: crop.quantity > 500 ? '#10b981' : crop.quantity > 200 ? '#f59e0b' : '#ef4444',
                display: 'inline-block'
              }} />
              <span style={{ 
                fontSize: '11px', 
                fontWeight: '600',
                color: darkMode ? '#9ca3af' : '#4b5563'
              }}>
                {crop.quantity} {crop.unit}
              </span>
            </div>
          </div>

          {/* View Details Button - NOW JUST OPENS THE SAME POPUP */}
          <button 
            onClick={handleButtonClick}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              marginTop: '4px',
              boxShadow: '0 4px 6px -1px rgba(102, 126, 234, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 10px 15px -3px rgba(102, 126, 234, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 6px -1px rgba(102, 126, 234, 0.2)'
            }}
          >
            <span>🔍</span>
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Popup - Shows Additional Details */}
      {showPopup && (
        <>
          {/* Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
            onClick={() => setShowPopup(false)}
          />
          
          <div
            ref={popupRef}
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

              {/* Action Buttons - NOW "Make Offer" OPENS THE OFFER MODAL */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleMakeOfferFromPopup}
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
                    gap: '6px'
                  }}
                >
                  💰 Make Offer
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(`tel:${crop.farmerPhone || '1234567890'}`)
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: darkMode ? '#374151' : '#e5e7eb',
                    color: darkMode ? '#fff' : '#1f2937',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  📞 Call
                </button>
              </div>
            </div>
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
    </div>
  )
}

export default CropCard