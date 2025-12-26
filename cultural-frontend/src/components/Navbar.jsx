import React, { useState } from "react";
import { AuthUser } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, User } from "lucide-react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { user, logout } = AuthUser();
  const location = useLocation();
  const [hamburger, setHamburger] = useState(false);
  const scrollPosition = useScrollPosition();

  const isScrolled = scrollPosition > 50;
  const isHomePage = location.pathname === "/";

  // Dynamic Styles based on scroll and page
  const navClasses = `
    flex justify-between items-center px-8 h-20 fixed top-0 w-full z-[100]
    transition-all duration-500 ease-in-out
    ${
      !isHomePage || isScrolled
        ? "bg-white/80 backdrop-blur-md border-b border-stone-200 py-4 text-stone-900 shadow-sm"
        : "bg-transparent py-6 text-white"
    }
  `;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Heritage", path: "/heritage" },
    { name: "Map", path: "/map" },
    { name: "Timeline", path: "/timeline" },
    { name: "Stories", path: "/stories" },
  ];

  return (
    <nav className={navClasses}>
      {/* Brand Identity */}
      <Link to="/" className="flex items-center gap-2 group">
        <div
          className={`p-1.5 rounded-lg transition-colors ${
            isScrolled || !isHomePage ? "bg-amber-600" : "bg-white/20"
          }`}
        >
          <Globe
            size={24}
            className={isScrolled || !isHomePage ? "text-white" : "text-white"}
          />
        </div>
        <span className="font-serif text-xl font-bold tracking-tight">
          Cultura
          <span
            className={
              isScrolled || !isHomePage ? "text-amber-600" : "text-amber-400"
            }
          >
            Sphere
          </span>
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`px-4 py-2 text-sm font-medium transition-all relative group`}
          >
            {link.name}
            <span
              className={`absolute bottom-0 left-4 right-4 h-0.5 bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                location.pathname === link.path ? "scale-x-100" : ""
              }`}
            />
          </Link>
        ))}

        <div className="h-6 w-px bg-stone-300 mx-2" />

        {user ? (
          <div className="flex items-center gap-4 ml-2">
            {user.role === "ADMIN" && (
              <Link
                to="/admin"
                className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={logout}
              className={`text-sm font-bold px-5 py-2 rounded-full border transition-all ${
                isScrolled || !isHomePage
                  ? "border-stone-900 hover:bg-stone-900 hover:text-white"
                  : "border-white hover:bg-white hover:text-stone-900"
              }`}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 ml-2">
            <Link
              to="/login"
              className="text-sm font-bold px-4 hover:opacity-70 transition-opacity"
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`text-sm font-bold px-6 py-2 rounded-full transition-all shadow-md ${
                isScrolled || !isHomePage
                  ? "bg-amber-600 text-white hover:bg-amber-700"
                  : "bg-white text-stone-900 hover:bg-amber-400"
              }`}
            >
              Join
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-stone-100/10 transition-colors"
        onClick={() => setHamburger(!hamburger)}
      >
        {hamburger ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {hamburger && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-stone-900 text-white z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-2xl font-bold">Menu</span>
              <X size={32} onClick={() => setHamburger(false)} />
            </div>

            <div className="flex flex-col gap-6 text-3xl font-serif">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setHamburger(false)}
                  className={
                    location.pathname === link.path
                      ? "text-amber-500"
                      : "text-white"
                  }
                >
                  {link.name}
                </Link>
              ))}
              {user?.role === "ADMIN" && (
                <Link
                  to="/admin"
                  onClick={() => setHamburger(false)}
                  className="text-amber-500 border-t border-white/10 pt-6"
                >
                  Admin Panel
                </Link>
              )}
            </div>

            <div className="mt-auto flex flex-col gap-4">
              {user ? (
                <button
                  onClick={logout}
                  className="w-full py-4 bg-white text-stone-900 rounded-2xl font-bold text-xl"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setHamburger(false)}
                    className="w-full py-4 border border-white rounded-2xl text-center font-bold text-xl"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setHamburger(false)}
                    className="w-full py-4 bg-amber-600 text-white rounded-2xl text-center font-bold text-xl"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
