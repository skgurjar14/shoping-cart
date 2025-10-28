import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { authUser, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
      {/* Logo / Title */}
      <Link to="/" className="font-bold text-xl hover:text-yellow-300 transition">
        🛒 MyCart
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-5 items-center">
        <li>
          <Link to="/" className="hover:text-yellow-300 transition">
            Products
          </Link>
        </li>

        <li>
          <Link to="/cart" className="hover:text-yellow-300 transition">
            Cart
          </Link>
        </li>

        {!authUser ? (
          <>
            <li>
              <Link to="/login" className="hover:text-yellow-300 transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-yellow-300 transition">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-yellow-300 font-semibold">
              Hi, {authUser.name.split(" ")[0]}
            </li>
            <li>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
