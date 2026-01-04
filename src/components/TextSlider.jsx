import React from "react";
import Marquee from "react-fast-marquee";

const TextSlider = () => {
  return (
    <div className='text-slider-section overflow-hidden bg-neutral-600 py-8'>
      <div className='text-slider d-flex align-items-center gap-2'>
        <Marquee
          speed={120}
          pauseOnHover={true}
          className='Marquee_text-slider'
        >
          {[
            "T-Shirt Offer",
            "Best Selling Offer",
            "Limited Offer Sales",
            "Spring Collection",
            "Hot Deal Products",
            "Our Services",
          ].map((item, index) => (
            <div
              key={index}
              className='d-flex flex-nowrap flex-shrink-0 align-items-center gap-2 mx-4'
            >
              <span className='flex-shrink-0'>
                <img
                  src='assets/images/icon/star-color.png'
                  alt='icon'
                  style={{ width: "16px", height: "16px" }}
                />
              </span>

              {/* Smaller text */}
              <p className='text-white m-0 fw-semibold' style={{ fontSize: "14px" }}>
                {item}
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default TextSlider;
