"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const StoreInfoCard = ({ store }) => {
  if (!store) return null;

  return (
    <div className="product-details__sidebar py-32 px-24 border border-gray-100 rounded-16">
      <div className="text-center mb-24">
        {store.logo ? (
          <div className="mb-16 flex-center">
            <Image
              src={store.logo}
              alt={store.name}
              width={80}
              height={80}
              className="rounded-circle object-fit-cover"
            />
          </div>
        ) : (
          <div className="mb-16 flex-center">
            <div className="w-80 h-80 bg-main-50 rounded-circle flex-center">
              <i className="ph ph-storefront text-main-600 text-3xl" />
            </div>
          </div>
        )}
        <h6 className="mb-8">{store.name}</h6>
        {store.city && (
          <span className="text-sm text-gray-600 flex-center gap-4">
            <i className="ph ph-map-pin" />
            {store.city}
          </span>
        )}
      </div>

      {store.description && (
        <div className="mb-24 pb-24 border-bottom border-gray-100">
          <p className="text-sm text-gray-700 line-clamp-3">
            {store.description}
          </p>
        </div>
      )}

      <div className="mb-24">
        {store.phone_number && (
          <div className="flex-align gap-12 mb-12">
            <span className="w-32 h-32 bg-main-50 text-main-600 rounded-circle flex-center flex-shrink-0">
              <i className="ph ph-phone" />
            </span>
            <div className="flex-grow-1">
              <span className="text-xs text-gray-500 d-block">Phone</span>
              <a
                href={`tel:${store.phone_number}`}
                className="text-sm text-gray-900 hover-text-main-600"
              >
                {store.phone_number}
              </a>
            </div>
          </div>
        )}

        {store.contact_email && (
          <div className="flex-align gap-12 mb-12">
            <span className="w-32 h-32 bg-main-50 text-main-600 rounded-circle flex-center flex-shrink-0">
              <i className="ph ph-envelope" />
            </span>
            <div className="flex-grow-1">
              <span className="text-xs text-gray-500 d-block">Email</span>
              <a
                href={`mailto:${store.contact_email}`}
                className="text-sm text-gray-900 hover-text-main-600 text-break"
              >
                {store.contact_email}
              </a>
            </div>
          </div>
        )}

        {store.address && (
          <div className="flex-align gap-12">
            <span className="w-32 h-32 bg-main-50 text-main-600 rounded-circle flex-center flex-shrink-0">
              <i className="ph ph-map-pin" />
            </span>
            <div className="flex-grow-1">
              <span className="text-xs text-gray-500 d-block">Address</span>
              <span className="text-sm text-gray-900">{store.address}</span>
            </div>
          </div>
        )}
      </div>

      <Link
        href={`/shop?store=${store.id}`}
        className="btn btn-outline-main rounded-8 w-100 flex-center gap-8"
      >
        <i className="ph ph-storefront" />
        View All Products
      </Link>

      {(store.facebook_url || store.twitter_url || store.website_url) && (
        <div className="mt-24 pt-24 border-top border-gray-100">
          <span className="text-sm text-gray-600 d-block mb-12">
            Follow Store
          </span>
          <div className="flex-align gap-8">
            {store.facebook_url && (
              <a
                href={store.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-36 h-36 flex-center bg-main-50 text-main-600 rounded-circle hover-bg-main-600 hover-text-white transition"
              >
                <i className="ph-fill ph-facebook-logo" />
              </a>
            )}
            {store.twitter_url && (
              <a
                href={store.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-36 h-36 flex-center bg-main-50 text-main-600 rounded-circle hover-bg-main-600 hover-text-white transition"
              >
                <i className="ph-fill ph-twitter-logo" />
              </a>
            )}
            {store.website_url && (
              <a
                href={store.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-36 h-36 flex-center bg-main-50 text-main-600 rounded-circle hover-bg-main-600 hover-text-white transition"
              >
                <i className="ph ph-globe" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreInfoCard;
