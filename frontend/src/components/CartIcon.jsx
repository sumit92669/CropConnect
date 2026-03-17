import { useCart } from '../context/CartContext';

function CartIcon({ darkMode }) {
  const { getTotalItems, toggleCart } = useCart();
  const itemCount = getTotalItems();

  return (
    <button 
      onClick={toggleCart}
      className="cart-icon-btn"
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '40px',
        backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '16px',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      <span style={{ fontSize: '20px' }}>🛒</span>
      <span>Cart</span>
      {itemCount > 0 && (
        <span style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          backgroundColor: '#ef4444',
          color: 'white',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          {itemCount}
        </span>
      )}
    </button>
  );
}

export default CartIcon;  // ✅ YEH LINE IMPORTANT HAI!