import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { productsData } from "../data/productData";

const ProductList = () => {
  // CartContext se addToCart function lo
  const { addToCart } = useContext(CartContext);

  if (!addToCart) {
    console.error("CartContext not found! Make sure CartProvider wraps your app.");
    return <h2 className="text-center mt-10 text-red-500">⚠️ Cart not initialized</h2>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productsData.map((product) => {
        // Offer ke baad ka price calculate
        const discountedPrice = product.price - (product.price * product.offer) / 100;

        return (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center text-center transition hover:shadow-2xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-cover rounded-xl"
            />

            <h2 className="font-bold text-lg mt-2">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.description}</p>

            <p className="mt-2">
              <span className="text-gray-500 line-through">₹{product.price}</span>{" "}
              <span className="text-green-600 font-bold">₹{discountedPrice}</span>
            </p>

            <p className="text-blue-600">Offer: {product.offer}% off</p>

            <button onClick={() => addToCart(product)} className="bg-blue-600 text-white px-4 py-2 mt-3 rounded-xl hover:bg-blue-700 transition" style={{cursor:"pointer"}} >Add to Cart  </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
