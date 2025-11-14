"use client"
import React from "react";
import Link from "next/link";

const OfferOne = ({ section }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Check if offer is expired
  const isExpired = (endDate) => {
    if (!endDate) return false;
    return new Date() > new Date(endDate);
  };

  return (
    <section className='offer pt-80 pb-80'>
      <div className='container container-lg'>
        <div className='row gy-4'>
          {section?.banner_items?.map((offer, index) => {
            const expired = isExpired(offer.end_date);
            
            return (
              <div key={offer.id || index} className='col-sm-6'>
                <div className='offer-card position-relative rounded-16 bg-main-600 overflow-hidden p-16 flex-align gap-16 flex-wrap z-1'>
                  {/* Background Shape */}
                  <img
                    src='assets/images/shape/offer-shape.png'
                    alt=''
                    className='position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6'
                  />
                  
                  {/* Product Image */}
                  <div className='offer-card__thumb d-lg-block d-none'>
                    <img 
                      src={offer.image || 'assets/images/thumbs/offer-img1.png'} 
                      alt={offer.title}
                      className="object-fit-cover"
                      style={{ width: '120px', height: '120px' }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className='py-xl-4'>
                    {/* Logo */}
                    <div className='offer-card__logo mb-16 w-80 h-80 flex-center bg-white rounded-circle'>
                      <img 
                        src='assets/images/thumbs/offer-logo.png' 
                        alt='Offer logo' 
                      />
                    </div>
                    
                    {/* Title */}
                    <h4 className='text-white mb-8'>{offer.title || 'Special Offer'}</h4>
                    
                    {/* Description and Expiry */}
                    <div className='flex-align gap-8'>
                      <span className='text-sm text-white'>
                        {offer.description || 'Limited time offer'}
                      </span>
                      {offer.end_date && (
                        <span className={`text-sm ${expired ? 'text-danger' : 'text-main-two-600'}`}>
                          {expired ? 'Expired' : 'Expires'} {formatDate(offer.end_date)}
                        </span>
                      )}
                    </div>
                    
                    {/* Action Button */}
                    <Link
                      href={offer.link_url || '/shop'}
                      target={offer.link_target || '_self'}
                      className={`mt-16 btn ${
                        expired 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-white hover-text-white hover-bg-main-800'
                      } text-heading fw-medium d-inline-flex align-items-center rounded-pill gap-8`}
                      tabIndex={expired ? -1 : 0}
                      onClick={(e) => {
                        if (expired) {
                          e.preventDefault();
                        }
                      }}
                    >
                      {expired ? 'Offer Expired' : (offer.button_text || 'Shop Now')}
                      {!expired && (
                        <span className='icon text-xl d-flex'>
                          <i className='ph ph-arrow-right' />
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Empty State */}
        {(!section?.banner_items || section.banner_items.length === 0) && (
          <div className="text-center py-40">
            <div className="offer-card position-relative rounded-16 bg-gray-100 overflow-hidden p-40 flex-align justify-content-center flex-column text-center">
              <h4 className="text-gray-600 mb-16">No Current Offers</h4>
              <p className="text-gray-500 mb-24">Check back later for special offers!</p>
              <Link
                href='/shop'
                className='btn bg-main-600 text-white hover-bg-main-800 fw-medium d-inline-flex align-items-center rounded-pill gap-8'
              >
                Continue Shopping
                <span className='icon text-xl d-flex'>
                  <i className='ph ph-arrow-right' />
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OfferOne;