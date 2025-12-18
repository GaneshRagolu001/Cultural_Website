const StoryCard = ({ story }) => {
  const preview =
    story.content.length > 120
      ? story.content.slice(0, 120) + "..."
      : story.content;

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col h-full">
      {story.imageUrl ? (
        <img
          src={story.imageUrl}
          alt={story.title}
          className="w-full h-40 object-cover rounded mb-3"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded mb-3 flex items-center justify-center">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}

      <h2 className="font-semibold text-lg mb-1">{story.title}</h2>

      <div className="text-xs text-gray-500 mb-2">
        {story.state} •{" "}
        {story.userId?.name ? `By ${story.userId.name}` : "Anonymous"}
      </div>

      <p className="text-sm text-gray-700 flex-1">{preview}</p>
    </div>
  );
};

export default StoryCard;
