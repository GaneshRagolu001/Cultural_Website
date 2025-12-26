import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import ImageSlideshow from "../components/ImageSlideshow";
import { User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await axiosClient.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "An archive error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#1A191E] overflow-hidden mt-20">
      {/* Left Half - Slideshow */}
      <div className="relative w-1/2 h-full hidden lg:block p-4">
        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
          <ImageSlideshow />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A191E] via-black/20 to-transparent flex flex-col justify-end p-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-white text-5xl font-serif font-bold mb-4 italic">
                CulturaSphere
              </h1>
              <p className="text-stone-300 text-lg max-w-md font-light leading-relaxed">
                Join our collective mission to document, preserve, and celebrate
                the timeless traditions of the Indian subcontinent.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Half - Register Box */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="mb-10"
          >
            <div className="bg-amber-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-amber-500" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">
              Begin Your Journey
            </h1>
            <p className="text-stone-500 font-medium">
              Create a curator account to contribute.
            </p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <User
                className="absolute left-0 top-3 text-stone-600 group-focus-within:text-amber-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full bg-transparent border-b border-stone-800 py-3 pl-8 text-white focus:border-amber-500 focus:outline-none transition-all placeholder:text-stone-700"
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative group">
              <Mail
                className="absolute left-0 top-3 text-stone-600 group-focus-within:text-amber-500 transition-colors"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-stone-800 py-3 pl-8 text-white focus:border-amber-500 focus:outline-none transition-all placeholder:text-stone-700"
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative group">
              <Lock
                className="absolute left-0 top-3 text-stone-600 group-focus-within:text-amber-500 transition-colors"
                size={20}
              />
              <input
                type="password"
                name="password"
                placeholder="Secret Password"
                className="w-full bg-transparent border-b border-stone-800 py-3 pl-8 text-white focus:border-amber-500 focus:outline-none transition-all placeholder:text-stone-700"
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="w-full bg-white hover:bg-amber-500 hover:text-white transition-all text-black py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 group"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Syncing..." : "Initialize Membership"}
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </button>
          </form>

          <p className="text-stone-600 text-sm mt-8 text-center">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-amber-500 hover:text-amber-400 font-bold underline underline-offset-4"
            >
              Log in to Archive
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
