import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import HeritageCard from "../components/HeritageCard";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Filter, Layers } from "lucide-react";

const HeritageList = () => {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearch(q);
  }, [searchParams]);

  useEffect(() => {
    const fetchHeritage = async () => {
      try {
        const res = await axiosClient.get("/heritage");
        // DEBUG: Check what your API actually returns
        console.log("API Response:", res.data);

        // If your data is wrapped in an object like { heritages: [] },
        // change this to res.data.heritages
        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching heritage:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeritage();
  }, []);

  useEffect(() => {
    let result = [...items]; // Use a spread to ensure we work with a fresh copy

    if (search) {
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((item) => item.category === category);
    }

    if (stateFilter) {
      result = result.filter((item) =>
        item.state?.toLowerCase().includes(stateFilter.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, category, stateFilter, items]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#fdfbf7]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-amber-800 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 font-serif">
            Explore <span className="text-amber-800">Heritage</span>
          </h1>
          <p className="text-gray-600 italic">
            Discover the timeless wonders and traditions of India.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12 bg-white p-4 rounded-2xl shadow-sm border border-amber-100"
        >
          <div className="relative md:col-span-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search heritage or description..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-amber-500 transition-all outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative md:col-span-3">
            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <select
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-amber-500 appearance-none outline-none transition-all"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="monument">Monument</option>
              <option value="festival">Festival</option>
              <option value="art">Art</option>
              <option value="food">Food</option>
            </select>
          </div>

          <div className="relative md:col-span-4">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Filter by state..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-amber-500 transition-all outline-none"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Results */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200"
              >
                <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-500">
                  No heritage items match your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("");
                    setStateFilter("");
                  }}
                  className="mt-4 text-amber-800 font-semibold underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              >
                {filtered.map((item) => (
                  <motion.div
                    key={item._id || item.id} // Safety fallback for keys
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HeritageCard item={item} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HeritageList;
