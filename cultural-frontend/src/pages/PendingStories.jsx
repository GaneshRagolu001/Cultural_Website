import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Check, X, User, MessageCircle, Volume2 } from "lucide-react";

const PendingStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get("/stories/pending").then((res) => {
      setStories(res.data);
      setLoading(false);
    });
  }, []);


  const handleAction = async (id, action) => {
    try {
      await axiosClient.put(`/stories/${action}/${id}`);
      setStories((prev) => prev.filter((s) => s._id !== id));
    } catch {
      alert(`Error ${action}ing story`);
    }
  };

  if (loading)
    return <div className="p-20 text-center">Loading submissions...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20">
      <h1 className="text-3xl font-serif font-bold mb-10 flex items-center gap-4">
        Review Submissions{" "}
        <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">
          {stories.length}
        </span>
      </h1>

      <div className="space-y-8">
        {stories.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-stone-100">
            <MessageCircle size={48} className="mx-auto text-stone-200 mb-4" />
            <p className="text-stone-400">The queue is currently clear.</p>
          </div>
        ) : (
          stories.map((story) => (
            <div
              key={story._id}
              className="bg-white rounded-[2rem] border border-stone-100 p-8 shadow-sm flex flex-col md:flex-row gap-8"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800">{story.title}</h3>
                    <p className="text-xs text-stone-400">
                      {story.userId?.name || "Anonymous Contributor"} •{" "}
                      {story.state}
                    </p>
                  </div>
                </div>

                <p className="text-stone-600 text-sm leading-relaxed mb-6 italic">
                  "{story.content}"
                </p>

                {story.audioUrl && (
                  <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl mb-6">
                    <Volume2 size={20} className="text-amber-700" />
                    <audio controls className="h-8">
                      <source src={story.audioUrl} type="audio/mpeg" />
                    </audio>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => handleAction(story._id, "approve")}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-green-700"
                  >
                    <Check size={18} /> Approve to Public
                  </button>
                  <button
                    onClick={() => handleAction(story._id, "reject")}
                    className="px-6 border border-stone-200 py-3 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-red-50 hover:text-red-600"
                  >
                    <X size={18} /> Reject
                  </button>
                </div>
              </div>

              {story.imageUrl && (
                <img
                  src={story.imageUrl}
                  className="w-full md:w-64 h-48 object-cover rounded-[1.5rem]"
                  alt="Submission"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PendingStories;
