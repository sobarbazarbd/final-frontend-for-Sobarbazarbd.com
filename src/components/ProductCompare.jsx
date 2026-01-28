"use client";

import React, { useState } from "react";
import Link from "next/link";

const ProductCompare = ({ currentProduct, relatedProducts }) => {
  const maxCompare = 3;
  const [selected, setSelected] = useState(() =>
    (relatedProducts || []).slice(0, 2).map((p) => p.id)
  );

  if (!relatedProducts || relatedProducts.length === 0) return null;

  const toggleProduct = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : prev.length < maxCompare
        ? [...prev, id]
        : prev
    );
  };

  const compareList = relatedProducts.filter((p) => selected.includes(p.id));

  // Build current product card-like object
  const currentDefault =
    currentProduct?.variants?.find((v) => v.is_default) ||
    currentProduct?.variants?.[0];

  const getPrice = (product) => {
    const v = product?.variants?.find((v) => v.is_default) || product?.variants?.[0];
    return v?.final_price ?? v?.price ?? product?.price ?? "—";
  };

  const getOriginalPrice = (product) => {
    const v = product?.variants?.find((v) => v.is_default) || product?.variants?.[0];
    return v?.price ?? product?.original_price ?? null;
  };

  const getStock = (product) => {
    const v = product?.variants?.find((v) => v.is_default) || product?.variants?.[0];
    return v?.available_stock ?? v?.stock ?? "—";
  };

  const getImage = (product) => {
    if (product?.images?.length) return product.images[0]?.image || product.images[0];
    return product?.image || "/assets/images/thumbs/product-details-two-thumb1.png";
  };

  const renderStars = (rating) => {
    const r = Math.round(rating || 0);
    return (
      <div className="flex-align gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`text-sm d-flex ${
              i <= r ? "text-warning-600" : "text-gray-300"
            }`}
          >
            <i className="ph-fill ph-star" />
          </span>
        ))}
        <span className="text-xs text-gray-500 ms-4">
          ({rating ? Number(rating).toFixed(1) : "0.0"})
        </span>
      </div>
    );
  };

  // All products to display in compare table
  const allProducts = [
    { ...currentProduct, _isCurrent: true },
    ...compareList,
  ];

  const rows = [
    {
      label: "Image",
      render: (p) => (
        <div className="flex-center">
          <img
            src={getImage(p)}
            alt={p.name}
            className="rounded-8 object-fit-cover"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      ),
    },
    {
      label: "Product",
      render: (p) => (
        <div>
          <h6 className="text-sm mb-4 text-line-2">{p.name}</h6>
          {p.brand && (
            <span className="text-xs text-gray-500">Brand: {p.brand}</span>
          )}
        </div>
      ),
    },
    {
      label: "Price",
      render: (p) => {
        const price = getPrice(p);
        const original = getOriginalPrice(p);
        return (
          <div>
            <span className="text-lg fw-bold text-main-600">৳{price}</span>
            {original && Number(original) > Number(price) && (
              <span className="text-sm text-gray-400 text-decoration-line-through ms-8">
                ৳{original}
              </span>
            )}
          </div>
        );
      },
    },
    {
      label: "Rating",
      render: (p) => renderStars(p.rating),
    },
    {
      label: "Reviews",
      render: (p) => (
        <span className="text-sm text-gray-700">
          {p.review_count || 0} reviews
        </span>
      ),
    },
    {
      label: "Availability",
      render: (p) => {
        const stock = getStock(p);
        const inStock = stock !== "—" && Number(stock) > 0;
        return (
          <span
            className={`text-sm fw-medium ${
              inStock ? "text-success-600" : "text-danger-600"
            }`}
          >
            <i
              className={`ph-fill ${
                inStock ? "ph-check-circle" : "ph-x-circle"
              } me-4`}
            />
            {inStock ? `In Stock (${stock})` : "Out of Stock"}
          </span>
        );
      },
    },
    {
      label: "Seller",
      render: (p) => (
        <span className="text-sm text-gray-700">
          {p.store?.name || "SobarBazarBD"}
        </span>
      ),
    },
    {
      label: "Action",
      render: (p) =>
        p._isCurrent ? (
          <span className="badge bg-main-50 text-main-600 rounded-pill px-16 py-8 text-sm fw-medium">
            <i className="ph-fill ph-eye me-4" />
            Currently Viewing
          </span>
        ) : (
          <Link
            href={`/shop/${p.id}`}
            className="btn btn-main rounded-pill py-8 px-24 text-sm fw-medium"
          >
            View Product
            <i className="ph ph-arrow-right ms-4" />
          </Link>
        ),
    },
  ];

  return (
    <div className="pt-12">
      <div className="border rounded-24 overflow-hidden">
        {/* Header */}
        <div className="px-32 py-24 border-bottom border-gray-100 flex-between flex-wrap gap-16">
          <div className="flex-align gap-12">
            <span className="w-44 h-44 bg-main-50 text-main-600 rounded-circle flex-center text-xl">
              <i className="ph-fill ph-scales" />
            </span>
            <div>
              <h6 className="mb-0">Compare Products</h6>
              <span className="text-sm text-gray-500">
                Select up to {maxCompare} related products to compare
              </span>
            </div>
          </div>
          {selected.length > 0 && (
            <button
              onClick={() => setSelected([])}
              className="text-sm text-gray-500 hover-text-danger-600 border-0 bg-transparent d-flex align-items-center gap-4"
            >
              <i className="ph ph-x" />
              Clear selection
            </button>
          )}
        </div>

        {/* Product selector chips */}
        <div className="px-32 py-16 bg-gray-50 border-bottom border-gray-100">
          <div className="flex-align gap-8 flex-wrap">
            <span className="text-sm text-gray-600 fw-medium me-4">
              Compare with:
            </span>
            {relatedProducts.map((rp) => {
              const isActive = selected.includes(rp.id);
              return (
                <button
                  key={rp.id}
                  onClick={() => toggleProduct(rp.id)}
                  className={`border rounded-pill px-16 py-6 text-xs fw-medium d-inline-flex align-items-center gap-6 transition-1 ${
                    isActive
                      ? "border-main-600 bg-main-50 text-main-600"
                      : "border-gray-200 bg-white text-gray-600 hover-border-main-400"
                  }`}
                  style={{ cursor: "pointer" }}
                  disabled={!isActive && selected.length >= maxCompare}
                >
                  {isActive ? (
                    <i className="ph-fill ph-check-circle" />
                  ) : (
                    <i className="ph ph-plus-circle" />
                  )}
                  <span className="text-line-1" style={{ maxWidth: "140px" }}>
                    {rp.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Compare table */}
        {compareList.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table
              className="w-100"
              style={{ minWidth: "600px", borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th
                    className="text-sm fw-semibold text-gray-500 text-start px-24 py-16 bg-gray-50 border-bottom border-gray-100"
                    style={{ width: "130px", minWidth: "130px" }}
                  >
                    Feature
                  </th>
                  {allProducts.map((p) => (
                    <th
                      key={p.id}
                      className={`text-center px-16 py-16 border-bottom border-gray-100 ${
                        p._isCurrent ? "bg-main-50" : "bg-white"
                      }`}
                      style={{ minWidth: "180px" }}
                    >
                      {p._isCurrent && (
                        <span className="badge bg-main-600 text-white rounded-pill px-12 py-4 text-xs mb-8 d-inline-block">
                          This Product
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="text-sm fw-semibold text-gray-700 px-24 py-16 border-bottom border-gray-100">
                      {row.label}
                    </td>
                    {allProducts.map((p) => (
                      <td
                        key={p.id}
                        className={`text-center px-16 py-16 border-bottom border-gray-100 ${
                          p._isCurrent ? "bg-main-50 bg-opacity-50" : ""
                        }`}
                      >
                        <div className="flex-center">{row.render(p)}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-32 py-48 text-center">
            <span className="text-gray-400 text-5xl d-block mb-16">
              <i className="ph ph-scales" />
            </span>
            <h6 className="text-gray-500 mb-8">No products selected</h6>
            <p className="text-sm text-gray-400">
              Select related products above to start comparing
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCompare;
