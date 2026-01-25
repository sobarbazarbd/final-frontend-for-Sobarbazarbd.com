"use client";
import React, { useState, useEffect } from "react";
import Preloader from "./Preloader";

const PreloaderWrapper = ({ children }) => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if user has already completed the preloader in this session
    const hasVisited = sessionStorage.getItem("sobarbazar_visited");
    if (hasVisited) {
      setShowPreloader(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  // Don't render anything on server side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div style={{ visibility: "hidden" }}>
        {children}
      </div>
    );
  }

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div
        style={{
          opacity: showPreloader ? 0 : 1,
          visibility: showPreloader ? "hidden" : "visible",
          transition: "opacity 0.3s ease",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PreloaderWrapper;
