import { useState } from "react";

const ImageCarousel = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);

  if (!images.length) {
    return (
      <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">
      {/* Image */}
      <img
        src={images[current]}
        alt={`heritage-${current}`}
        className="w-full h-80 object-cover rounded shadow"
      />

      {/* Left Button */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
        >
          ‹
        </button>
      )}

      {/* Right Button */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
        >
          ›
        </button>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                current === index ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
