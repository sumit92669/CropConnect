import { useCart } from "../context/CartContext"

function Cart({ darkMode, onBackToHome }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price)
  }

  const totalPrice = getTotalPrice()
  
  console.log("📦 Cart page - cartItems:", cartItems)
  console.log("📦 Cart page - items count:", cartItems.length)

  // If cart is empty
  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '40px 20px',
        minHeight: '70vh',
        textAlign: 'center'
      }}>
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
            Your cart is empty
          </h2>
          <p style={{
            fontSize: '16px',
            color: darkMode ? '#9ca3af' : '#6b7280',
            marginBottom: '30px'
          }}>
            Add some crops to get started!
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

  // Cart with items
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px',
      minHeight: '70vh'
    }}>
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
          marginBottom: '30px'
        }}
      >
        ← Continue Shopping
      </button>

      <h1>Your Cart ({cartItems.length} items)</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '30px' }}>
        <div>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '16px', padding: '16px', marginBottom: '12px', background: darkMode ? '#1f2937' : '#f9fafb', borderRadius: '12px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>👨‍🌾 {item.farmer}</p>
                <p>₹{item.price}/{item.unit}</p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '20px', color: 'red' }}>Remove</button>
                </div>
              </div>
              <div><strong>₹{formatPrice(item.price * item.quantity)}</strong></div>
            </div>
          ))}
        </div>
        
        <div style={{ padding: '20px', background: darkMode ? '#1f2937' : '#f9fafb', borderRadius: '12px', height: 'fit-content' }}>
          <h3>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
            <span>Total</span>
            <span><strong>₹{formatPrice(totalPrice)}</strong></span>
          </div>
          <button onClick={() => { clearCart(); alert('Order placed!'); onBackToHome(); }} style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Proceed to Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart