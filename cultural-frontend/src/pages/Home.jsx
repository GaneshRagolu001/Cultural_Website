import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // 1. Import Framer Motion
import HeritageCard from "../components/HeritageCard.jsx";
import StoryCard from "../components/StoryCard.jsx";
import {
  BookLock,
  BookOpenCheck,
  History,
  Telescope,
  TentTree,
} from "lucide-react";

// 2. Define reusable animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function Home() {
  const [heritage, setHeritage] = useState([]);
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="bg-[#fdfbf7]">
      {/* HERO SECTION */}
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop className="w-full h-full object-cover">
            <source src="https://res.cloudinary.com/dfwyuhvpf/video/upload/v1765105450/v1_c7qyaw.mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-20 h-full flex flex-col items-start justify-center text-white px-4 md:px-12"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide max-w-xl md:max-w-[50vw] leading-tight mb-4"
          >
            Travel Through Stories Not Just Places
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-md sm:text-lg md:text-xl max-w-lg md:max-w-[45vw] leading-relaxed"
          >
            India is a country dotted with stunning wildlife diversity and rich
            traditions. Discover monuments, festivals, stories, and traditions
            that shaped the soul of India.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col mt-6 gap-4 w-full max-w-lg"
          >
            <input
              type="text"
              placeholder="Search heritage, festivals, stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 text-white bg-white/20 backdrop-blur-md border border-white/30 rounded-xl placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  navigate(
                    searchQuery.trim()
                      ? `/heritage?search=${encodeURIComponent(searchQuery)}`
                      : "/heritage"
                  )
                }
                className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-md shadow-lg"
              >
                Explore Heritage
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 text-white border-white font-semibold rounded-md"
              >
                Scan QR
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* QUICK LINKS - Staggered Slide In */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="max-w-full p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#EAE1D5]"
      >
        {[
          {
            to: "/heritage",
            icon: Telescope,
            title: "Heritage Explorer",
            desc: "Discover monuments, art, and traditions.",
          },
          {
            to: "/timeline",
            icon: History,
            title: "Cultural Timeline",
            desc: "Explore India’s past through time.",
          },
          {
            to: "/stories",
            icon: BookOpenCheck,
            title: "Community Stories",
            desc: "Read and share real cultural stories.",
          },
        ].map((link, idx) => (
          <motion.div key={idx} variants={fadeInUp}>
            <Link
              to={link.to}
              className="p-6 rounded-xl flex items-center justify-start bg-white hover:shadow-xl transition-shadow group"
            >
              <link.icon className="w-12 h-12 text-amber-900 group-hover:rotate-12 transition-transform" />
              <div className="ml-4">
                <h2 className="text-xl font-bold">{link.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{link.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      {/* FEATURED HERITAGE - Scroll Reveal */}
      <section className="max-w-7xl mx-auto p-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10"
        >
          <div className="flex items-center gap-4">
            <motion.img
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              src="pyramid.png"
              alt="hill"
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
            <h2 className="text-3xl font-bold italic">Featured Heritage</h2>
          </div>
          <Link
            to="/heritage"
            className="text-amber-800 border-2 border-amber-800 py-2 px-6 rounded-3xl hover:bg-amber-800 hover:text-white transition-all duration-300"
          >
            View All Heritages →
          </Link>
        </motion.div>

        {heritage.length === 0 ? (
          <div className="flex flex-col items-center text-amber-900 mt-10">
            <TentTree className="w-20 h-20" />
            <p className="text-2xl font-semibold mt-3">
              No heritage items yet...
            </p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {heritage.map((item) => (
              <motion.div
                key={item._id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <HeritageCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* STORIES SECTION - Horizontal Reveal */}
      <section className="max-w-full p-6 bg-[#EAE1D5] mt-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10"
          >
            <div className="flex items-center gap-4">
              <img
                src="biography.png"
                alt="hill"
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
              <h2 className="text-3xl font-bold italic">Community Stories</h2>
            </div>
            <Link
              to="/stories"
              className="text-amber-800 border-2 border-amber-800 py-2 px-6 rounded-3xl hover:bg-amber-800 hover:text-white transition-all duration-300"
            >
              View All Stories →
            </Link>
          </motion.div>

          {stories.length === 0 ? (
            <div className="flex flex-col items-center text-amber-900 mt-10">
              <BookLock className="w-20 h-20" />
              <p className="text-2xl font-semibold mt-3">
                No stories available...
              </p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {stories.map((story) => (
                <motion.div
                  key={story._id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <StoryCard story={story} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
