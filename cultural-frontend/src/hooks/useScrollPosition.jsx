import { useState, useEffect } from "react";

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      // Get the vertical scroll position
      setScrollPosition(window.scrollY);
    };

    // Add event listener on mount
    window.addEventListener("scroll", updatePosition);
    updatePosition(); // Set initial position

    // Clean-up function on unmount
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};
