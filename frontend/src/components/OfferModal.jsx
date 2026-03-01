import { useState, useEffect } from "react"
import { useLanguage } from "../LanguageContext"

function OfferModal({ crop, isOpen, onClose, onSubmitOffer, darkMode }) {
  const { t } = useLanguage()
  const [offerData, setOfferData] = useState({
    offeredPrice: crop?.price || '',
    quantity: crop?.quantity || 100,
    message: ''
  })

  useEffect(() => {
    if (crop) {
      setOfferData({
        offeredPrice: crop.price,
        quantity: Math.min(100, crop.quantity || 100),
        message: ''
      })
    }
  }, [crop])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmitOffer({
      cropId: crop?.id,
      cropName: crop?.name,
      ...offerData
    })
    onClose()
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
        zIndex: 1100,
        animation: 'fadeIn 0.2s ease'
      }}
    >
      <div 
        className={`offer-modal ${darkMode ? 'dark' : ''}`}
        style={{
          width: '90%',
          maxWidth: '340px',
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          animation: 'scaleIn 0.25s ease'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative'
        }}>
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            ✕
          </button>
          
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
            Make Offer
          </h3>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
            {crop.name} • {crop.farmer || 'Local Farmer'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
          {/* Price Input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '12px',
              fontWeight: '600',
              color: darkMode ? '#ccc' : '#4b5563'
            }}>
              Your Offer (₹) *
            </label>
            <input
              type="number"
              value={offerData.offeredPrice}
              onChange={(e) => setOfferData({...offerData, offeredPrice: parseInt(e.target.value)})}
              min="1"
              max={crop.price * 2}
              required
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '15px',
                border: `2px solid ${darkMode ? '#404040' : '#e5e7eb'}`,
                borderRadius: '10px',
                backgroundColor: darkMode ? '#2d2d2d' : '#f9fafb',
                color: darkMode ? '#fff' : '#1f2937',
                outline: 'none'
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '4px',
              fontSize: '11px'
            }}>
              <span style={{ color: darkMode ? '#999' : '#666' }}>
                Listed: ₹{crop.price}
              </span>
              {offerData.offeredPrice < crop.price && (
                <span style={{ color: '#10b981' }}>
                  Save ₹{crop.price - offerData.offeredPrice}
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
              color: darkMode ? '#ccc' : '#4b5563'
            }}>
              Quantity ({crop.unit}) *
            </label>
            <input
              type="number"
              value={offerData.quantity}
              onChange={(e) => setOfferData({...offerData, quantity: parseInt(e.target.value)})}
              min="1"
              max={crop.quantity}
              required
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: `2px solid ${darkMode ? '#404040' : '#e5e7eb'}`,
                borderRadius: '10px',
                backgroundColor: darkMode ? '#2d2d2d' : '#f9fafb',
                color: darkMode ? '#fff' : '#1f2937'
              }}
            />
            <div style={{ marginTop: '4px', fontSize: '11px', color: darkMode ? '#999' : '#666' }}>
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
              color: darkMode ? '#ccc' : '#4b5563'
            }}>
              Message to Farmer
            </label>
            <textarea
              value={offerData.message}
              onChange={(e) => setOfferData({...offerData, message: e.target.value})}
              placeholder="e.g., I need this for community kitchen. Can pick up immediately."
              rows="2"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '12px',
                border: `2px solid ${darkMode ? '#404040' : '#e5e7eb'}`,
                borderRadius: '10px',
                backgroundColor: darkMode ? '#2d2d2d' : '#f9fafb',
                color: darkMode ? '#fff' : '#1f2937',
                resize: 'none',
                outline: 'none'
              }}
            />
          </div>

          {/* Total */}
          <div style={{
            background: darkMode ? '#2d2d2d' : '#f9fafb',
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '12px', color: darkMode ? '#999' : '#666' }}>Total Value: </span>
            <span style={{ fontSize: '18px', fontWeight: '700', color: darkMode ? '#fff' : '#1f2937' }}>
              ₹{offerData.offeredPrice * offerData.quantity}
            </span>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '10px',
                background: darkMode ? '#2d2d2d' : '#f3f4f6',
                border: `1px solid ${darkMode ? '#404040' : '#e5e7eb'}`,
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                color: darkMode ? '#fff' : '#1f2937',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = darkMode ? '#404040' : '#e5e7eb'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = darkMode ? '#2d2d2d' : '#f3f4f6'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 2,
                padding: '10px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
            >
              Send Offer
            </button>
          </div>
        </form>
      </div>

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

export default OfferModal