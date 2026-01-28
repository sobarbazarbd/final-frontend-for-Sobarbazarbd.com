"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

/* ─── Countdown helper ─── */
function getTimeLeft(endDate) {
  if (!endDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const diff = Math.max(0, new Date(endDate) - new Date());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

const MegaDealsBanner = ({ section }) => {
  const deal = section?.banner_items?.[0];

  /* live countdown */
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const endDate = deal?.end_date;
    if (!endDate) return;
    const tick = () => setTime(getTimeLeft(endDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deal]);

  return (
    <section className="mega-deals-banner pt-80 pb-40">
      <div className="container container-lg">

        {/* ════════ MAIN WIDE BANNER ════════ */}
        <div className="mega-deals-banner__hero position-relative rounded-24 overflow-hidden z-1">

          {/* Background layers */}
          <div className="mega-deals-banner__bg" />
          <div className="mega-deals-banner__pattern" />

          <div className="row g-0 align-items-center position-relative z-1">
            {/* Left content */}
            <div className="col-lg-7 col-md-8">
              <div className="mega-deals-banner__content">
                <span className="mega-deals-banner__badge">
                  <i className="ph ph-lightning" />
                  Limited Time Only
                </span>

                <h2 className="mega-deals-banner__title">
                  Today's <span>Mega Deals</span>
                </h2>

                <p className="mega-deals-banner__subtitle">
                  {deal?.description || "Flash sale discounts on hundreds of products. Grab your favorites before time runs out!"}
                </p>

                {/* Countdown */}
                {deal?.end_date && (
                  <div className="mega-deals-banner__countdown">
                    {[
                      { value: time.days, label: "Days" },
                      { value: time.hours, label: "Hours" },
                      { value: time.minutes, label: "Min" },
                      { value: time.seconds, label: "Sec" },
                    ].map((unit) => (
                      <div className="mega-deals-banner__time-box" key={unit.label}>
                        <span className="mega-deals-banner__time-value">{String(unit.value).padStart(2, "0")}</span>
                        <span className="mega-deals-banner__time-label">{unit.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mega-deals-banner__actions">
                  <Link
                    href={deal?.link_url || "/shop"}
                    className="mega-deals-banner__btn mega-deals-banner__btn--primary"
                  >
                    {deal?.button_text || "Shop Now"}
                    <i className="ph ph-arrow-right" />
                  </Link>
                  <Link href="/shop" className="mega-deals-banner__btn mega-deals-banner__btn--outline">
                    View All Deals
                  </Link>
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="col-lg-5 col-md-4 d-md-block d-none">
              <div className="mega-deals-banner__visual">
                {/* Floating discount badges */}
                <div className="mega-deals-banner__float mega-deals-banner__float--1">
                  <span className="mega-deals-banner__discount-circle">
                    <strong>50%</strong>OFF
                  </span>
                </div>
                <div className="mega-deals-banner__float mega-deals-banner__float--2">
                  <span className="mega-deals-banner__discount-circle mega-deals-banner__discount-circle--sm">
                    <strong>30%</strong>OFF
                  </span>
                </div>
                <div className="mega-deals-banner__float mega-deals-banner__float--3">
                  <span className="mega-deals-banner__mini-tag">Free Shipping</span>
                </div>

                {/* Central icon cluster */}
                <div className="mega-deals-banner__icon-cluster">
                  <div className="mega-deals-banner__icon-ring mega-deals-banner__icon-ring--outer" />
                  <div className="mega-deals-banner__icon-ring mega-deals-banner__icon-ring--inner" />
                  <div className="mega-deals-banner__icon-center">
                    <i className="ph ph-storefront" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════ THREE SMALL INFO CARDS BELOW ════════ */}
        <div className="row g-3 mt-3">
          {[
            {
              icon: "ph-truck",
              color: "green",
              title: "Free Delivery",
              desc: "On orders above ৳500",
            },
            {
              icon: "ph-shield-check",
              color: "orange",
              title: "Genuine Products",
              desc: "100% authentic items",
            },
            {
              icon: "ph-arrow-counter-clockwise",
              color: "blue",
              title: "Easy Returns",
              desc: "7-day return policy",
            },
          ].map((card) => (
            <div className="col-md-4" key={card.title}>
              <div className={`mega-deals-banner__info-card mega-deals-banner__info-card--${card.color}`}>
                <div className="mega-deals-banner__info-icon">
                  <i className={`ph ${card.icon}`} />
                </div>
                <div>
                  <h6 className="mega-deals-banner__info-title">{card.title}</h6>
                  <span className="mega-deals-banner__info-desc">{card.desc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ════════ SCOPED STYLES ════════ */}
      <style jsx>{`
        /* ── Hero banner ── */
        .mega-deals-banner__hero {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          min-height: 380px;
        }
        .mega-deals-banner__bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1a6b3c 0%, #279E5A 40%, #34c06f 100%);
          z-index: -2;
        }
        .mega-deals-banner__pattern {
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0.07;
          background-image:
            radial-gradient(circle at 20% 80%, #fff 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, #fff 1.5px, transparent 1.5px);
          background-size: 60px 60px, 80px 80px, 100px 100px;
        }

        /* ── Content ── */
        .mega-deals-banner__content {
          padding: 48px 20px 48px 48px;
        }
        .mega-deals-banner__badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(4px);
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 16px;
          border-radius: 50px;
          margin-bottom: 20px;
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .mega-deals-banner__badge i {
          font-size: 16px;
          color: #FFD700;
        }
        .mega-deals-banner__title {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .mega-deals-banner__title span {
          color: #FFD700;
        }
        .mega-deals-banner__subtitle {
          color: rgba(255, 255, 255, 0.85);
          font-size: 15px;
          line-height: 1.6;
          max-width: 460px;
          margin-bottom: 28px;
        }

        /* ── Countdown ── */
        .mega-deals-banner__countdown {
          display: flex;
          gap: 10px;
          margin-bottom: 28px;
        }
        .mega-deals-banner__time-box {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 10px 14px;
          text-align: center;
          min-width: 60px;
        }
        .mega-deals-banner__time-value {
          display: block;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
          font-family: 'Quicksand', sans-serif;
        }
        .mega-deals-banner__time-label {
          display: block;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 4px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ── Buttons ── */
        .mega-deals-banner__actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .mega-deals-banner__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .mega-deals-banner__btn--primary {
          background: #FF9F29;
          color: #fff;
          box-shadow: 0 4px 20px rgba(255, 159, 41, 0.4);
        }
        .mega-deals-banner__btn--primary:hover {
          background: #e88d1e;
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(255, 159, 41, 0.5);
          color: #fff;
        }
        .mega-deals-banner__btn--outline {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.4);
        }
        .mega-deals-banner__btn--outline:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: #fff;
          color: #fff;
        }

        /* ── Right visual ── */
        .mega-deals-banner__visual {
          position: relative;
          height: 100%;
          min-height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Floating badges */
        .mega-deals-banner__float {
          position: absolute;
          z-index: 2;
          animation: megaFloat 3s ease-in-out infinite;
        }
        .mega-deals-banner__float--1 {
          top: 12%;
          right: 15%;
          animation-delay: 0s;
        }
        .mega-deals-banner__float--2 {
          bottom: 20%;
          left: 8%;
          animation-delay: 1s;
        }
        .mega-deals-banner__float--3 {
          top: 55%;
          right: 5%;
          animation-delay: 0.5s;
        }
        .mega-deals-banner__discount-circle {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #FF9F29;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 8px 24px rgba(255, 159, 41, 0.4);
          line-height: 1.1;
        }
        .mega-deals-banner__discount-circle strong {
          font-size: 22px;
          font-weight: 800;
        }
        .mega-deals-banner__discount-circle--sm {
          width: 64px;
          height: 64px;
          background: #fff;
          color: #279E5A;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }
        .mega-deals-banner__discount-circle--sm strong {
          font-size: 18px;
          color: #279E5A;
        }
        .mega-deals-banner__mini-tag {
          background: #fff;
          color: #279E5A;
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          white-space: nowrap;
        }

        /* Center icon cluster */
        .mega-deals-banner__icon-cluster {
          position: relative;
          width: 140px;
          height: 140px;
        }
        .mega-deals-banner__icon-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.15);
        }
        .mega-deals-banner__icon-ring--outer {
          inset: 0;
          animation: megaPulseRing 2.5s ease-in-out infinite;
        }
        .mega-deals-banner__icon-ring--inner {
          inset: 18px;
          border-color: rgba(255, 255, 255, 0.25);
          animation: megaPulseRing 2.5s ease-in-out 0.3s infinite;
        }
        .mega-deals-banner__icon-center {
          position: absolute;
          inset: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .mega-deals-banner__icon-center i {
          font-size: 32px;
          color: #fff;
        }

        /* ── Info cards ── */
        .mega-deals-banner__info-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #fff;
          border: 1px solid #E6E6E6;
          border-radius: 14px;
          padding: 18px 20px;
          transition: all 0.3s ease;
        }
        .mega-deals-banner__info-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        }
        .mega-deals-banner__info-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .mega-deals-banner__info-icon i {
          font-size: 22px;
        }
        .mega-deals-banner__info-card--green .mega-deals-banner__info-icon {
          background: #E8F5E9;
          color: #279E5A;
        }
        .mega-deals-banner__info-card--orange .mega-deals-banner__info-icon {
          background: #FFF3E0;
          color: #FF9F29;
        }
        .mega-deals-banner__info-card--blue .mega-deals-banner__info-icon {
          background: #DBEAFE;
          color: #2563EB;
        }
        .mega-deals-banner__info-title {
          font-size: 15px;
          font-weight: 700;
          color: #1A1A1A;
          margin: 0 0 2px;
          font-family: 'Quicksand', sans-serif;
        }
        .mega-deals-banner__info-desc {
          font-size: 13px;
          color: #999;
        }

        /* ── Animations ── */
        @keyframes megaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes megaPulseRing {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 1; }
        }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .mega-deals-banner__content {
            padding: 32px 20px;
            text-align: center;
          }
          .mega-deals-banner__subtitle {
            margin-left: auto;
            margin-right: auto;
          }
          .mega-deals-banner__countdown {
            justify-content: center;
          }
          .mega-deals-banner__actions {
            justify-content: center;
          }
          .mega-deals-banner__time-box {
            padding: 8px 10px;
            min-width: 50px;
          }
          .mega-deals-banner__time-value {
            font-size: 18px;
          }
          .mega-deals-banner__hero {
            min-height: auto;
          }
        }
        @media (max-width: 575px) {
          .mega-deals-banner__btn {
            padding: 10px 22px;
            font-size: 13px;
          }
          .mega-deals-banner__info-card {
            padding: 14px 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default MegaDealsBanner;
