import { useState, useRef, useEffect } from "react";

function QuoteModal({ crop, isOpen, onClose, onSubmit, darkMode, triggerRef }) {
  // ALL HOOKS AT TOP
  const [quoteData, setQuoteData] = useState({
    quantity: 1,
    message: "",
    deliveryDate: "",
    phone: ""
  });
  
  const popupRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) &&
          triggerRef?.current && !triggerRef?.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quoteData.quantity < 1) {
      alert("Please enter valid quantity");
      return;
    }
    onSubmit({
      cropId: crop.id,
      cropName: crop.name,
      farmerName: crop.farmer,
      ...quoteData
    });
    onClose();
  };

  if (!isOpen || !crop) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <>
      {/* NO BACKDROP - Screen blur nahi hoga! */}
      
      {/* Attached Popup - exactly like details popup */}
      <div
        ref={popupRef}
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px',
          width: '300px',
          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 20px 40px -12px rgba(0,0,0,0.3)',
          zIndex: 1000,
          animation: 'popUp 0.2s ease',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          overflow: 'hidden'
        }}
      >
        {/* Arrow pointing to button - same as details popup */}
        <div style={{
          position: 'absolute',
          top: '-6px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          width: '12px',
          height: '12px',
          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
          borderLeft: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          zIndex: -1
        }} />

        {/* Header */}
        <div
          style={{
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>
              📝 Request Quote
            </h3>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                fontSize: '12px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              ✕
            </button>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '11px', opacity: 0.9 }}>
            {crop.name} • {crop.farmer?.split(' ')[0]}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '12px' }}>
          {/* Quick Info */}
          <div
            style={{
              background: darkMode ? '#2d3a4f' : '#f3f4f6',
              borderRadius: '10px',
              padding: '8px',
              marginBottom: '12px',
              display: 'flex',
              gap: '10px'
            }}
          >
            <div
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#e5e7eb',
                flexShrink: 0
              }}
            >
              <img
                src={crop.image || 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg'}
                alt={crop.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <h4 style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '600', color: darkMode ? '#fff' : '#1f2937' }}>
                {crop.name}
              </h4>
              <p style={{ margin: 0, fontSize: '9px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
                ₹{formatPrice(crop.price)}/{crop.unit}
              </p>
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '10px', fontWeight: '600', color: darkMode ? '#f8fafc' : '#374151' }}>
              Quantity ({crop.unit}) *
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setQuoteData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 10) }))}
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '6px', 
                  border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`, 
                  background: darkMode ? '#374151' : 'white', 
                  color: darkMode ? '#fff' : '#1f2937', 
                  cursor: 'pointer', 
                  fontSize: '14px'
                }}
              >
                −
              </button>
              <input
                type="number"
                value={quoteData.quantity}
                onChange={(e) => setQuoteData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                min="1"
                max={crop.quantity}
                style={{ 
                  width: '60px', 
                  padding: '4px', 
                  textAlign: 'center', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`, 
                  borderRadius: '6px', 
                  background: darkMode ? '#374151' : 'white', 
                  color: darkMode ? '#fff' : '#1f2937' 
                }}
              />
              <button
                type="button"
                onClick={() => setQuoteData(prev => ({ ...prev, quantity: Math.min(crop.quantity, prev.quantity + 10) }))}
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '6px', 
                  border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`, 
                  background: darkMode ? '#374151' : 'white', 
                  color: darkMode ? '#fff' : '#1f2937', 
                  cursor: 'pointer', 
                  fontSize: '14px'
                }}
              >
                +
              </button>
              <span style={{ fontSize: '9px', color: darkMode ? '#9ca3af' : '#6b7280' }}>Avail: {crop.quantity}</span>
            </div>
          </div>

          {/* Delivery Date */}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '10px', fontWeight: '600', color: darkMode ? '#f8fafc' : '#374151' }}>
              Delivery Date *
            </label>
            <input
              type="date"
              value={quoteData.deliveryDate}
              onChange={(e) => setQuoteData(prev => ({ ...prev, deliveryDate: e.target.value }))}
              min={today}
              max={maxDateStr}
              required
              style={{ 
                width: '100%', 
                padding: '6px', 
                fontSize: '11px', 
                border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`, 
                borderRadius: '6px', 
                background: darkMode ? '#374151' : 'white', 
                color: darkMode ? '#fff' : '#1f2937' 
              }}
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '10px', fontWeight: '600', color: darkMode ? '#f8fafc' : '#374151' }}>
              Phone *
            </label>
            <input
              type="tel"
              value={quoteData.phone}
              onChange={(e) => setQuoteData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="9876543210"
              pattern="[0-9]{10}"
              required
              style={{ 
                width: '100%', 
                padding: '6px', 
                fontSize: '11px', 
                border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`, 
                borderRadius: '6px', 
                background: darkMode ? '#374151' : 'white', 
                color: darkMode ? '#fff' : '#1f2937' 
              }}
            />
          </div>

          {/* Message - shorter */}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '10px', fontWeight: '600', color: darkMode ? '#f8fafc' : '#374151' }}>
              Message
            </label>
            <textarea
              value={quoteData.message}
              onChange={(e) => setQuoteData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Quick note..."
              rows="2"
              style={{ 
                width: '100%', 
                padding: '6px', 
                fontSize: '10px', 
                border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`, 
                borderRadius: '6px', 
                background: darkMode ? '#374151' : 'white', 
                color: darkMode ? '#fff' : '#1f2937', 
                resize: 'none'
              }}
            />
          </div>

          {/* Total */}
          <div style={{ 
            background: darkMode ? '#2d3a4f' : '#f3f4f6', 
            borderRadius: '6px', 
            padding: '6px', 
            marginBottom: '10px', 
            textAlign: 'center' 
          }}>
            <span style={{ fontSize: '10px', color: darkMode ? '#9ca3af' : '#6b7280' }}>Total:</span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#10b981', marginLeft: '6px' }}>₹{formatPrice(crop.price * quoteData.quantity)}</span>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ 
                flex: 1, 
                padding: '6px', 
                background: darkMode ? '#374151' : '#f3f4f6', 
                border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`, 
                borderRadius: '6px', 
                fontSize: '11px', 
                fontWeight: '500', 
                color: darkMode ? '#fff' : '#1f2937', 
                cursor: 'pointer' 
              }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{ 
                flex: 2, 
                padding: '6px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                fontSize: '11px', 
                fontWeight: '600', 
                cursor: 'pointer' 
              }}
            >
              Send Quote
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes popUp {
          from {
            opacity: 0;
            transform: translateX(-50%) scale(0.95) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}

export default QuoteModal;