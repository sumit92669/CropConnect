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

  return (
    <div ref={cardRef} style={{ position: 'relative' }}>
      {/* Modern Crop Card */}
      <div 
        className={`crop-card ${darkMode ? 'crop-card-dark' : ''}`}
        onClick={handleCardClick}
        style={{
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: (showDetailsPopup || showOfferPopup) ? 'scale(1.02)' : 'scale(1)',
          boxShadow: (showDetailsPopup || showOfferPopup)
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
        {/* Image Container */}
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

          {/* Location */}
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

          {/* Quick View Button */}
          <button 
            onClick={handleCardClick}
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
    </div>
  )
}

export default CropCard