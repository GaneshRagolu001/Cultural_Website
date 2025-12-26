import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, MapPin, ArrowUpRight, BookOpen } from "lucide-react";

const StoryCard = ({ story }) => {
  const preview =
    story.content.length > 110
      ? story.content.slice(0, 110) + "..."
      : story.content;

  return (
    <motion.div whileHover={{ y: -8 }} className="group h-full">
      <Link to={`/stories/${story._id}`}>
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 flex flex-col h-full">
          {/* Image Container */}
          <div className="relative h-56 overflow-hidden">
            {story.imageUrl ? (
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center space-y-2">
                <BookOpen className="text-stone-300" size={40} />
                <span className="text-stone-400 text-xs font-bold uppercase tracking-widest">
                  No Visual Archive
                </span>
              </div>
            )}

            {/* Category/State Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-md text-amber-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1 shadow-sm">
                <MapPin size={10} /> {story.state || "India"}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-serif text-2xl font-bold text-stone-800 leading-tight group-hover:text-amber-800 transition-colors">
                {story.title}
              </h2>
              <div className="bg-stone-50 p-2 rounded-full text-stone-400 group-hover:bg-amber-800 group-hover:text-white transition-all">
                <ArrowUpRight size={16} />
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-4 text-[11px] font-bold text-stone-400 uppercase tracking-widest">
              <div className="flex items-center gap-1">
                <User size={12} className="text-amber-700" />
                {story.userId?.username ||
                  story.userId?.name ||
                  "Anonymous Witness"}
              </div>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed font-light italic flex-1">
              "{preview}"
            </p>

            <div className="mt-6 pt-4 border-t border-stone-50 flex items-center justify-between">
              <span className="text-amber-800 text-xs font-bold underline underline-offset-4">
                Read Full Account
              </span>
              <span className="text-[10px] text-stone-300 font-mono">
                {new Date(story.createdAt).toLocaleDateString("en-IN", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoryCard;
