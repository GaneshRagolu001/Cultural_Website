import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import statesData from "../data/indiaStates.json";
import { useState } from "react";
import axiosClient from "../api/axiosClient";
import HeritageCard from "../components/HeritageCard";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TentTree, Globe, Search, Info } from "lucide-react";

const MapPage = () => {
  const [selectedState, setSelectedState] = useState("");
  const [heritageList, setHeritageList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHeritageByState = async (stateName) => {
    setLoading(true);
    try {
      const all = await axiosClient.get("/heritage");
      const filtered = all.data.filter((item) =>
        item.state.toLowerCase().includes(stateName.toLowerCase())
      );
      setHeritageList(filtered);
    } catch (err) {
      console.error("Error fetching heritage:", err);
    } finally {
      setLoading(false);
    }
  };

  const stateStyle = {
    fillColor: "#92400e",
    fillOpacity: 0.1,
    color: "#78350f",
    weight: 1.5,
  };

  const highlightState = (e) => {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      color: "#451a03",
      fillOpacity: 0.5,
      fillColor: "#d97706",
    });
    layer.bringToFront();
  };

  const resetHighlight = (e) => {
    e.target.setStyle(stateStyle);
  };

  const onStateClick = (e) => {
    const stateName = e.target.feature.properties.NAME_1;
    setSelectedState(stateName);
    fetchHeritageByState(stateName);
  };

  const onEachState = (state, layer) => {
    layer.on({
      mouseover: highlightState,
      mouseout: resetHighlight,
      click: onStateClick,
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-20">
      {/* Dynamic Header */}
      <div className="bg-[#1A191E] text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Atlas of India
            </h1>
            <p className="text-gray-400 max-w-md">
              Interact with the map to uncover the specific cultural identity of
              each region.
            </p>
          </motion.div>
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex items-center gap-4">
            <div className="p-3 bg-amber-600 rounded-2xl shadow-lg shadow-amber-600/20">
              <Globe className="text-white" size={28} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Live Explorer
              </p>
              <p className="font-bold text-lg">42+ UNESCO Sites Mapped</p>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto p-6 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Map Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-8 bg-white p-3 rounded-[2.5rem] shadow-2xl border border-stone-100 h-[650px] relative z-0"
          >
            <div className="h-full w-full rounded-[2rem] overflow-hidden">
              <MapContainer
                center={[22.5, 82]}
                zoom={5}
                scrollWheelZoom={false}
                className="h-full w-full outline-none"
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <GeoJSON
                  data={statesData}
                  style={stateStyle}
                  onEachFeature={onEachState}
                />
              </MapContainer>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <AnimatePresence mode="wait">
              {!selectedState ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-amber-50 p-10 rounded-[2.5rem] border border-amber-100 text-center h-full flex flex-col justify-center items-center"
                >
                  <MapPin
                    size={48}
                    className="text-amber-300 mb-4 animate-bounce"
                  />
                  <h2 className="text-xl font-bold text-amber-900 mb-2">
                    Select a Region
                  </h2>
                  <p className="text-amber-800/60 text-sm">
                    Click any state on the map to load archived heritage sites
                    and local artifacts.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="selected"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-stone-100"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-amber-800 p-4 rounded-2xl text-white">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                        Region Identified
                      </p>
                      <h2 className="text-3xl font-black text-stone-900">
                        {selectedState}
                      </h2>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-stone-50 rounded-2xl flex justify-between">
                      <span className="text-stone-500">Discoveries found:</span>
                      <span className="font-bold text-amber-900">
                        {heritageList.length}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed italic border-l-2 border-amber-200 pl-4">
                      Explore the architectural marvels and intangible
                      traditions unique to {selectedState}.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-linear-to-br from-stone-800 to-stone-900 p-8 rounded-[2.5rem] text-white shadow-xl ">
              <div className="flex items-center gap-2 mb-4 text-amber-400">
                <Info size={18} />
                <span className="text-xs uppercase font-bold tracking-tighter">
                  Pro Tip
                </span>
              </div>
              <p className="text-sm font-light text-stone-300 ">
                Zoom in to see more detail or use the search bar above to jump
                to a specific city.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Results Grid */}
        <div className="mt-20">
          <AnimatePresence>
            {selectedState && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-6 mb-12">
                  <h2 className="text-3xl font-serif font-bold text-stone-800">
                    Archive for {selectedState}
                  </h2>
                  <div className="h-px flex-grow bg-stone-200"></div>
                </div>

                {loading ? (
                  <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-amber-800 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : heritageList.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {heritageList.map((item) => (
                      <HeritageCard key={item._id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-stone-200">
                    <TentTree
                      size={64}
                      className="mx-auto text-stone-200 mb-6"
                    />
                    <p className="text-xl font-bold text-stone-400">
                      No sites cataloged for this region yet.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style jsx global>{`
        .custom-tooltip {
          background: white !important;
          border: 2px solid #92400e !important;
          border-radius: 12px !important;
          padding: 10px 15px !important;
          font-weight: bold;
        }
        .leaflet-container {
          font-family: "Inter", sans-serif;
          filter: grayscale(20%) contrast(110%);
        }
      `}</style>
    </div>
  );
};

export default MapPage;
