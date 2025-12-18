import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import HeritageCard from "../components/HeritageCard";

const HeritageList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeritage = async () => {
      try {
        const res = await axiosClient.get("/heritage");
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching heritage:", err);
      }
      setLoading(false);
    };

    fetchHeritage();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">Heritage Explorer</h1>

      {items.length === 0 ? (
        <p>No heritage items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <HeritageCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeritageList;
