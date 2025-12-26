import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import ImageCarousel from "../components/ImageCarousel";
import HeritageCard from "../components/HeritageCard";
import { motion } from "framer-motion";
import { MapPin, Tag, Music, QrCode, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeritageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchItemAndRelated = async () => {
      try {
        const currentRes = await axiosClient.get(`/heritage/${id}`);
        const current = currentRes.data;
        setItem(current);

        const allRes = await axiosClient.get("/heritage");
        const relatedItems = allRes.data.filter(
          (h) =>
            h._id !== current._id &&
            (h.category === current.category || h.state === current.state)
        );
        setRelated(relatedItems.slice(0, 3));
      } catch (err) {
        console.error("Error loading heritage detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItemAndRelated();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDFCFB]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full"
        />
      </div>
    );
  if (!item) return <div className="p-20 text-center">Item not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FDFCFB] pt-24 pb-12 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <Link
          to="/heritage"
          className="flex items-center gap-2 text-amber-900 font-semibold mb-6 hover:translate-x-1 transition-transform"
        >
          <ArrowLeft size={20} /> Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif"
            >
              {item.title}
            </motion.h1>

            <div className="flex gap-3 mb-8">
              <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-sm font-bold uppercase tracking-wider">
                <MapPin size={14} /> {item.state}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 bg-stone-200 text-stone-700 rounded-lg text-sm font-bold uppercase tracking-wider">
                <Tag size={14} /> {item.category}
              </span>
            </div>

            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-3xl overflow-hidden shadow-2xl mb-10"
            >
              <ImageCarousel images={item.images} />
            </motion.div>

            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line font-light">
              {item.description}
            </p>
          </div>

          {/* Side Panels */}
          <div className="lg:col-span-4 space-y-6">
            {item.audioUrl && (
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-3xl shadow-lg border border-amber-100"
              >
                <h3 className="flex items-center gap-2 text-amber-900 font-bold mb-4">
                  <Music className="animate-pulse" /> Audio Storytelling
                </h3>
                <audio controls className="w-full">
                  <source src={item.audioUrl} type="audio/mpeg" />
                </audio>
              </motion.div>
            )}

            {item.qrCodeUrl && (
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-amber-900 p-8 rounded-3xl shadow-xl text-center text-white"
              >
                <QrCode className="mx-auto mb-3" size={32} />
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">
                  Verify Landmark
                </h3>
                <img
                  src={item.qrCodeUrl}
                  alt="QR Code"
                  className="w-32 h-32 mx-auto bg-white p-2 rounded-2xl"
                />
                <p className="mt-4 text-amber-200 text-xs">
                  Scan while at the location to unlock community badges.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Items */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 font-serif border-b pb-4 border-amber-100">
              Related Discoveries
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {related.map((item) => (
                <HeritageCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HeritageDetail;
