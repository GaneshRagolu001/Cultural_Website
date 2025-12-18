import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import TimelineCard from "../components/TimelineCard";

const Timeline = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const res = await axiosClient.get("/timeline");

        // SORT EVENTS BY DATE (ascending)
        const sorted = [...res.data].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setEvents(sorted);
      } catch (err) {
        console.error("Error fetching timeline:", err);
      }
      setLoading(false);
    };

    fetchTimeline();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">Cultural Timeline</h1>

      {events.length === 0 ? (
        <p>No timeline events found.</p>
      ) : (
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {events.map((ev) => (
            <TimelineCard key={ev._id} event={ev} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;
