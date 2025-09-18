"use client";
import React from "react";
import Link from "next/link";
import Slider from "react-slick";

// Configuration object for feature items
const featureConfig = {
  items: [
    {
      id: 1,
      title: "Vegetables",
      image: "assets/images/thumbs/feature-img1.png",
      productCount: "125+ Products",
      link: "/shop"
    },
    {
      id: 2,
      title: "Fish & Meats",
      image: "assets/images/thumbs/feature-img2.png",
      productCount: "125+ Products",
      link: "/shop"
    },
    {
      id: 3,
      title: "Desserts",
      image: "assets/images/thumbs/feature-img3.png",
      productCount: "125+ Products",
      link: "/shop"
    },
    {
      id: 4,
      title: "Drinks & Juice",
      image: "assets/images/thumbs/feature-img4.png",
      productCount: "125+ Products",
      link: "/shop"
    },
    {
      id: 5,
      title: "Animals Food",
      image: "assets/images/thumbs/feature-img5.png",
      productCount: "125+ Products",
      link: "/shop"
    },
    {
      id: 6,
      title: "Fresh Fruits",
      image: "assets/images/thumbs/feature-img6.png",
      productCount: "125+ Products",
      link: "/shop"
    },
    {
      id: 7,
      title: "Yummy Candy",
      image: "assets/images/thumbs/feature-img7.png",
      productCount: "125+ Products",
      link: "/shop"
    },
    {
      id: 8,
      title: "Dairy & Eggs",
      image: "assets/images/thumbs/feature-img8.png",
      productCount: "125+ Products",
      link: "/shop"
    },
    {
      id: 9,
      title: "Snacks",
      image: "assets/images/thumbs/feature-img9.png",
      productCount: "125+ Products",
      link: "/shop"
    },
    {
      id: 10,
      title: "Frozen Foods",
      image: "assets/images/thumbs/feature-img10.png",
      productCount: "125+ Products",
      link: "/shop"
    }
  ],
  sliderSettings: {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 10,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1699,
        settings: {
          slidesToShow: 9,
        },
      },
      {
        breakpoint: 1599,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 424,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 359,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }
};

const FeatureOne = () => {
  // Custom arrow components
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        type='button'
        onClick={onClick}
        className={` ${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
      >
        <i className='ph ph-caret-right' />
      </button>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        type='button'
        onClick={onClick}
        className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
      >
        <i className='ph ph-caret-left' />
      </button>
    );
  }

  // Complete slider settings with custom arrows
  const settings = {
    ...featureConfig.sliderSettings,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className='feature' id='featureSection'>
      <div className='container container-lg'>
        <div className='position-relative arrow-center'>
          <div className='flex-align'>
            <button
              type='button'
              id='feature-item-wrapper-prev'
              className='slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1'
            >
              <i className='ph ph-caret-left' />
            </button>
            <button
              type='button'
              id='feature-item-wrapper-next'
              className='slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1'
            >
              <i className='ph ph-caret-right' />
            </button>
          </div>
          <div className='feature-item-wrapper'>
            <Slider {...settings}>
              {featureConfig.items.map((item) => (
                <div key={item.id} className='feature-item text-center'>
                  <div className='feature-item__thumb rounded-circle'>
                    <Link href={item.link} className='w-100 h-100 flex-center'>
                      <img src={item.image} alt={item.title} />
                    </Link>
                  </div>
                  <div className='feature-item__content mt-16'>
                    <h6 className='text-lg mb-8'>
                      <Link href={item.link} className='text-inherit'>
                        {item.title}
                      </Link>
                    </h6>
                    <span className='text-sm text-gray-400'>{item.productCount}</span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureOne;