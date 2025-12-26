import { MapPin } from "lucide-react";

const TimelineCard = ({ event, index }) => {
  // We use event.yearRange directly since your data already provides the formatted string
  const displayYear = event.yearRange || "Unknown Era";

  return (
    <div className="relative shrink-0 w-80 sm:w-96 mt-10 snap-center">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-100/50">
        {/* Image / Thumbnail */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={
              event.thumbnail ||
              "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800"
            }
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for better text contrast */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

          {/* Year Badge - Using the yearRange field from your data */}
          <div className="absolute top-4 right-4 bg-amber-800 text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg border border-amber-600/30">
            {displayYear}
          </div>

          {/* Category Badge - Optional, based on your schema */}
          {event.category && (
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
              {event.category}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
            {event.title}
          </h3>

          {/* Location - Renders if present in the data */}
          {event.location && (
            <div className="flex items-center gap-2 text-amber-800 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                {event.location}
              </span>
            </div>
          )}

          {/* Description - Clamped to 3 lines for visual consistency */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {event.description}
          </p>
        </div>
      </div>

      {/* Timeline Connector Line (Visible on Desktop) */}
      <div className="hidden md:block absolute top-24 -right-8 w-16 h-0.5 bg-amber-200 shadow-sm"></div>
    </div>
  );
};

export default TimelineCard;
