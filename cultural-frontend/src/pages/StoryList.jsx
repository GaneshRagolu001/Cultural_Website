import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import StoryCard from "../components/StoryCard";
import { Link } from "react-router-dom";
import { AuthUser } from "../context/AuthContext";

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = AuthUser();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axiosClient.get("/stories/approved");
        setStories(res.data);
      } catch (err) {
        console.error("Error fetching stories:", err);
      }
      setLoading(false);
    };
    fetchStories();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Cultural Stories</h1>

        {user && (
          <Link
            to="/stories/submit"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            Share Your Story
          </Link>
        )}
      </div>

      {stories.length === 0 ? (
        <p>No stories yet. Be the first to share!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryList;
