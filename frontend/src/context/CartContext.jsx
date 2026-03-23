import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
        console.log("📦 Cart loaded from localStorage:", JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log("📦 Cart saved to localStorage:", cartItems);
  }, [cartItems]);

  // Check if item is in cart
  const isInCart = (cropId) => {
    const exists = cartItems.some(item => item.id === cropId);
    return exists;
  };

  // Add item to cart
  const addToCart = (crop, quantity = 1) => {
    console.log("🛒 addToCart called with:", crop.name, "quantity:", quantity);
    
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.id === crop.id);
      
      if (existingItem) {
        console.log("📦 Updating existing item:", crop.name, "old quantity:", existingItem.quantity);
        // Update quantity if exists
        return prevItems.map(item =>
          item.id === crop.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        console.log("📦 Adding NEW item:", crop.name);
        // Add new item
        return [...prevItems, {
          id: crop.id,
          name: crop.name,
          price: crop.price,
          unit: crop.unit || 'quintal',
          farmer: crop.farmer,
          image: crop.image,
          quantity: quantity,
          maxQuantity: crop.quantity
        }];
      }
    });
    
    alert(`✅ ${crop.name} added to cart!`);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    console.log("🗑️ removeFromCart called for itemId:", itemId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    console.log("🔄 updateQuantity called for itemId:", itemId, "new quantity:", newQuantity);
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    console.log("🧹 clearCart called");
    setCartItems([]);
  };

  // Get total items count
  const getTotalItems = () => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log("📊 getTotalItems:", total);
    return total;
  };

  // Get total price
  const getTotalPrice = () => {
    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    return total;
  };

  // Toggle cart drawer
  const toggleCart = () => {
    console.log("🚪 toggleCart called, current isCartOpen:", isCartOpen);
    setIsCartOpen(prev => !prev);
  };

  const value = {
    cartItems,
    isCartOpen,
    isInCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    toggleCart,
    setIsCartOpen
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};