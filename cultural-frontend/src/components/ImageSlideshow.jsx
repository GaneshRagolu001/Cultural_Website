import React, { useEffect, useState } from "react";
import { IMAGES } from "../assets/data.js";

function ImageSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-3xl">
      <img
        src={IMAGES[index].src}
        alt="slideshow"
        className="h-screen w-screen object-cover rounded-3xl"
      />
    </div>
  );
}

export default ImageSlideshow;
