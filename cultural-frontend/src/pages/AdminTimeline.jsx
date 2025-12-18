import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";

const AdminTimeline = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosClient.get("/timeline");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching timeline:", err);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this timeline event?")) return;
    try {
      await axiosClient.delete(`/timeline/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert("Could not delete", err.message);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Timeline Events</h1>
        <Link
          to="/admin/timeline/new"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add New
        </Link>
      </div>

      {events.length === 0 ? (
        <p>No timeline events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev) => (
            <div
              key={ev._id}
              className="bg-white p-4 shadow rounded flex gap-4"
            >
              <div className="w-32 h-24 bg-gray-200">
                {ev.thumbnail ? (
                  <img
                    src={ev.thumbnail}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="flex justify-center items-center h-full text-gray-500 text-sm">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{ev.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{ev.yearRange}</p>

                <div className="flex gap-2 mt-2">
                  <Link
                    to={`/admin/timeline/edit/${ev._id}`}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(ev._id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTimeline;
