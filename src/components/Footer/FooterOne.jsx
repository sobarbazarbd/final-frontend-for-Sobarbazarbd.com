"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { footerConfig } from "./data/footerConfig";
import { NavFooterContext } from "@/context/NavFooterProvider";

const FooterOne = () => {
  const navFooter = useContext(NavFooterContext);
  const owner = navFooter?.ownerInfo ?? null;

  // show skeleton briefly then fall back
  const [showFallback, setShowFallback] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowFallback(true), 700);
    return () => clearTimeout(t);
  }, []);

  const companyLogo = owner?.logo ?? footerConfig.companyInfo.logo.src;
  const companyAlt = owner?.owner_name ?? footerConfig.companyInfo.logo.alt;
  const description = footerConfig.companyInfo.description;
  const addressText = owner?.business_address ?? footerConfig.companyInfo.address.text;
  const phones = owner ? [{ number: owner.phone, href: `tel:${owner.phone}` }] : footerConfig.companyInfo.phones;
  const email = owner ? { address: owner.support_email, href: `mailto:${owner.support_email}` } : footerConfig.companyInfo.email;
  const socialLinks = owner
    ? [
        { href: owner.facebook, icon: "ph-fill ph-facebook-logo" },
        { href: owner.twitter, icon: "ph-fill ph-twitter-logo" },
        { href: owner.instagram, icon: "ph-fill ph-instagram-logo" },
        { href: owner.linkedin, icon: "ph-fill ph-linkedin-logo" },
      ].filter(s => s.href)
    : footerConfig.socialLinks;

  return (
    <footer className='footer py-120'>
      <img src={footerConfig.backgroundImage} alt='BG' className='body-bottom-bg' />
      <div className='container container-lg'>
        <div className='footer-item-wrapper footer-responsive-grid'>
          <div className='footer-item footer-item--company'>
            <div className='footer-item__logo'>
              <Link href='/'>
                {owner?.logo ? (
                  <img src={owner.logo} alt={companyAlt} />
                ) : !showFallback ? (
                  <div style={{ width: 160, height: 48, background: "#eee", borderRadius: 8 }} />
                ) : (
                  <img src={footerConfig.companyInfo.logo.src} alt={footerConfig.companyInfo.logo.alt} />
                )}
              </Link>
            </div>
            <p className='mb-24'>
              {description}
            </p>
            <div className='flex-align gap-16 mb-16'>
              <span className='w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0'>
                <i className='ph-fill ph-map-pin' />
              </span>
              <span className='text-md text-gray-900 '>
                {owner?.business_address ? owner.business_address : !showFallback ? (
                  <span style={{ display: "inline-block", width: 180, height: 14, background: "#eee", borderRadius: 6 }} />
                ) : (
                  addressText
                )}
              </span>
            </div>

            <div className='flex-align gap-16 mb-16'>
              <span className='w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0'>
                <i className='ph-fill ph-phone-call' />
              </span>
              <div className='flex-align gap-16 flex-wrap'>
                {owner?.phone ? (
                  <a href={`tel:${owner.phone}`} className='text-md text-gray-900 hover-text-main-600'>{owner.phone}</a>
                ) : !showFallback ? (
                  <div style={{ width: 120, height: 14, background: "#eee", borderRadius: 6 }} />
                ) : (
                  footerConfig.companyInfo.phones.map((p, i) => (
                    <React.Fragment key={i}>
                      <a href={p.href} className='text-md text-gray-900 hover-text-main-600'>{p.number}</a>
                      {i < footerConfig.companyInfo.phones.length - 1 && <span className='text-md text-main-600 '>or</span>}
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>

            <div className='flex-align gap-16 mb-16'>
              <span className='w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0'>
                <i className='ph-fill ph-envelope' />
              </span>
              {owner?.support_email ? (
                <Link href={`mailto:${owner.support_email}`} className='text-md text-gray-900 hover-text-main-600'>{owner.support_email}</Link>
              ) : !showFallback ? (
                <div style={{ width: 160, height: 14, background: "#eee", borderRadius: 6 }} />
              ) : (
                <Link href={footerConfig.companyInfo.email.href} className='text-md text-gray-900 hover-text-main-600'>{footerConfig.companyInfo.email.address}</Link>
              )}
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
              {socialLinks.map((social, index) => (
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

      <style jsx>{`
        .footer-responsive-grid {
          display: grid;
          grid-template-columns: 1.5fr repeat(4, 1fr) 1.2fr;
          gap: 32px;
        }
        @media (max-width: 1199px) {
          .footer-responsive-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .footer-item--company {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 767px) {
          .footer-responsive-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .footer-item--company {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 479px) {
          .footer-responsive-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </footer>
  );
};

export default FooterOne;