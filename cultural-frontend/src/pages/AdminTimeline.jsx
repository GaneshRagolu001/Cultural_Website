import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, ArrowLeft, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const AdminTimeline = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosClient.get("/timeline");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching timeline:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this historical event?")) return;
    try {
      await axiosClient.delete(`/timeline/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert("Could not delete. Please try again.");
    }
  };

  if (loading) return <div className="p-20 text-center font-serif italic">Loading Chronicles...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <button onClick={() => navigate("/admin")} className="flex items-center gap-2 text-stone-400 text-sm mb-2 hover:text-amber-800 transition-colors">
            <ArrowLeft size={16} /> Admin Command
          </button>
          <h1 className="text-3xl font-serif font-bold text-stone-900">Timeline Management</h1>
        </div>
        <Link to="/admin/timeline/new" className="bg-amber-800 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-amber-900 transition-shadow shadow-lg shadow-amber-900/20">
          <Plus size={20} /> Add Epoch
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.length === 0 ? (
          <div className="col-span-2 py-20 bg-stone-50 rounded-[2rem] border-2 border-dashed border-stone-200 text-center">
            <Calendar size={48} className="mx-auto text-stone-300 mb-4" />
            <p className="text-stone-500">No events found in the timeline yet.</p>
          </div>
        ) : (
          events.map((ev) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={ev._id} 
              className="bg-white p-5 rounded-[2rem] border border-stone-100 shadow-sm flex gap-5 group hover:shadow-md transition-all"
            >
              <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden bg-stone-100">
                {ev.thumbnail ? (
                  <img src={ev.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" alt={ev.title} />
                ) : (
                  <div className="flex items-center justify-center h-full text-stone-300"><Calendar size={32} /></div>
                )}
              </div>

              <div className="flex flex-col justify-between py-1">
                <div>
                  <h2 className="font-bold text-stone-800 text-lg leading-tight mb-1">{ev.title}</h2>
                  <span className="text-xs font-black uppercase tracking-widest text-amber-700">{ev.yearRange}</span>
                </div>

                <div className="flex gap-2">
                  <Link to={`/admin/timeline/edit/${ev._id}`} className="p-2.5 bg-stone-50 text-stone-600 rounded-xl hover:bg-amber-50 hover:text-amber-800 transition-colors">
                    <Edit2 size={18} />
                  </Link>
                  <button onClick={() => handleDelete(ev._id)} className="p-2.5 bg-stone-50 text-stone-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTimeline;