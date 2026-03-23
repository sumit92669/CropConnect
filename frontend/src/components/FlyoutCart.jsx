import { useCart } from '../context/CartContext';

function FlyoutCart({ darkMode }) {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice,
    clearCart 
  } = useCart();

  const totalPrice = getTotalPrice();
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    alert(`✅ Order placed! Total: ₹${formatPrice(totalPrice)}`);
    clearCart();
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
          animation: 'fadeIn 0.2s ease'
        }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Flyout Cart - LEFT SIDE */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          backgroundColor: darkMode ? '#1a1a2e' : '#ffffff',
          boxShadow: '5px 0 30px rgba(0,0,0,0.15)',
          zIndex: 1000,
          animation: 'slideInLeft 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>
              🛒 Your Cart ({cartItems.length})
            </h2>
            <p style={{ margin: '5px 0 0', fontSize: '13px', opacity: 0.9 }}>
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
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

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px'
        }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              <div style={{ fontSize: '48px' }}>🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                marginBottom: '12px',
                background: darkMode ? '#2d2d3a' : '#f9fafb',
                borderRadius: '12px'
              }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ fontSize: '12px', margin: '4px 0' }}>₹{item.price}/{item.unit}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '28px', height: '28px' }}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '28px', height: '28px' }}>+</button>
                    <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 'auto', color: '#ef4444' }}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: '20px', borderTop: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Total:</span>
              <span style={{ fontWeight: 'bold', color: '#10b981' }}>₹{formatPrice(totalPrice)}</span>
            </div>
            <button onClick={handleCheckout} style={{
              width: '100%',
              padding: '12px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              Checkout
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default FlyoutCart;