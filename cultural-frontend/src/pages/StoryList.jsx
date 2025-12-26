import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import StoryCard from "../components/StoryCard";
import { Link } from "react-router-dom";
import { AuthUser } from "../context/AuthContext";
import { motion } from "framer-motion";
import { PlusCircle, BookOpen } from "lucide-react";

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = AuthUser();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axiosClient.get("/stories/approved");
        setStories(res.data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 font-serif flex items-center gap-3">
              <BookOpen className="text-amber-800" /> Community Chronicles
            </h1>
            <p className="text-gray-600 mt-2">Shared memories and local legends from every corner of India.</p>
          </div>

          {user && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/stories/submit" className="flex items-center gap-2 bg-amber-800 text-white px-6 py-3 rounded-2xl shadow-xl font-bold">
                <PlusCircle size={20} /> Share Your Story
              </Link>
            </motion.div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800" />
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
             <p className="text-xl text-gray-400">The library is currently empty. Be the first author!</p>
          </div>
        ) : (
          <motion.div 
            initial="hidden" animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {stories.map((story) => (
              <motion.div key={story._id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                <StoryCard story={story} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StoryList;