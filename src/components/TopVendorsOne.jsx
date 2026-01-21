import React from "react";
import Link from "next/link";

const TopVendorsOne = ({ data }) => {
  return (
    <section className='top-vendors py-80'>
      <div className='container container-lg'>
        <div className='section-heading'>
          <div className='flex-between flex-wrap gap-8'>
            <h5 className='mb-0'>Weekly Top Vendors</h5>
            <Link
              href='/vendor'
              className='text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline'
            >
              All Vendors
            </Link>
          </div>
        </div>
        <div className='row gy-4 vendor-card-wrapper'>
          {data?.map((vendor) => (
            <div key={vendor.id} className='col-xxl-3 col-lg-4 col-sm-6'>
              <Link href={`/shop?store=${vendor.id}`}>
                <div className='vendor-card text-center px-16 pb-24 cursor-pointer'>
                  <div className=''>
                    <img
                      src={vendor.logo || 'assets/images/thumbs/vendor-logo2.png'}
                      alt={vendor.name}
                      className='vendor-card__logo m-12'
                    />
                    <h6 className='title mt-32'>{vendor.name}</h6>
                    <span className='text-heading text-sm d-block'>
                      Delivery by 6:15am
                    </span>
                  </div>
                  <div className='vendor-card__list mt-22 flex-center flex-wrap gap-8'>
                    <div className='vendor-card__item bg-white rounded-circle flex-center'>
                      <img src='assets/images/thumbs/vendor-img1.png' alt='' />
                    </div>
                    <div className='vendor-card__item bg-white rounded-circle flex-center'>
                      <img src='assets/images/thumbs/vendor-img2.png' alt='' />
                    </div>
                    <div className='vendor-card__item bg-white rounded-circle flex-center'>
                      <img src='assets/images/thumbs/vendor-img3.png' alt='' />
                    </div>
                    <div className='vendor-card__item bg-white rounded-circle flex-center'>
                      <img src='assets/images/thumbs/vendor-img4.png' alt='' />
                    </div>
                    <div className='vendor-card__item bg-white rounded-circle flex-center'>
                      <img src='assets/images/thumbs/vendor-img5.png' alt='' />
                    </div>
                    <div className='vendor-card__item bg-white rounded-circle flex-center'>
                      <img src='assets/images/thumbs/vendor-img5.png' alt='' />
                    </div>
                    <div className='vendor-card__item bg-white rounded-circle flex-center'>
                      <img src='assets/images/thumbs/vendor-img5.png' alt='' />
                    </div>
                    
                   
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopVendorsOne;