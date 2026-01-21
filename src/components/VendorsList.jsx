"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const BASE_URL = "https://api.hetdcl.com";

const VendorsList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1.0/stores/public/`,
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error("Failed to fetch stores");
        const data = await response.json();
        setStores(data?.data || []);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const filteredStores = stores
    .filter((store) =>
      store.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.code?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "latest") {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });

  if (loading) {
    return (
      <section className='vendors-list py-80'>
        <div className='container container-lg'>
          <div className='text-center'>Loading stores...</div>
        </div>
      </section>
    );
  }

  return (
    <section className='vendors-list py-80'>
      <div className='container container-lg'>
        <div className='flex-between flex-wrap gap-8 mb-40'>
          <span className='text-neutral-600 fw-medium px-40 py-12 rounded-pill border border-neutral-100'>
            Showing {filteredStores.length} of {stores.length} stores
          </span>
          <div className='flex-align gap-16'>
            <form
              action='#'
              className='search-form__wrapper position-relative d-block'
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type='text'
                className='search-form__input common-input py-13 ps-16 pe-18 rounded-pill pe-44'
                placeholder='Search stores by name or code...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type='submit'
                className='w-32 h-32 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8'
              >
                <i className='ph ph-magnifying-glass' />
              </button>
            </form>
            <div className='flex-align gap-8'>
              <span className='text-gray-900 flex-shrink-0'>Sort by:</span>
              <select
                className='common-input form-select rounded-pill border border-gray-100 d-inline-block ps-20 pe-36 h-48 py-0 fw-medium'
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value='latest'>Latest</option>
                <option value='old'>Old</option>
              </select>
            </div>
          </div>
        </div>
        <div className='row gy-4 vendor-card-wrapper'>
          {filteredStores.length === 0 ? (
            <div className='col-12 text-center py-5'>
              <p className='text-neutral-600'>No stores found.</p>
            </div>
          ) : (
            filteredStores.map((store) => (
              <div className='col-xxl-3 col-lg-4 col-sm-6' key={store.id}>
                <div className='vendor-card text-center px-16 pb-24'>
                  <div className=''>
                    <img
                        src={store.logo || '/assets/images/thumbs/vendor-logo2.png'}
                        alt={store.name}
                        className='vendor-card__logo m-12'
                        style={{width: 64, height: 64, objectFit: 'contain', borderRadius: '50%', background: '#fff'}}
                    />
                    <h6 className='title mt-32'>
                      <Link
                        href={`/shop?store=${store.id}`}
                        className='text-inherit'
                      >
                        {store.name}
                      </Link>
                    </h6>
                     <div className='mb-8'>
                       {store.website_url && (
                         <a href={store.website_url} target='_blank' rel='noopener noreferrer' className='text-xs text-main-600 d-inline-block'>
                           <i className='ph ph-globe me-1'></i> Website
                         </a>
                       )}
                     </div>
                    <span className='text-heading text-sm d-block'>
                      {store.city || "Location not specified"}
                    </span>
                    <span className='text-neutral-600 text-xs d-block mt-2'>
                      Store Code: {store.code}
                    </span>
                     {store.description && (
                       <div className='text-xs text-gray-700 mt-2' style={{whiteSpace: 'pre-line'}}>
                        {/* truncate description if too long */}
                         {store?.description.length > 100 ? store?.description.substring(0, 100) + "..." : store?.description}
                       </div>
                     )}
                    <Link
                      href={`/shop?store=${store.id}`}
                      className='bg-white text-neutral-600 hover-bg-main-600 hover-text-white rounded-pill py-6 px-16 text-12 mt-8 d-inline-block'
                    >
                      View Products
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default VendorsList;
