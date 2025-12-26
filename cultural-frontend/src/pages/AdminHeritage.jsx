import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Trash2, Edit3, QrCode, ArrowLeft } from "lucide-react";

const AdminHeritage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await axiosClient.get("/heritage");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this heritage item?")) return;
    try {
      await axiosClient.delete(`/heritage/${id}`);
      setItems((prev) => prev.filter((it) => it._id !== id));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Authenticating Archive...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 text-stone-400 text-sm mb-2 hover:text-amber-800"
          >
            <ArrowLeft size={16} /> Dashboard
          </button>
          <h1 className="text-3xl font-serif font-bold">Heritage Archive</h1>
        </div>
        <Link
          to="/admin/heritage/new"
          className="bg-stone-900 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-amber-800 transition-colors shadow-lg shadow-stone-200"
        >
          <Plus size={20} /> Add New Entry
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((it) => (
          <div
            key={it._id}
            className="bg-white border border-stone-100 rounded-[1.5rem] p-4 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-shadow"
          >
            <img
              src={it.images?.[0] || "/placeholder.jpg"}
              className="w-full md:w-32 h-24 object-cover rounded-xl bg-stone-100"
            />

            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                {it.category}
              </span>
              <h3 className="text-lg font-bold text-stone-800">{it.title}</h3>
              <p className="text-sm text-stone-400">{it.state}</p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/admin/heritage/edit/${it._id}`}
                className="p-3 bg-stone-50 text-stone-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Edit3 size={18} />
              </Link>
              <button
                onClick={() => handleDelete(it._id)}
                className="p-3 bg-stone-50 text-stone-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={async () => {
                  try {
                    const res = await axiosClient.get(`/qrcode/${it._id}`);
                    window.open(res.data.qrUrl, "_blank");
                  } catch {
                    alert("QR Generation Failed");
                  }
                }}
                className="flex items-center gap-2 px-4 py-3 bg-amber-50 text-amber-800 rounded-xl font-bold text-xs uppercase tracking-tighter hover:bg-amber-100"
              >
                <QrCode size={16} /> QR
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHeritage;
