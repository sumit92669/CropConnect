import { useCart } from "../context/CartContext"
import { useEffect, useState } from "react"

function Cart({ darkMode, onBackToHome }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [items, setItems] = useState([])
  const DELIVERY_CHARGE = 1100
  const FREE_DELIVERY_THRESHOLD = 10000
  
  // Update items whenever cartItems changes
  useEffect(() => {
    console.log("🔄 Cart page - cartItems changed:", cartItems)
    setItems([...cartItems])
  }, [cartItems])
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price)
  }

  const subtotal = getTotalPrice()
  
  // Calculate delivery charge based on subtotal
  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE
  const totalPrice = subtotal + deliveryCharge
  
  // Calculate how much more needed for free delivery
  const amountForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal)
  
  console.log("📦 Cart page rendering with items:", items.length)
  console.log("💰 Subtotal:", subtotal, "Delivery:", deliveryCharge, "Total:", totalPrice)

  // If cart is empty
  if (!items || items.length === 0) {
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
          marginBottom: '30px'
        }}
      >
        ← Continue Shopping
      </button>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          margin: 0,
          color: darkMode ? '#fff' : '#1f2937',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '36px' }}>🛒</span>
          Your Cart
        </h1>
        <span style={{
          fontSize: '14px',
          background: '#ef4444',
          color: 'white',
          padding: '6px 14px',
          borderRadius: '30px',
          fontWeight: '600'
        }}>
          {items.reduce((sum, item) => sum + item.quantity, 0)} items
        </span>
      </div>

      {/* Cart Items Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '30px'
      }}>
        {/* Left: Cart Items List */}
        <div style={{
          background: darkMode ? '#1f2937' : '#ffffff',
          borderRadius: '20px',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            background: darkMode ? '#111827' : '#fafafa'
          }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Cart Items ({items.length})</h3>
          </div>

          <div style={{ padding: '20px' }}>
            {items.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px 0',
                  borderBottom: index !== items.length - 1 ? `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` : 'none'
                }}
              >
                {/* Image */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: darkMode ? '#374151' : '#f3f4f6',
                  flexShrink: 0
                }}>
                  <img 
                    src={item.image || 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg'} 
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <div>
                      <h4 style={{
                        margin: 0,
                        fontSize: '16px',
                        fontWeight: '700',
                        color: darkMode ? '#fff' : '#1f2937'
                      }}>
                        {item.name}
                      </h4>
                      <p style={{
                        margin: '4px 0 0',
                        fontSize: '12px',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        👨‍🌾 {item.farmer} • {item.location?.split(',')[0] || 'Local'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        console.log("🗑️ Removing item:", item.id)
                        removeFromCart(item.id)
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '18px',
                        padding: '5px 10px',
                        borderRadius: '8px'
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  <p style={{
                    fontSize: '14px',
                    color: '#10b981',
                    fontWeight: '600',
                    marginBottom: '10px'
                  }}>
                    ₹{formatPrice(item.price)} / {item.unit}
                  </p>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={() => {
                        const newQty = item.quantity - 1
                        if (newQty >= 1) {
                          console.log("🔄 Decreasing quantity for:", item.id, "to", newQty)
                          updateQuantity(item.id, newQty)
                        } else {
                          console.log("🗑️ Removing item (quantity 0):", item.id)
                          removeFromCart(item.id)
                        }
                      }}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                        background: darkMode ? '#374151' : 'white',
                        color: darkMode ? '#fff' : '#1f2937',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        const newQty = item.quantity + 1
                        console.log("🔄 Increasing quantity for:", item.id, "to", newQty)
                        updateQuantity(item.id, newQty)
                      }}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                        background: darkMode ? '#374151' : 'white',
                        color: darkMode ? '#fff' : '#1f2937',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      +
                    </button>
                    <span style={{
                      marginLeft: 'auto',
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#10b981'
                    }}>
                      ₹{formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div style={{
          background: darkMode ? '#1f2937' : '#ffffff',
          borderRadius: '20px',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          padding: '24px',
          height: 'fit-content',
          position: 'sticky',
          top: '100px'
        }}>
          <h3 style={{
            margin: '0 0 20px',
            fontSize: '20px',
            fontWeight: '700',
            color: darkMode ? '#fff' : '#1f2937'
          }}>
            Order Summary
          </h3>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px',
            padding: '8px 0',
            color: darkMode ? '#9ca3af' : '#6b7280'
          }}>
            <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            <span>₹{formatPrice(subtotal)}</span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px',
            padding: '8px 0',
            color: darkMode ? '#9ca3af' : '#6b7280'
          }}>
            <span>Delivery Charges</span>
            <span style={{ 
              color: deliveryCharge === 0 ? '#10b981' : '#f59e0b',
              fontWeight: deliveryCharge === 0 ? '600' : 'normal'
            }}>
              {deliveryCharge === 0 ? 'FREE' : `₹${formatPrice(deliveryCharge)}`}
            </span>
          </div>

          {/* Free Delivery Progress Bar */}
          {subtotal < FREE_DELIVERY_THRESHOLD && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontSize: '12px',
                color: '#f59e0b',
                marginBottom: '6px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>Add ₹{formatPrice(amountForFreeDelivery)} more for FREE delivery</span>
                <span>{Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%</span>
              </div>
              <div style={{
                width: '100%',
                height: '6px',
                background: darkMode ? '#374151' : '#e5e7eb',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          )}

          {/* Free Delivery Badge when eligible */}
          {subtotal >= FREE_DELIVERY_THRESHOLD && (
            <div style={{
              marginBottom: '16px',
              padding: '8px',
              background: '#10b98120',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>
                🎉 You've unlocked FREE delivery!
              </span>
            </div>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            padding: '12px 0',
            borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            fontSize: '18px',
            fontWeight: '700',
            color: darkMode ? '#fff' : '#1f2937'
          }}>
            <span>Total</span>
            <span style={{ color: '#10b981' }}>₹{formatPrice(totalPrice)}</span>
          </div>

          <button
            onClick={() => {
              alert(`✅ Order placed successfully!\n\nOrder Summary:\nTotal Items: ${items.reduce((sum, item) => sum + item.quantity, 0)}\nSubtotal: ₹${formatPrice(subtotal)}\nDelivery Charges: ${deliveryCharge === 0 ? 'FREE' : `₹${formatPrice(deliveryCharge)}`}\nTotal Amount: ₹${formatPrice(totalPrice)}\n\nThank you for shopping with CropConnect!`)
              clearCart()
              onBackToHome()
            }}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #4CAF50, #45a049)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '12px',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
            }}
          >
            💳 Proceed to Buy Now
          </button>

          <button
            onClick={() => {
              clearCart()
            }}
            style={{
              width: '100%',
              padding: '12px',
              background: 'none',
              border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              color: darkMode ? '#fff' : '#1f2937',
              cursor: 'pointer'
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart