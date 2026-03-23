import { useState } from "react";

function QuoteModal({ crop, isOpen, onClose, onSubmit, darkMode }) {
  const [quoteData, setQuoteData] = useState({
    quantity: 1,
    message: "",
    deliveryDate: "",
    phone: ""
  });

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

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];
  // Get date 30 days from now
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease'
        }}
        onClick={onClose}
      />

      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '450px',
          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
          zIndex: 1001,
          animation: 'slideUp 0.3s ease',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
              📝 Request Quote
            </h3>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                fontSize: '18px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              ✕
            </button>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '14px', opacity: 0.9 }}>
            {crop.name} • {crop.farmer}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          {/* Crop Info Card */}
          <div
            style={{
              background: darkMode ? '#2d3a4f' : '#f3f4f6',
              borderRadius: '12px',
              padding: '15px',
              marginBottom: '20px',
              display: 'flex',
              gap: '12px'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#e5e7eb'
              }}
            >
              <img
                src={crop.image || 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg'}
                alt={crop.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '700', color: darkMode ? '#fff' : '#1f2937' }}>
                {crop.name}
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
                {crop.farmer} • {crop.location?.split(',')[0]}
              </p>
              <p style={{ margin: '8px 0 0', fontSize: '14px', fontWeight: '600', color: '#10b981' }}>
                ₹{formatPrice(crop.price)}/{crop.unit}
              </p>
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '13px',
                fontWeight: '600',
                color: darkMode ? '#f8fafc' : '#374151'
              }}
            >
              Quantity ({crop.unit}) *
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setQuoteData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 10) }))}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                  background: darkMode ? '#374151' : 'white',
                  color: darkMode ? '#fff' : '#1f2937',
                  cursor: 'pointer',
                  fontSize: '18px'
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
                  width: '100px',
                  padding: '10px',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  background: darkMode ? '#374151' : 'white',
                  color: darkMode ? '#fff' : '#1f2937'
                }}
              />
              <button
                type="button"
                onClick={() => setQuoteData(prev => ({ ...prev, quantity: Math.min(crop.quantity, prev.quantity + 10) }))}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                  background: darkMode ? '#374151' : 'white',
                  color: darkMode ? '#fff' : '#1f2937',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                +
              </button>
              <span style={{ fontSize: '13px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
                Available: {crop.quantity} {crop.unit}
              </span>
            </div>
          </div>

          {/* Delivery Date */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '13px',
                fontWeight: '600',
                color: darkMode ? '#f8fafc' : '#374151'
              }}
            >
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
                padding: '10px',
                fontSize: '14px',
                border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                borderRadius: '8px',
                background: darkMode ? '#374151' : 'white',
                color: darkMode ? '#fff' : '#1f2937'
              }}
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '13px',
                fontWeight: '600',
                color: darkMode ? '#f8fafc' : '#374151'
              }}
            >
              Contact Number *
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
                padding: '10px',
                fontSize: '14px',
                border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                borderRadius: '8px',
                background: darkMode ? '#374151' : 'white',
                color: darkMode ? '#fff' : '#1f2937'
              }}
            />
          </div>

          {/* Message */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '13px',
                fontWeight: '600',
                color: darkMode ? '#f8fafc' : '#374151'
              }}
            >
              Message to Farmer
            </label>
            <textarea
              value={quoteData.message}
              onChange={(e) => setQuoteData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="e.g., Need for community kitchen, can arrange pickup..."
              rows="3"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                borderRadius: '8px',
                background: darkMode ? '#374151' : 'white',
                color: darkMode ? '#fff' : '#1f2937',
                resize: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Estimated Total */}
          <div
            style={{
              background: darkMode ? '#2d3a4f' : '#f3f4f6',
              borderRadius: '12px',
              padding: '15px',
              marginBottom: '20px',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '14px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
              Estimated Total:
            </span>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', marginLeft: '10px' }}>
              ₹{formatPrice(crop.price * quoteData.quantity)}
            </span>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                background: darkMode ? '#374151' : '#f3f4f6',
                border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
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
                padding: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
            >
              Send Quote Request
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
}

export default QuoteModal;