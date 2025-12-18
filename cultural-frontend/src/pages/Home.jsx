import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";
import HeritageCard from "../components/HeritageCard.jsx";
import StoryCard from "../components/StoryCard.jsx";
import {
  BookLock,
  BookOpenCheck,
  History,
  Telescope,
  TentTree,
} from "lucide-react";

function Home() {
  const [heritage, setHeritage] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchHeritage = async () => {
      try {
        const res = await axiosClient.get("/heritage");
        setHeritage(res.data.slice(0, 3));
      } catch (err) {
        console.error("Error loading heritage:", err);
      }
    };

    const fetchStories = async () => {
      try {
        const res = await axiosClient.get("/stories/approved");
        setStories(res.data.slice(0, 3));
      } catch (err) {
        console.error("Error loading stories:", err);
      }
    };

    fetchHeritage();
    fetchStories();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop className="w-full h-full object-cover">
            <source src="https://res.cloudinary.com/dfwyuhvpf/video/upload/v1765105450/v1_c7qyaw.mp4" />
          </video>

          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-20 h-full flex flex-col items-start justify-center text-white px-4 md:px-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide max-w-xl md:max-w-[50vw] leading-tight mb-4">
            Travel Through Stories Not Just Places
          </h1>

          <p className="text-md sm:text-lg md:text-xl max-w-lg md:max-w-[45vw] leading-relaxed">
            India is a country dotted with stunning wildlife diversity and rich
            traditions. Discover monuments, festivals, stories, and traditions
            that shaped the soul of India.
          </p>

          <div className="flex flex-col mt-6 gap-4 w-full max-w-lg">
            <input
              type="text"
              placeholder="Search heritage, festivals, stories..."
              className="w-full p-3 text-white bg-white/40 rounded-xl placeholder-white/80 focus:outline-none"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-md hover:scale-105 transition">
                Explore Heritage
              </button>

              <button className="px-6 py-3 border-2 text-white border-white font-semibold rounded-md hover:scale-105 transition">
                Scan QR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK LINKS */}
      <section className="max-w-full p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#EAE1D5]">
        <Link
          to="/heritage"
          className="p-6 rounded-xl flex items-center justify-start bg-white hover:shadow-md transition"
        >
          <Telescope className="w-12 h-12 text-amber-900" />
          <div className="ml-3">
            <h2 className="text-xl font-bold">Heritage Explorer</h2>
            <p className="text-gray-600 text-sm mt-1">
              Discover monuments, art, and traditions.
            </p>
          </div>
        </Link>

        <Link
          to="/timeline"
          className="p-6 rounded-xl flex items-center justify-start bg-white hover:shadow-md transition"
        >
          <History className="w-12 h-12 text-amber-900" />
          <div className="ml-3">
            <h2 className="text-xl font-bold">Cultural Timeline</h2>
            <p className="text-gray-600 text-sm mt-1">
              Explore India’s past through time.
            </p>
          </div>
        </Link>

        <Link
          to="/stories"
          className="p-6 rounded-xl flex items-center justify-start bg-white hover:shadow-md transition"
        >
          <BookOpenCheck className="w-12 h-12 text-amber-900" />
          <div className="ml-3">
            <h2 className="text-xl font-bold">Community Stories</h2>
            <p className="text-gray-600 text-sm mt-1">
              Read and share real cultural stories.
            </p>
          </div>
        </Link>
      </section>

      {/* FEATURED HERITAGE */}
      <section className="max-w-7xl mx-auto p-6 mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <img
              src="pyramid.png"
              alt="hill"
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
            <h2 className="text-3xl font-bold">Featured Heritage</h2>
          </div>

          <Link
            to="/heritage"
            className="text-amber-800 border-2 border-amber-800 py-2 px-4 rounded-3xl hover:bg-amber-800 hover:text-white transition"
          >
            View All Heritages →
          </Link>
        </div>

        {heritage.length === 0 ? (
          <div className="flex flex-col items-center text-amber-900 mt-10">
            <TentTree className="w-20 h-20" />
            <p className="text-2xl font-semibold mt-3">
              No heritage items yet...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {heritage.map((item) => (
              <HeritageCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* STORIES SECTION */}
      <section className="max-w-full p-6 bg-[#EAE1D5] mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 md:px-17">
          <div className="flex items-center gap-4">
            <img
              src="biography.png"
              alt="hill"
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
            <h2 className="text-3xl font-bold">Community Stories</h2>
          </div>

          <Link
            to="/stories"
            className="text-amber-800 border-2 border-amber-800 py-2 px-4 rounded-3xl hover:bg-amber-800 hover:text-white transition"
          >
            View All Stories →
          </Link>
        </div>

        {stories.length === 0 ? (
          <div className="flex flex-col items-center text-amber-900 mt-10 md:px-17">
            <BookLock className="w-20 h-20" />
            <p className="text-2xl font-semibold mt-3">
              No stories available...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:px-17">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
