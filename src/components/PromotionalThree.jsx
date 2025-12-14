import React from "react";
import Link from "next/link";

const PromotionalThree = ({ section }) => {
  return (
    <section className='promo-three pt-120 overflow-hidden'>
      <div className='container container-lg'>
        <div className='row gy-4'>
          {section?.banner_items?.map((item, idx) => (
            <div className='col-sm-6' key={item.id || idx}>
              <div
                className='promo-three-item bg-img rounded-16 overflow-hidden'
                style={{
                  backgroundImage: `url('${item.image}')`,
                }}
              >
                <div className='text-start'>
                  <span className='text-white mb-24'>
                    {item.title}
                  </span>
                  <h2 className='text-white fw-medium mb-0 max-w-375'>
                    {item.description}
                  </h2>
                  <Link
                    href={item.link_url}
                    target={item.link_target}
                    className='btn btn-outline-white d-inline-flex align-items-center rounded-pill gap-8 mt-48'
                    tabIndex={0}
                  >
                    {item.button_text}
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

export default PromotionalThree;
