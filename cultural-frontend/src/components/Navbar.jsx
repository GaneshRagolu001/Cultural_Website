import React, { useState } from "react";
import { AuthUser } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useScrollPosition } from "../hooks/useScrollPosition";

function Navbar() {
  const { user, logout } = AuthUser();
  const location = useLocation();
  const [hamburger, setHamburger] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 80;
  const navClasses = `
    flex justify-between items-center px-6 h-20 fixed top-0 w-full z-50
    transition-all duration-300 ease-in-out
    ${
      location.pathname !== "/" || isScrolled
        ? "bg-[#EFE9E3]/95 shadow-lg text-black"
        : "bg-transparent text-white"
    }
  `;

  return (
    <nav className={navClasses}>
      {/* Logo */}
      <div className="size-50 flex items-center">
        <img
          src="cultural_logo.png"
          alt="logo"
          className="h-full object-contain"
        />
      </div>

      {/* Links */}
      <div
        className={`
          md:flex md:static absolute top-20 right-0 w-full md:w-auto
          transition-all duration-300
          ${
            hamburger
              ? "flex flex-col gap-5 bg-[#44444E]/95 p-4"
              : "hidden md:flex"
          }
        `}
      >
        <Link
          className={`mx-4 p-2 hover:border-b-2 ${
            location.pathname === "/" && "border-b-2"
          }`}
          to="/"
        >
          Home
        </Link>
        <Link
          className={`mx-4 p-2 hover:border-b-2 ${
            location.pathname === "/heritage" && "border-b-2"
          }`}
          to="/heritage"
        >
          Heritage
        </Link>
        <Link
          className={`mx-4 p-2 hover:border-b-2 ${
            location.pathname === "/map" && "border-b-2"
          }`}
          to="/map"
        >
          Map
        </Link>
        <Link
          className={`mx-4 p-2 hover:border-b-2 ${
            location.pathname === "/timeline" && "border-b-2"
          }`}
          to="/timeline"
        >
          Timeline
        </Link>
        <Link
          className={`mx-4 p-2 hover:border-b-2 ${
            location.pathname === "/stories" && "border-b-2"
          }`}
          to="/stories"
        >
          Stories
        </Link>

        {user ? (
          <>
            {user.role === "ADMIN" && (
              <Link
                className={`mx-4 p-2 hover:border-b-2 ${
                  location.pathname === "/admin" && "border-b-2"
                }`}
                to="/admin"
              >
                Admin
              </Link>
            )}
            <button
              onClick={logout}
              className="mx-4 p-2 md:border md:border-gray-400 md:px-4 md:py-2 md:rounded-md hover:scale-110"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="mx-4 p-2 md:border md:border-gray-400 md:px-4 md:py-2 md:rounded-md hover:scale-110"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="mx-4 p-2 md:border md:border-gray-400 md:px-4 md:py-2 md:rounded-md hover:scale-110"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <Menu
        className="md:hidden cursor-pointer"
        onClick={() => setHamburger(!hamburger)}
      />
    </nav>
  );
}

export default Navbar;
