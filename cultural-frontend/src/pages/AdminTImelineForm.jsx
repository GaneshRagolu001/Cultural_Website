import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Save, X, Upload, History } from "lucide-react";

const AdminTimelineForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    yearRange: "",
    description: "",
    thumbnail: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      axiosClient
        .get(`/timeline/${id}`)
        .then((res) => setForm(res.data))
        .catch((e) => console.error(e));
    }
  }, [id]);

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", imageFile);
    try {
      const res = await axiosClient.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({ ...prev, thumbnail: res.data.url }));
      setImageFile(null);
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axiosClient.put(`/timeline/${id}`, form);
        alert("Epoch Updated");
      } else {
        await axiosClient.post(`/timeline`, form);
        alert("New Epoch Recorded");
      }
      navigate("/admin/timeline");
    } catch (err) {
      alert("Failed to save event");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-24 mb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-amber-800 rounded-2xl text-white">
          <History size={24} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          {id ? "Edit Chronology" : "Define New Epoch"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-12 gap-10"
      >
        {/* Left Side: Text Data */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">
              Event Title
            </label>
            <input
              className="w-full p-4 bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-800 outline-none transition-all"
              placeholder="e.g., The Gupta Golden Age"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">
              Time Period
            </label>
            <input
              className="w-full p-4 bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-800 outline-none transition-all"
              placeholder="e.g., 320 CE – 550 CE"
              value={form.yearRange}
              onChange={(e) => setForm({ ...form, yearRange: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">
              Historical Narrative
            </label>
            <textarea
              className="w-full p-4 bg-white border border-stone-200 rounded-2xl h-64 focus:ring-2 focus:ring-amber-800 outline-none transition-all"
              placeholder="Describe the significance of this era..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            ></textarea>
          </div>
        </div>

        {/* Right Side: Media */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-200">
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
              Epoch Thumbnail
            </label>

            <div className="relative aspect-video bg-white rounded-2xl overflow-hidden border border-stone-100 mb-4 group">
              {form.thumbnail ? (
                <img
                  src={form.thumbnail}
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-stone-300">
                  <Upload size={40} className="mb-2" />
                  <span className="text-[10px] font-bold uppercase">
                    No Visual Archive
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <input
                type="file"
                className="w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <button
                type="button"
                className="w-full py-3 bg-stone-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-stone-800 transition-colors"
                onClick={handleImageUpload}
                disabled={uploading || !imageFile}
              >
                {uploading ? "Uploading Image..." : "Confirm Media Upload"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-amber-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-900 transition-all shadow-xl shadow-amber-900/10"
            >
              <Save size={20} /> Save to Timeline
            </button>
            <button
              type="button"
              className="w-full py-4 border border-stone-200 text-stone-600 rounded-2xl font-bold hover:bg-stone-50 transition-colors"
              onClick={() => navigate(-1)}
            >
              Discard Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminTimelineForm;
