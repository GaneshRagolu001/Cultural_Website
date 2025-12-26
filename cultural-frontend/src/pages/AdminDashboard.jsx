import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Map, Clock, ShieldCheck, ChevronRight } from "lucide-react";

const AdminDashboard = () => {
  const cards = [
    {
      title: "Pending Stories",
      desc: "Review and moderate user-submitted cultural accounts.",
      path: "/admin/pending-stories",
      icon: <FileText className="text-amber-600" />,
      color: "bg-amber-50"
    },
    {
      title: "Heritage Management",
      desc: "Maintain the core archive of monuments and traditions.",
      path: "/admin/heritage",
      icon: <Map className="text-stone-600" />,
      color: "bg-stone-50"
    },
    {
      title: "Timeline Events",
      desc: "Curate the chronological journey of Indian history.",
      path: "/admin/timeline",
      icon: <Clock className="text-blue-600" />,
      color: "bg-blue-50"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <ShieldCheck className="text-amber-800" size={32} />
          <h1 className="text-4xl font-serif font-bold text-stone-900">Admin Command</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div key={i} whileHover={{ y: -5 }}>
              <Link to={card.path} className="group block h-full bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all">
                <div className={`${card.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                  {card.icon}
                </div>
                <h2 className="text-xl font-bold text-stone-800 mb-2">{card.title}</h2>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">{card.desc}</p>
                <div className="flex items-center text-xs font-black uppercase tracking-widest text-amber-800 group-hover:gap-2 transition-all">
                  Manage Now <ChevronRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;