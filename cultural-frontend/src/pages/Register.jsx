import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import ImageSlideshow from "../components/ImageSlideshow";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axiosClient.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#37353E]">
      {/* Left Half - Slideshow */}
      <div className="relative w-1/2 h-full hidden md:block rounded-3xl">
        <ImageSlideshow />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-3xl">
          <h1 className="text-white text-4xl font-bold drop-shadow-lg">
            Welcome to CulturaSphere
          </h1>
        </div>
      </div>

      {/* Right Half - Register Box */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md  rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-300 mb-2">
            Create an Account
          </h1>
          <p className="text-gray-300 mb-6">Join the heritage community</p>

          {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full border-b-2 border-gray-300 p-3 text-gray-200  focus:ring-2 focus:ring-gray-600 focus:outline-none"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border-b-2 border-gray-300 p-3 text-gray-200  focus:ring-2 focus:ring-gray-600 focus:outline-none"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border-b-2 border-gray-300 p-3 text-gray-200  focus:ring-2 focus:ring-gray-600 focus:outline-none"
              onChange={handleChange}
            />

            <button
              className="w-full bg-gray-600 hover:bg-gray-700 transition text-white p-3 rounded-lg font-semibold shadow-md"
              type="submit"
            >
              Register
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-5 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-gray-300 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
