const TimelineCard = ({ event }) => {
  return (
    <div className="relative w-[25vw] min-h-[60vh] bg-white rounded-lg shadow overflow-hidden mr-6 shrink-0">
      {/* Thumbnail */}
      {event.thumbnail && (
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70"></div>

      {/* Text on top of image */}
      <div className="absolute bottom-4 left-4 right-4 text-white z-10">
        <h2 className="font-bold text-xl mb-1">{event.title}</h2>

        {event.yearRange && (
          <p className="text-sm opacity-90 mb-2">{event.yearRange}</p>
        )}

        <p className="text-sm opacity-80">
          {event.description.length > 100
            ? event.description.slice(0, 100) + "..."
            : event.description}
        </p>
      </div>
    </div>
  );
};

export default TimelineCard;
