import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Upload, X, Save, Image as ImageIcon } from "lucide-react";

const AdminHeritageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    state: "",
    category: "monument",
    description: "",
    images: [],
    audioUrl: "",
  });

  useEffect(() => {
    if (id) {
      axiosClient.get(`/heritage/${id}`).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await axiosClient.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({ ...prev, images: [...prev.images, res.data.url] }));
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      id
        ? await axiosClient.put(`/heritage/${id}`, form)
        : await axiosClient.post("/heritage", form);
      navigate("/admin/heritage");
    } catch (err) {
      alert("Save failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-24 mb-20">
      <h1 className="text-3xl font-serif font-bold mb-8">
        {id ? "Refine" : "Create"} Heritage Entry
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-4">
          <input
            className="w-full p-4 bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
            placeholder="Site Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input
            className="w-full p-4 bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
            placeholder="State / Region"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            required
          />

          <select
            className="w-full p-4 bg-white border border-stone-200 rounded-2xl outline-none"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="monument">Monument</option>
            <option value="festival">Festival</option>
            <option value="art">Art</option>
            <option value="food">Food</option>
          </select>

          <textarea
            className="w-full p-4 bg-white border border-stone-200 rounded-2xl h-48 outline-none"
            placeholder="Full historical description..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
        </div>

        <div className="space-y-6">
          <div className="bg-stone-100 p-8 rounded-[2rem] border-2 border-dashed border-stone-200 text-center relative">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <Upload className="mx-auto text-stone-400 mb-2" />
            <p className="text-sm font-bold text-stone-500">
              {uploading ? "Uploading..." : "Click to upload gallery image"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {form.images.map((img, i) => (
              <div key={i} className="relative group h-20">
                <img
                  src={img}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((p) => ({
                      ...p,
                      images: p.images.filter((_, idx) => idx !== i),
                    }))
                  }
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>

          <input
            className="w-full p-4 bg-white border border-stone-200 rounded-2xl outline-none"
            placeholder="Audio Recording URL"
            value={form.audioUrl}
            onChange={(e) => setForm({ ...form, audioUrl: e.target.value })}
          />

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-stone-900 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-800 transition-all shadow-xl"
            >
              <Save size={20} /> Commit Changes
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-4 border border-stone-200 rounded-2xl font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminHeritageForm;
