"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./preloader.css";

const Preloader = ({ onComplete }) => {
  const router = useRouter();
  const [stage, setStage] = useState("door"); // door, welcome, popup
  const [doorOpen, setDoorOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if user has already selected shop type in this session
    const hasVisited = sessionStorage.getItem("sobarbazar_visited");
    if (hasVisited) {
      onComplete && onComplete();
      return;
    }

    // Start door animation after a short delay
    const doorTimer = setTimeout(() => {
      setDoorOpen(true);
    }, 500);

    // Show welcome text after door opens
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
      setStage("welcome");
    }, 2000);

    return () => {
      clearTimeout(doorTimer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  const handleStartShopping = () => {
    setShowPopup(true);
    setStage("popup");
  };

  const handleShopSelect = (shopType) => {
    // Store the selection
    sessionStorage.setItem("sobarbazar_visited", "true");
    sessionStorage.setItem("sobarbazar_shop_type", shopType);
    localStorage.setItem("sobarbazar_shop_type", shopType);

    // Fade out and redirect
    setFadeOut(true);
    setTimeout(() => {
      onComplete && onComplete();

      // Redirect based on shop type
      if (shopType === "retail") {
        router.push("/?mode=retail");
      } else if (shopType === "wholesale") {
        router.push("/?mode=wholesale");
      }
    }, 500);
  };

  // If already visited, don't render
  if (typeof window !== "undefined" && sessionStorage.getItem("sobarbazar_visited")) {
    return null;
  }

  return (
    <div className={`preloader-container ${fadeOut ? "fade-out" : ""}`}>
      {/* Door Animation */}
      <div className={`door-container ${doorOpen ? "open" : ""}`}>
        {/* Left Door */}
        <div className="door door-left">
          <div className="door-pattern">
            <div className="door-panel"></div>
            <div className="door-panel"></div>
            <div className="door-handle"></div>
          </div>
          <div className="door-brand">
            <span>S</span>
            <span>O</span>
            <span>B</span>
            <span>A</span>
            <span>R</span>
          </div>
        </div>

        {/* Right Door */}
        <div className="door door-right">
          <div className="door-pattern">
            <div className="door-panel"></div>
            <div className="door-panel"></div>
            <div className="door-handle left"></div>
          </div>
          <div className="door-brand">
            <span>B</span>
            <span>A</span>
            <span>Z</span>
            <span>A</span>
            <span>R</span>
          </div>
        </div>

        {/* Door Frame */}
        <div className="door-frame">
          <div className="frame-top"></div>
          <div className="frame-left"></div>
          <div className="frame-right"></div>
        </div>
      </div>

      {/* Welcome Content */}
      <div className={`welcome-content ${showWelcome ? "show" : ""}`}>
        <div className="welcome-logo">
          <img src="/assets/images/logo/logo.png" alt="SobarBazarBD" className="logo-img" />
        </div>
        <h1 className="welcome-title">
          <span className="welcome-text">Welcome to</span>
          <span className="brand-name">SobarBazarBD</span>
        </h1>
        <p className="welcome-tagline">Your One-Stop Online Shopping Destination</p>

        <button
          className={`start-shopping-btn ${showWelcome ? "show" : ""}`}
          onClick={handleStartShopping}
        >
          <span className="btn-text">Start Shopping</span>
          <span className="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </button>
      </div>

      {/* Shop Selection Popup */}
      <div className={`shop-popup-overlay ${showPopup ? "show" : ""}`}>
        <div className={`shop-popup ${showPopup ? "show" : ""}`}>
          <div className="popup-header">
            <h2>Choose Your Shopping Experience</h2>
            <p>Select the type of shop that suits your needs</p>
          </div>

          <div className="popup-options">
            {/* Retail Shop Option */}
            <button
              className="shop-option retail"
              onClick={() => handleShopSelect("retail")}
            >
              <div className="option-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <div className="option-content">
                <h3>Retail Shop</h3>
                <p>Shop for personal use with competitive prices</p>
                <ul className="option-features">
                  <li>Individual purchases</li>
                  <li>Regular discounts</li>
                  <li>Easy returns</li>
                </ul>
              </div>
              <div className="option-arrow">
                <span className="enter-text">Enter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </button>

            {/* Wholesale Shop Option */}
            <button
              className="shop-option wholesale"
              onClick={() => handleShopSelect("wholesale")}
            >
              <div className="option-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <div className="option-content">
                <h3>Wholesale Shop</h3>
                <p>Bulk orders at wholesale prices for businesses</p>
                <ul className="option-features">
                  <li>Bulk discounts</li>
                  <li>Business pricing</li>
                  <li>Dedicated support</li>
                </ul>
              </div>
              <div className="option-arrow">
                <span className="enter-text">Enter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
