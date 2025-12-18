import { Link } from "react-router-dom";
import { ArrowRightCircle, MapPin } from "lucide-react";

const HeritageCard = ({ item }) => {
  return (
    <Link
      to={`/heritage/${item._id}`}
      className="block group relative rounded-xl overflow-hidden shadow-md"
    >
      {item.images && item.images.length > 0 ? (
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-[380px] bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600">No Image</span>
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-black/70"></div>

      <div className="absolute top-4 right-4 flex items-center gap-2 text-white text-sm font-medium">
        <MapPin className="text-lg" />
        {item.state || "Unknown Location"}
      </div>

      <div className="absolute bottom-6 left-6 right-6 text-white">
        <p className="text-sm opacity-90">{item.category || "Category"}</p>

        <h2 className="text-2xl font-serif font-semibold leading-snug mt-1">
          {item.title}
        </h2>
      </div>

      <div className="absolute bottom-6 right-6">
        <div className="w-10 h-10 rounded-full  flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition">
          <ArrowRightCircle />
        </div>
      </div>
    </Link>
  );
};

export default HeritageCard;
