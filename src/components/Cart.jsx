import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useContext(CartContext);

  // Agar cart empty ho
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-700">🛒 Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2">Add some products to see them here!</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛍️ Your Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item) => {
          const discountedPrice = item.price - (item.price * item.offer) / 100;
          const totalItemPrice = discountedPrice * item.quantity;

          return (
            <div key={item.id} className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-2xl transition">
              <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />

              <h2 className="font-bold text-lg mt-2">{item.name}</h2>
              <p className="text-gray-600 text-sm">{item.description}</p>

              <p className="mt-2">
                <span className="text-green-600 font-semibold">₹{discountedPrice}</span>{" "}
                <span className="text-gray-500 text-sm line-through">₹{item.price}</span>
              </p>

              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"> 
                  −  </button>
                <span className="px-2 font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <p className="mt-2 font-semibold text-gray-700">
                Subtotal: ₹{totalItemPrice.toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 mt-3 rounded-xl hover:bg-red-600" style={{ cursor: "pointer" }} > Remove</button>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">
          🧾 Total Price: <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
        </h2>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl mt-4 hover:bg-blue-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
