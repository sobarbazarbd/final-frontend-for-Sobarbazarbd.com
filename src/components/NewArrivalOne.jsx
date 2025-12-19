"use client";

import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

// Arrow Components
function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
    >
      <i className="ph ph-caret-right" />
    </button>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
    >
      <i className="ph ph-caret-left" />
    </button>
  );
}

const NewArrivalOne = ({ data }) => {
  const { addToCart, refreshCart } = useCart();
  const [addingId, setAddingId] = React.useState(null);
  const router = typeof window !== "undefined" ? require("next/navigation").useRouter() : null;

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1599, settings: { slidesToShow: 6 } },
      { breakpoint: 1399, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 575, settings: { slidesToShow: 2 } },
      { breakpoint: 424, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="new-arrival pb-80">
      <div className="container container-lg">
        {/* Heading */}
        <div className="section-heading">
          <div className="flex-between flex-wrap gap-8">
            <h5 className="mb-0">New Arrivals</h5>
            <div className="flex-align mr-point gap-16">
              <Link
                href="/shop"
                className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
              >
                View All Deals
              </Link>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="new-arrival__slider arrow-style-two">
          <Slider {...settings}>
            {data?.map((product) => {
              const image =
                product.images?.[0]?.image ||
                "/assets/images/default-product.png";
              const price = product.default_variant?.final_price || 0;
              const storeName = product.store?.name || "Unknown Store";
              const oldPrice = product.default_variant?.discount
                ? price + product.default_variant.discount
                : null;

              // --- Add to Cart handler ---
              const handleAddToCart = async (e) => {
                e.preventDefault();
                if (!product.default_variant?.id) {
                  toast.error("No variant available for this product.");
                  return;
                }
                setAddingId(product.id);
                const result = await addToCart(product.default_variant.id, 1);
                setAddingId(null);
                if (result.success) {
                  refreshCart();
                  toast.success(
                    <span>
                      Added to cart!{" "}
                      <button
                        style={{
                          color: "#FA6400",
                          textDecoration: "underline",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          marginLeft: 8,
                          fontWeight: 500,
                        }}
                        onClick={() => window.location.href = "/cart"}
                      >
                        View Cart
                      </button>
                    </span>,
                    { duration: 4000 }
                  );
                } else {
                  toast.error(result.error || "Failed to add to cart");
                }
              };

              return (
                <div key={product.id}>
                  <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    {/* Product Image */}
                    <Link
                      href={`/product-details/${product.id}`}
                      className="product-card__thumb flex-center"
                    >
                      <img src={image} alt={product.name} />
                    </Link>

                    {/* Product Content */}
                    <div className="product-card__content mt-12">
                      {/* Title */}
                      <h6 className="title text-lg fw-semibold mt-12 mb-8">
                        <Link
                          href={`/product-details/${product.id}`}
                          className="link text-line-2"
                        >
                          {product.name}
                        </Link>
                      </h6>

                      {/* Store */}
                      <div className="flex-align gap-4">
                        <span className="text-main-600 text-md d-flex">
                          <i className="ph-fill ph-storefront" />
                        </span>
                        <span className="text-gray-500 text-xs">
                          By {storeName}
                        </span>
                      </div>

                      {/* Price & Cart */}
                      <div className="flex-between gap-8 mt-24 flex-wrap">
                        <div className="product-card__price">
                          {oldPrice && (
                            <span className="text-gray-400 text-md fw-semibold text-decoration-line-through d-block">
                              ৳{oldPrice}
                            </span>
                          )}
                          <span className="text-heading text-md fw-semibold">
                            ৳{price}{" "}
                            <span className="text-gray-500 fw-normal">/Qty</span>
                          </span>
                        </div>
                        <button
                          type="button"
                          className="product-card__cart btn btn-main py-11 px-24 rounded-pill flex-align gap-8"
                          onClick={handleAddToCart}
                          disabled={addingId === product.id}
                          style={{
                            pointerEvents: addingId === product.id ? "none" : "auto",
                            opacity: addingId === product.id ? 0.7 : 1,
                          }}
                        >
                          {addingId === product.id ? (
                            "Adding..."
                          ) : (
                            <>Add <i className="ph ph-shopping-cart" /></>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalOne;
