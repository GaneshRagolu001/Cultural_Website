import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthUser } from "../context/AuthContext.jsx";
import ImageSlideshow from "../components/ImageSlideshow";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { login } = AuthUser();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#1A191E] overflow-hidden">
      <div className="relative w-1/2 h-full hidden md:block">
        <ImageSlideshow />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white text-5xl font-serif font-bold text-center px-10"
          >
            Preserving the Past, <br />{" "}
            <span className="text-amber-500">Inspiring the Future.</span>
          </motion.h1>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 mb-8">
            Sign in to your CulturaSphere account
          </p>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm mb-6 border border-red-500/20"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="relative border-b-2 border-gray-700 focus-within:border-amber-500 transition-colors">
              <input
                name="email"
                type="email"
                required
                className="w-full bg-transparent py-3 text-white outline-none peer placeholder-transparent"
                placeholder="Email"
                onChange={handleChange}
              />
              <label className="absolute left-0 -top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-amber-500">
                Email Address
              </label>
            </div>

            <div className="relative border-b-2 border-gray-700 focus-within:border-amber-500 transition-colors">
              <input
                name="password"
                type="password"
                required
                className="w-full bg-transparent py-3 text-white outline-none peer placeholder-transparent"
                placeholder="Password"
                onChange={handleChange}
              />
              <label className="absolute left-0 -top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-amber-500">
                Password
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-amber-900/40"
              type="submit"
            >
              Enter the Sphere
            </motion.button>
          </form>

          <p className="text-gray-500 text-center mt-8">
            New here?{" "}
            <Link to="/register" className="text-amber-500 hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
