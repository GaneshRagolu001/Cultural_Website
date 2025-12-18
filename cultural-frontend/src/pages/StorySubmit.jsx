import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const StorySubmit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [state, setState] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // upload file to Cloudinary
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosClient.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(res.data);

    return res.data.url; // return Cloudinary URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      let imageUrl = "";
      let audioUrl = "";

      // Upload image if selected
      if (imageFile) {
        imageUrl = await uploadFile(imageFile);
      }

      // Upload audio if selected
      if (audioFile) {
        audioUrl = await uploadFile(audioFile);
      }

      // Submit story
      await axiosClient.post("/stories", {
        title,
        content,
        state,
        imageUrl,
        audioUrl,
      });

      setMessage("Story submitted! Waiting for admin approval.");

      // Redirect after 1 sec
      setTimeout(() => navigate("/stories"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("Error submitting story.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-6">Share Your Cultural Story</h1>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          placeholder="Write your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded h-40"
          required
        ></textarea>

        <input
          type="text"
          placeholder="State (e.g., Telangana)"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />

        <div>
          <label className="block mb-1 text-gray-600">
            Upload Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">
            Upload Audio (optional)
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded font-semibold"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default StorySubmit;
