import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const PendingStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axiosClient.get("/stories/pending");
        setStories(res.data);
      } catch (err) {
        console.error("Error fetching pending stories:", err);
      }
      setLoading(false);
    };
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axiosClient.put(`/stories/approve/${id}`);
      setStories((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error approving story:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosClient.put(`/stories/reject/${id}`);
      setStories((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error rejecting story:", err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Pending Stories</h1>

      {stories.length === 0 ? (
        <p>No pending stories.</p>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white rounded shadow p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="font-semibold text-lg">{story.title}</h2>
                  <div className="text-xs text-gray-500 mb-1">
                    {story.state} •{" "}
                    {story.userId?.name
                      ? `By ${story.userId.name} (${story.userId.email})`
                      : "Unknown user"}
                  </div>
                </div>

                {story.imageUrl && (
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-32 h-24 object-cover rounded"
                  />
                )}
              </div>

              <p className="text-sm text-gray-700 whitespace-pre-line">
                {story.content}
              </p>

              {story.audioUrl && (
                <audio controls className="mt-2">
                  <source src={story.audioUrl} type="audio/mpeg" />
                </audio>
              )}

              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleApprove(story._id)}
                  className="px-3 py-1 rounded bg-green-600 text-white text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(story._id)}
                  className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingStories;
