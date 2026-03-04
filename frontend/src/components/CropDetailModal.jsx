import { useEffect } from "react"
import { useLanguage } from "../LanguageContext"

function CropDetailModal({ crop, isOpen, onClose, onMakeOffer, darkMode }) {
  const { t } = useLanguage()

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen || !crop) return null

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease'
      }}
    >
      <div 
        className={`crop-detail-modal ${darkMode ? 'dark' : ''}`}
        style={{
          width: '90%',
          maxWidth: '380px',
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          animation: 'scaleIn 0.25s ease',
          position: 'relative'
        }}
      >
        {/* Image Section */}
        <div style={{ 
          height: '160px', 
          position: 'relative',
          background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)'
        }}>
          <img 
            src={crop.image || 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg'} 
            alt={crop.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: 'none',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.2s ease',
              zIndex: 10
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.7)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.5)'}
          >
            ✕
          </button>

          {/* Category Badge */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            background: 'rgba(255,255,255,0.95)',
            color: '#333',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <span>{crop.category === 'grains' ? '🌾' : crop.category === 'pulses' ? '🌱' : crop.category === 'vegetables' ? '🥬' : '🍎'}</span>
            {crop.category}
          </div>

          {/* Organic Badge */}
          {crop.organic && (
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              background: '#4CAF50',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span>🌱</span> Organic
            </div>
          )}
        </div>

        {/* Content Section */}
        <div style={{ padding: '16px' }}>
          {/* Header with Name and Rating */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '12px'
          }}>
            <div>
              <h2 style={{ 
                margin: '0 0 4px 0', 
                fontSize: '20px', 
                fontWeight: '700',
                color: darkMode ? '#fff' : '#1f2937'
              }}>
                {crop.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#fbbf24', fontSize: '14px' }}>★★★★★</span>
                <span style={{ fontSize: '12px', color: darkMode ? '#999' : '#666' }}>4.5</span>
              </div>
            </div>
            {crop.season && (
              <span style={{
                fontSize: '11px',
                padding: '4px 8px',
                background: darkMode ? '#2d2d2d' : '#f3f4f6',
                borderRadius: '12px',
                color: darkMode ? '#ccc' : '#666'
              }}>
                {crop.season}
              </span>
            )}
          </div>

          {/* Farmer Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            background: darkMode ? '#2d2d2d' : '#f9fafb',
            borderRadius: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: 'white'
            }}>
              👨‍🌾
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#1f2937' }}>
                {crop.farmer || 'Local Farmer'}
              </div>
              <div style={{ fontSize: '11px', color: darkMode ? '#999' : '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
                📍 {crop.location || 'Location not specified'}
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <div style={{
              padding: '8px',
              background: darkMode ? '#2d2d2d' : '#f9fafb',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: darkMode ? '#fff' : '#1f2937' }}>
                {crop.quantity}
              </div>
              <div style={{ fontSize: '10px', color: darkMode ? '#999' : '#666' }}>
                Available ({crop.unit})
              </div>
            </div>
            <div style={{
              padding: '8px',
              background: darkMode ? '#2d2d2d' : '#f9fafb',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: darkMode ? '#fff' : '#1f2937' }}>
                {crop.quality || 'A'}
              </div>
              <div style={{ fontSize: '10px', color: darkMode ? '#999' : '#666' }}>
                Quality
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            padding: '12px',
            marginBottom: '12px',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', opacity: '0.9' }}>Price</span>
              <div>
                <span style={{ fontSize: '22px', fontWeight: '700' }}>₹{crop.price}</span>
                <span style={{ fontSize: '12px', opacity: '0.8', marginLeft: '2px' }}>/{crop.unit}</span>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 8px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '8px',
              fontSize: '11px'
            }}>
              <span>Market Price: ₹{Math.round(crop.price * 1.15)}</span>
              <span style={{ fontWeight: '600' }}>You save 15%</span>
            </div>
          </div>

          {/* Description */}
          {crop.description && (
            <p style={{
              fontSize: '12px',
              lineHeight: '1.5',
              color: darkMode ? '#ccc' : '#4b5563',
              margin: '0 0 12px 0',
              padding: '8px',
              background: darkMode ? '#2d2d2d' : '#f9fafb',
              borderRadius: '8px'
            }}>
              {crop.description}
            </p>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                onMakeOffer(crop)
                onClose()
              }}
              style={{
                flex: 2,
                padding: '10px',
                background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              💰 Make Offer
            </button>
            
            <button
              onClick={() => window.open(`tel:${crop.farmerPhone || '1234567890'}`)}
              style={{
                flex: 1,
                padding: '10px',
                background: darkMode ? '#2d2d2d' : '#f3f4f6',
                color: darkMode ? '#fff' : '#1f2937',
                border: `1px solid ${darkMode ? '#404040' : '#e5e7eb'}`,
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = darkMode ? '#404040' : '#e5e7eb'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = darkMode ? '#2d2d2d' : '#f3f4f6'
              }}
            >
              📞 Call
            </button>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default CropDetailModal