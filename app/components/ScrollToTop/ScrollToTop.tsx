"use client";
import React, { useEffect, useState } from "react";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () =>
      window.pageYOffset > 500 ? setIsVisible(true) : setIsVisible(false);

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const goToTopHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return isVisible ? (
    <div className="scroll-top" onClick={goToTopHandler}>
      <span>Up</span>
    </div>
  ) : null;
};
