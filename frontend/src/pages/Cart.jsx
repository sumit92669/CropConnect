function Cart({ darkMode, onBackToHome }) {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px',
      minHeight: '70vh',
      textAlign: 'center'
    }}>
      {/* Back Button */}
      <button 
        onClick={onBackToHome}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '40px'
        }}
      >
        ← Back to Home
      </button>

      <div style={{
        textAlign: 'center',
        padding: '80px 20px',
        background: darkMode ? '#1f2937' : '#f9fafb',
        borderRadius: '24px',
        border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
      }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</div>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '600',
          marginBottom: '12px',
          color: darkMode ? '#fff' : '#1f2937'
        }}>
          Your Cart
        </h2>
        <p style={{
          fontSize: '16px',
          color: darkMode ? '#9ca3af' : '#6b7280',
          marginBottom: '30px'
        }}>
          Add crops to cart and they will appear here!
        </p>
        <button
          onClick={onBackToHome}
          style={{
            padding: '14px 32px',
            background: 'linear-gradient(135deg, #4CAF50, #45a049)',
            color: 'white',
            border: 'none',
            borderRadius: '40px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🌾 Browse Crops
        </button>
      </div>
    </div>
  )
}

export default Cart