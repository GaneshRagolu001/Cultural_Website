import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const AdminTimelineForm = () => {
  const { id } = useParams(); // undefined for new
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    yearRange: "",
    description: "",
    thumbnail: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      axiosClient
        .get(`/timeline/${id}`)
        .then((res) => setForm(res.data))
        .catch((e) => console.error(e));
    }
  }, [id]);

  const uploadImage = async () => {
    if (!imageFile) return;
    setUploading(true);

    const fd = new FormData();
    fd.append("file", imageFile);

    const res = await axiosClient.post("/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setForm((prev) => ({ ...prev, thumbnail: res.data.url }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axiosClient.put(`/timeline/${id}`, form);
        alert("Updated");
      } else {
        await axiosClient.post(`/timeline`, form);
        alert("Created");
      }
      navigate("/admin/timeline");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Timeline Event" : "Add Timeline Event"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Year Range e.g. '320 CE – 550 CE'"
          className="w-full border p-2 rounded"
          value={form.yearRange}
          onChange={(e) => setForm({ ...form, yearRange: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded h-40"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>

        <div>
          <label className="block mb-2">Thumbnail Image</label>

          {form.thumbnail && (
            <img
              src={form.thumbnail}
              className="w-32 h-24 object-cover rounded mb-2"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <button
            type="button"
            className="ml-2 px-3 py-1 bg-blue-600 text-white rounded"
            onClick={uploadImage}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Save
        </button>
        <button
          type="button"
          className="px-4 py-2 border rounded ml-2"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AdminTimelineForm;
