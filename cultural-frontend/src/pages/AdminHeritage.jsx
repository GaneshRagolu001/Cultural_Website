import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";

const AdminHeritage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch items properly (Hook at top level)

  // Runs only on mount
  const fetchItems = async () => {
    try {
      const res = await axiosClient.get("/heritage");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching heritage:", err);
    } finally {
      setLoading(false);
    }
  };

  // Effect only *starts* the fetch. No setState inside it.
  useEffect(() => {
    fetchItems(); // allowed — ESLint won't complain now
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (!confirm("Delete this heritage item?")) return;
    try {
      await axiosClient.delete(`/heritage/${id}`);
      setItems((prev) => prev.filter((it) => it._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Could not delete item.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Heritage Items</h1>
        <div className="flex gap-3">
          <Link
            to="/admin/heritage/new"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add New
          </Link>
          <button
            onClick={() => navigate("/admin")}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p>No heritage items yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((it) => (
            <div
              key={it._id}
              className="bg-white shadow rounded p-4 flex gap-4"
            >
              {/* Image */}
              <div className="w-28 h-20 bg-gray-100 shrink-0">
                {it.images?.[0] ? (
                  <img
                    src={it.images[0]}
                    alt={it.title}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="p-2 text-sm text-gray-500">No image</div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold">{it.title}</h3>
                <p className="text-sm text-gray-600">
                  {it.state} • {it.category}
                </p>

                <div className="mt-3 flex gap-2">
                  <Link
                    to={`/admin/heritage/edit/${it._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(it._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        const res = await axiosClient.get(`/qrcode/${it._id}`);
                        alert("QR generated: " + res.data.qrUrl);

                        // Re-fetch to reflect any new QR field
                        fetchItems();
                      } catch (err) {
                        console.error("QR error:", err);
                        alert("QR generation failed");
                      }
                    }}
                    className="px-3 py-1 bg-gray-200 rounded text-sm"
                  >
                    Generate QR
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

export default AdminHeritage;
