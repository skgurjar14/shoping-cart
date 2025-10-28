import React, { createContext, useState } from "react";

// Create a Context
export const CartContext = createContext();

// Create a Provider component
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.price - (item.price * item.offer) / 100),
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Default export (important for App.jsx import)
export default CartProvider;
