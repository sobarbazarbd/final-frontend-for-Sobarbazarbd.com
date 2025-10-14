import React from "react";
import Link from "next/link";
import { footerConfig } from "./data/footerConfig";

const FooterOne = () => {
  return (
    <footer className='footer py-120'>
      <img
        src={footerConfig.backgroundImage}
        alt='BG'
        className='body-bottom-bg'
      />
      <div className='container container-lg'>
        <div className='footer-item-wrapper d-flex align-items-start flex-wrap'>
          
          {/* Company Info Section */}
          <div className='footer-item'>
            <div className='footer-item__logo'>
              <Link href='/'>
                <img src={footerConfig.companyInfo.logo.src} alt={footerConfig.companyInfo.logo.alt} />
              </Link>
            </div>
            <p className='mb-24'>
              {footerConfig.companyInfo.description}
            </p>
            <div className='flex-align gap-16 mb-16'>
              <span className='w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0'>
                <i className={footerConfig.companyInfo.address.icon} />
              </span>
              <span className='text-md text-gray-900 '>
                {footerConfig.companyInfo.address.text}
              </span>
            </div>
            <div className='flex-align gap-16 mb-16'>
              <span className='w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0'>
                <i className='ph-fill ph-phone-call' />
              </span>
              <div className='flex-align gap-16 flex-wrap'>
                {footerConfig.companyInfo.phones.map((phone, index) => (
                  <React.Fragment key={index}>
                    <a
                      href={phone.href}
                      className='text-md text-gray-900 hover-text-main-600'
                    >
                      {phone.number}
                    </a>
                    {index < footerConfig.companyInfo.phones.length - 1 && (
                      <span className='text-md text-main-600 '>or</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className='flex-align gap-16 mb-16'>
              <span className='w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0'>
                <i className='ph-fill ph-envelope' />
              </span>
              <Link
                href={footerConfig.companyInfo.email.href}
                className='text-md text-gray-900 hover-text-main-600'
              >
                {footerConfig.companyInfo.email.address}
              </Link>
            </div>
          </div>

          {/* Information Links */}
          <div className='footer-item'>
            <h6 className='footer-item__title'>Information</h6>
            <ul className='footer-menu'>
              {footerConfig.informationLinks.map((link, index) => (
                <li key={index} className='mb-16'>
                  <Link
                    href={link.href}
                    className='text-gray-600 hover-text-main-600'
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className='footer-item'>
            <h6 className='footer-item__title'>Customer Support</h6>
            <ul className='footer-menu'>
              {footerConfig.customerSupport.map((link, index) => (
                <li key={index} className='mb-16'>
                  <Link
                    href={link.href}
                    className='text-gray-600 hover-text-main-600'
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div className='footer-item'>
            <h6 className='footer-item__title'>My Account</h6>
            <ul className='footer-menu'>
              {footerConfig.myAccount.map((link, index) => (
                <li key={index} className='mb-16'>
                  <Link
                    href={link.href}
                    className='text-gray-600 hover-text-main-600'
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Daily Groceries */}
          <div className='footer-item'>
            <h6 className='footer-item__title'>Daily Groceries</h6>
            <ul className='footer-menu'>
              {footerConfig.dailyGroceries.map((link, index) => (
                <li key={index} className='mb-16'>
                  <Link
                    href={link.href}
                    className='text-gray-600 hover-text-main-600'
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Apps & Social Links */}
          <div className='footer-item'>
            <h6 className=''>{footerConfig.mobileApps.title}</h6>
            <p className='mb-16'>{footerConfig.mobileApps.description}</p>
            <div className='flex-align gap-8 my-32'>
              {footerConfig.mobileApps.appStores.map((app, index) => (
                <Link key={index} href={app.href} className=''>
                  <img src={app.image} alt={app.name} />
                </Link>
              ))}
            </div>
            <ul className='flex-align gap-16'>
              {footerConfig.socialLinks.map((social, index) => (
                <li key={index}>
                  <Link
                    href={social.href}
                    className='w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white'
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={social.icon} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;