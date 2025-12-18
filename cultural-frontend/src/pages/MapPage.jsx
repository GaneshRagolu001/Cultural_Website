import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import statesData from "../data/indiaStates.json";
import { useState } from "react";
import axiosClient from "../api/axiosClient";
import HeritageCard from "../components/HeritageCard";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const MapPage = () => {
  const [selectedState, setSelectedState] = useState("");
  const [heritageList, setHeritageList] = useState([]);

  const fetchHeritageByState = async (stateName) => {
    try {
      const all = await axiosClient.get("/heritage");
      const filtered = all.data.filter((item) =>
        item.state.toLowerCase().includes(stateName.toLowerCase())
      );
      setHeritageList(filtered);
    } catch (err) {
      console.error("Error fetching heritage:", err);
    }
  };

  const highlightState = (e) => {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      color: "#1d4ed8",
      fillOpacity: 0.4,
    });
  };

  const resetHighlight = (e) => {
    e.target.setStyle({
      weight: 1,
      color: "#555",
      fillOpacity: 0.2,
    });
  };

  const onStateClick = (e) => {
    const stateName = e.target.feature.properties.NAME_1;

    setSelectedState(stateName);
    fetchHeritageByState(stateName);
  };

  const stateStyle = {
    fillColor: "#3b82f6",
    fillOpacity: 0.2,
    color: "#555",
    weight: 1,
  };

  const onEachState = (state, layer) => {
    const stateName = state.properties.NAME_1;

    layer.bindTooltip(stateName, { sticky: true });

    layer.on({
      mouseover: highlightState,
      mouseout: resetHighlight,
      click: onStateClick,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-4">Explore India by Map</h1>

      {/* Map */}
      <div className="h-[500px] w-full mb-6 rounded overflow-hidden shadow relative z-0">
        <MapContainer
          center={[22.5, 80]}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <GeoJSON
            data={statesData}
            style={stateStyle}
            onEachFeature={onEachState}
          />
        </MapContainer>
      </div>

      {/* Selected State Info */}
      {selectedState && (
        <div className="mb-4 text-xl">
          Showing heritage in <span className="font-bold">{selectedState}</span>
        </div>
      )}

      {/* Heritage Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {heritageList.length > 0
          ? heritageList.map((item) => (
              <HeritageCard key={item._id} item={item} />
            ))
          : selectedState && <p>No heritage items found for this state.</p>}
      </div>
    </div>
  );
};

export default MapPage;
