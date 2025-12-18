import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const AdminHeritageForm = () => {
  const { id } = useParams(); // undefined for new
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    state: "",
    category: "monument",
    description: "",
    images: [], // urls
    audioUrl: "",
    timelineEventId: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      axiosClient
        .get(`/heritage/${id}`)
        .then((res) => setForm(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const uploadFile = async (file) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await axiosClient.post("/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setUploading(false);
    return res.data.url;
  };

  const handleAddImage = async () => {
    if (!imageFile) return alert("Select image first");
    try {
      const url = await uploadFile(imageFile);
      setForm((prev) => ({ ...prev, images: [...(prev.images || []), url] }));
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      if (id) {
        await axiosClient.put(`/heritage/${id}`, form);
        alert("Updated");
      } else {
        await axiosClient.post("/heritage", form);
        console.log("success");
        alert("Created");
      }
      navigate("/admin/heritage");
    } catch (err) {
      console.error(err);
      alert("Save failed: " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit" : "Add"} Heritage
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
          required
        />
        <select
          className="w-full p-2 border rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="monument">Monument</option>
          <option value="festival">Festival</option>
          <option value="art">Art</option>
          <option value="food">Food</option>
        </select>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={6}
        ></textarea>

        <div>
          <label className="block mb-1">Add image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className=" bg-gray-400 rounded-2xl p-2 w-sm"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="ml-2 px-3 py-1 bg-blue-600 text-white rounded"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload & Add"}
          </button>
        </div>

        <div>
          <p className="text-sm text-gray-600">Current images:</p>
          <div className="flex gap-2 mt-2">
            {(form.images || []).map((u, idx) => (
              <div key={idx} className="relative">
                <img
                  src={u}
                  className="w-24 h-16 object-cover rounded"
                  alt=""
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      images: prev.images.filter((x, i) => i !== idx),
                    }))
                  }
                  className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        <input
          className="w-full p-2 border rounded"
          placeholder="Audio URL (optional)"
          value={form.audioUrl}
          onChange={(e) => setForm({ ...form, audioUrl: e.target.value })}
        />

        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            type="submit"
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 border rounded"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHeritageForm;
