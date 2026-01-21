"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.hetdcl.com/api/v1.0";

const WishListSection = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const fetchWishlist = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE_URL}/customers/favorite-products/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setWishlistItems(Array.isArray(data) ? data : data.data || []);
      } else {
        toast.error("Failed to fetch wishlist");
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      toast.error("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const handleRemove = async (itemId) => {
    setRemovingId(itemId);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${API_BASE_URL}/customers/favorite-products/${itemId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );

      if (res.ok || res.status === 204) {
        setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
        toast.success("Removed from wishlist");
      } else {
        toast.error("Failed to remove from wishlist");
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove from wishlist");
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (productId) => {
    toast.info("Redirecting to product page to select variant...");
  };

  if (!user) {
    return (
      <section className="cart py-80">
        <div className="container container-lg">
          <div className="text-center py-5">
            <h5 className="mb-4">Please login to view your wishlist</h5>
            <Link href="/login" className="btn btn-main rounded-8">
              Login
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="cart py-80">
        <div className="container container-lg">
          <div className="text-center py-5">
            <div className="spinner-border text-main-600" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading your wishlist...</p>
          </div>
        </div>
      </section>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <section className="cart py-80">
        <div className="container container-lg">
          <div className="text-center py-5">
            <i className="ph ph-heart text-6xl text-gray-400 mb-4"></i>
            <h5 className="mb-4">Your wishlist is empty</h5>
            <p className="text-gray-600 mb-4">
              Add items to your wishlist to save them for later
            </p>
            <Link href="/shop" className="btn btn-main rounded-8">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-lg-11">
            <div className="cart-table border border-gray-100 rounded-8">
              <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                <table className="table rounded-8 overflow-hidden">
                  <thead>
                    <tr className="border-bottom border-neutral-100">
                      <th className="h6 mb-0 text-lg fw-bold px-40 py-32 border-end border-neutral-100">
                        Delete
                      </th>
                      <th className="h6 mb-0 text-lg fw-bold px-40 py-32 border-end border-neutral-100">
                        Product Name
                      </th>
                      <th className="h6 mb-0 text-lg fw-bold px-40 py-32 border-end border-neutral-100">
                        Unit Price
                      </th>
                      <th className="h6 mb-0 text-lg fw-bold px-40 py-32 border-end border-neutral-100">
                        Stock Status
                      </th>
                      <th className="h6 mb-0 text-lg fw-bold px-40 py-32" />
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.map((item) => {
                      const product = item.product_details;
                      if (!product) return null;

                      return (
                        <tr key={item.id}>
                          <td className="px-40 py-32 border-end border-neutral-100">
                            <button
                              type="button"
                              onClick={() => handleRemove(item.id)}
                              disabled={removingId === item.id}
                              className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                            >
                              {removingId === item.id ? (
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                ></span>
                              ) : (
                                <i className="ph ph-x-circle text-2xl d-flex" />
                              )}
                              Remove
                            </button>
                          </td>
                          <td className="px-40 py-32 border-end border-neutral-100">
                            <div className="table-product d-flex align-items-center gap-24">
                              <Link
                                href={`/product-details-two/${product.id}`}
                                className="table-product__thumb border border-gray-100 rounded-8 flex-center"
                              >
                                <img
                                  src={
                                    product.image ||
                                    "/assets/images/thumbs/product-two-img1.png"
                                  }
                                  alt={product.name}
                                  style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                  }}
                                />
                              </Link>
                              <div className="table-product__content text-start">
                                <h6 className="title text-lg fw-semibold mb-8">
                                  <Link
                                    href={`/product-details-two/${product.id}`}
                                    className="link text-line-2"
                                  >
                                    {product.name}
                                  </Link>
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td className="px-40 py-32 border-end border-neutral-100">
                            <span className="text-lg h6 mb-0 fw-semibold">
                              ৳{product.final_price?.toFixed(2) || "0.00"}
                            </span>
                            {product.price > product.final_price && (
                              <span className="text-gray-400 text-decoration-line-through ms-2">
                                ৳{product.price?.toFixed(2)}
                              </span>
                            )}
                          </td>
                          <td className="px-40 py-32 border-end border-neutral-100">
                            <span
                              className={`text-lg h6 mb-0 fw-semibold ${
                                product.available_stock > 0
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {product.available_stock > 0
                                ? "In Stock"
                                : "Out of Stock"}
                            </span>
                          </td>
                          <td className="px-40 py-32">
                            <Link
                              href={`/product-details-two/${product.id}`}
                              className="btn btn-main-two rounded-8 px-40"
                            >
                              View Product{" "}
                              <i className="ph ph-arrow-right ms-2" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishListSection;
