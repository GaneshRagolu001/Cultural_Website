import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  History,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import axiosClient from "../api/axiosClient.js";
import TimelineCard from "../components/TimelineCard.jsx";
import Model from "../components/Model.jsx";

const Timeline = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const res = await axiosClient.get("/timeline");
        setEvents(res.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    modalRef.current.open();
  };

  if (loading)
    return <div className="p-20 text-center">Loading History...</div>;

  return (
    <div className="min-h-screen bg-[#FDFCFB] mt-16">
      {/* Header */}
      <div className="bg-amber-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-serif font-bold mb-4">
            The Great Timeline
          </h1>
          <p className="text-amber-100 max-w-xl">
            Explore the epochs of Indian heritage.
          </p>
        </div>
      </div>

      {/* Horizontal Scroller */}
      <div className="py-16 overflow-x-auto scrollbar-hide px-6">
        <div className="flex gap-8 min-w-max">
          {events.map((ev, index) => (
            <div
              key={ev._id}
              onClick={() => handleOpen(ev)}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <TimelineCard event={ev} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* MODAL SYSTEM */}
      <Model ref={modalRef} onClose={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <div className="flex flex-col md:flex-row h-full max-h-[85vh] justify-center">
            {/* Left: Image (Fixed in modal) */}
            <div className="md:w-1/2 h-64 md:h-full relative overflow-hidden">
              <img
                src={selectedEvent.thumbnail}
                className="w-full h-full object-cover"
                alt={selectedEvent.title}
              />
            </div>

            {/* Right: Content (Scrollable) */}
            <div className="md:w-1/2 flex flex-col bg-white overflow-hidden">
              <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar h-full">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-6 border border-amber-100 uppercase tracking-widest">
                  {selectedEvent.yearRange}
                </div>

                <h2 className="text-4xl font-serif font-bold text-stone-900 mb-8 leading-tight">
                  {selectedEvent.title}
                </h2>

                <div className="prose prose-stone">
                  <p className="text-stone-600 text-lg leading-relaxed first-letter:text-6xl first-letter:font-serif first-letter:text-amber-900 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Additional Stats to test scrolling */}
                <div className="mt-10 pt-10 border-t border-stone-100 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-stone-50 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-stone-400">
                      Main Focus
                    </p>
                    <p className="text-sm font-semibold">
                      Territorial Expansion
                    </p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-stone-400">
                      Era Type
                    </p>
                    <p className="text-sm font-semibold">Classical Antiquity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Model>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d6d3d1;
          border-radius: 10px;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Timeline;
