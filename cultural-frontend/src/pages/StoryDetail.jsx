import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  MapPin,
  Calendar,
  Quote,
  Volume2,
} from "lucide-react";

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get(`/stories/storydetail/${id}`)
      .then((res) => setStory(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDFCFB]">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-amber-800 font-serif italic text-xl"
        >
          Opening the archives...
        </motion.div>
      </div>
    );
  }

  if (!story) return <div className="p-20 text-center">Story not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FDFCFB] pb-20"
    >
      {/* Header Image / Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-stone-900">
        {story.imageUrl ? (
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Quote size={80} className="text-white/10" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white font-bold mb-6 hover:gap-4 transition-all"
            >
              <ArrowLeft size={20} /> Back to Chronicles
            </button>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4"
            >
              {story.title}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sidebar Meta */}
          <div className="md:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-amber-800 mb-6 border-b pb-2">
                Contributor Info
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-stone-100 rounded-lg">
                    <User size={18} className="text-stone-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 font-bold">
                      Narrated By
                    </p>
                    <p className="font-bold text-stone-800">
                      {story.userId?.username ||
                        story.userId?.name ||
                        "Anonymous"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-stone-100 rounded-lg">
                    <MapPin size={18} className="text-stone-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 font-bold">
                      Origin
                    </p>
                    <p className="font-bold text-stone-800">{story.state}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-stone-100 rounded-lg">
                    <Calendar size={18} className="text-stone-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 font-bold">
                      Published
                    </p>
                    <p className="font-bold text-stone-800">
                      {new Date(story.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {story.audioUrl && (
              <div className="bg-amber-900 p-6 rounded-3xl shadow-xl text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Volume2 size={20} className="animate-pulse" />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    Oral Tradition
                  </span>
                </div>
                <audio controls className="w-full custom-audio-player">
                  <source src={story.audioUrl} type="audio/mpeg" />
                </audio>
                <p className="mt-3 text-[10px] text-amber-200/60 leading-tight">
                  Listen to the narrator's own voice as they recount this
                  history.
                </p>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="md:col-span-8">
            <div className="prose prose-stone prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg font-light first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-amber-900">
                {story.content}
              </p>
            </div>

            {/* Decorative End */}
            <div className="mt-12 flex justify-center">
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-amber-200" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-audio-player::-webkit-media-controls-enclosure {
          background-color: #fef3c7;
          border-radius: 12px;
        }
      `}</style>
    </motion.div>
  );
};

export default StoryDetail;
