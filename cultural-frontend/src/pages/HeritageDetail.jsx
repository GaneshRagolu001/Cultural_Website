import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const HeritageDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axiosClient.get(`/heritage/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching heritage item:", err);
      }
      setLoading(false);
    };
    fetchItem();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!item) return <div className="p-4">Item not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>

      {item.images?.length > 0 ? (
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-80 object-cover rounded shadow mb-6"
        />
      ) : (
        <div className="w-full h-80 bg-gray-200 flex items-center justify-center mb-6 rounded">
          <p className="text-gray-500">No image available</p>
        </div>
      )}

      <div className="mb-6">
        <p>
          <strong>State:</strong> {item.state}
        </p>
        <p>
          <strong>Category:</strong> {item.category}
        </p>
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>

      {item.audioUrl && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Audio Story</h2>
          <audio controls className="w-full">
            <source src={item.audioUrl} type="audio/mpeg" />
          </audio>
        </div>
      )}

      {item.qrCodeUrl && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">QR Code</h2>
          <img src={item.qrCodeUrl} alt="QR Code" className="w-40 h-40" />
        </div>
      )}
    </div>
  );
};

export default HeritageDetail;
