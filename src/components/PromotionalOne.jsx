import React from "react";
import Link from "next/link";

const PromotionalOne = ({ section }) => {
  return (
    <section className='promotional-banner pt-80'>
      <div className='container container-lg'>
        <div className='row gy-4'>
          {section?.banner_items?.map((item, idx) => (
            <div className='col-xl-3 col-sm-6 col-xs-6' key={item.id || idx}>
              <div className='promotional-banner-item position-relative rounded-24 overflow-hidden z-1'>
                <img
                  src={item.image }
                  alt={item.title}
                  className='position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1'
                />
                <div className='promotional-banner-item__content'>
                  <h6 className='promotional-banner-item__title text-32'>
                    {item.title}
                  </h6>
                  <Link
                    href={item.link_url}
                    target={item.link_target}
                    className='btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24'
                  >
                    {item.button_text}
                    <span className='icon text-xl d-flex'>
                      <i className='ph ph-arrow-right' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalOne;
