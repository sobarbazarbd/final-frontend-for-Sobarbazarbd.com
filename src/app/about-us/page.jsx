import Breadcrumb from "@/components/Breadcrumb";
import ColorInit from "@/helper/ColorInit";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "About Us - SobazarBd",
  description:
    "Learn about SobarBazarBd, your trusted online shopping complex in Bangladesh.",
};

const page = () => {
  return (
    <>
      <ColorInit color={true} />
      <ScrollToTopInit color="#299E60" />
      <Breadcrumb title="About Us" />

      {/* Hero Section */}
      <section className="py-80">
        <div className="container container-lg">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6">
              <span className="text-main-600 fw-semibold text-sm mb-8 d-block">
                WHO WE ARE
              </span>
              <h2 className="mb-24">
                Your Trusted Online{" "}
                <span className="text-main-600">Shopping Partner</span>
              </h2>
              <p className="text-gray-700 mb-16 text-lg">
                SobarBazarBd is a modern online marketplace built for the people
                of Bangladesh. We connect buyers with verified sellers to
                deliver quality products at the best prices — from daily
                essentials to trending items.
              </p>
              <p className="text-gray-700 mb-32">
                Our mission is simple: make online shopping easy, safe, and
                affordable for everyone. Whether you are in Dhaka, Chittagong,
                Rajshahi, or anywhere in the country, SobarBazarBd brings the
                marketplace to your doorstep.
              </p>
              <div className="d-flex flex-wrap gap-16">
                <div className="border border-gray-100 rounded-16 px-24 py-20 text-center flex-grow-1">
                  <h3 className="text-main-600 mb-4">1000+</h3>
                  <span className="text-gray-600 text-sm">Products</span>
                </div>
                <div className="border border-gray-100 rounded-16 px-24 py-20 text-center flex-grow-1">
                  <h3 className="text-main-600 mb-4">500+</h3>
                  <span className="text-gray-600 text-sm">Happy Customers</span>
                </div>
                <div className="border border-gray-100 rounded-16 px-24 py-20 text-center flex-grow-1">
                  <h3 className="text-main-600 mb-4">100+</h3>
                  <span className="text-gray-600 text-sm">Trusted Sellers</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-main-50 rounded-24 p-32 text-center">
                <div
                  className="bg-white rounded-16 p-48 d-inline-flex flex-column align-items-center gap-24"
                  style={{ maxWidth: "400px", width: "100%" }}
                >
                  <span
                    className="w-100 bg-main-50 rounded-16 flex-center text-main-600"
                    style={{ height: "120px", fontSize: "64px" }}
                  >
                    <i className="ph-fill ph-storefront" />
                  </span>
                  <h4 className="mb-0">SobarBazarBd</h4>
                  <p className="text-gray-500 text-sm mb-0">
                    Online Shopping Complex
                  </p>
                  <div className="d-flex gap-12">
                    <span className="w-40 h-40 flex-center bg-main-100 text-main-600 rounded-circle text-lg">
                      <i className="ph-fill ph-truck" />
                    </span>
                    <span className="w-40 h-40 flex-center bg-main-100 text-main-600 rounded-circle text-lg">
                      <i className="ph-fill ph-shield-check" />
                    </span>
                    <span className="w-40 h-40 flex-center bg-main-100 text-main-600 rounded-circle text-lg">
                      <i className="ph-fill ph-headset" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-80 bg-main-50">
        <div className="container container-lg">
          <div className="text-center mb-48">
            <span className="text-main-600 fw-semibold text-sm mb-8 d-block">
              WHY CHOOSE US
            </span>
            <h3>What Makes Us Different</h3>
          </div>
          <div className="row g-4">
            {[
              {
                icon: "ph-fill ph-seal-check",
                title: "Genuine Products",
                desc: "Every product on SobarBazarBd is verified for quality. We partner only with trusted sellers to ensure you get 100% authentic items.",
              },
              {
                icon: "ph-fill ph-truck",
                title: "Fast Delivery",
                desc: "We deliver across Bangladesh quickly and reliably. Track your order in real time and get updates at every step.",
              },
              {
                icon: "ph-fill ph-wallet",
                title: "Best Prices",
                desc: "Enjoy competitive pricing, flash sales, and exclusive deals. We make sure you always get value for your money.",
              },
              {
                icon: "ph-fill ph-shield-check",
                title: "Secure Payments",
                desc: "Your transactions are protected with industry-standard security. Pay with confidence using your preferred method.",
              },
              {
                icon: "ph-fill ph-headset",
                title: "24/7 Support",
                desc: "Our customer support team is always ready to help. Reach out to us anytime via phone, email, or live chat.",
              },
              {
                icon: "ph-fill ph-arrows-counter-clockwise",
                title: "Easy Returns",
                desc: "Changed your mind? No problem. Our simple return and refund process makes it hassle-free for you.",
              },
            ].map((item, idx) => (
              <div className="col-sm-6 col-lg-4" key={idx}>
                <div className="bg-white rounded-16 p-32 h-100 border border-gray-100 hover-border-main-600 transition-1">
                  <span className="w-56 h-56 flex-center bg-main-50 text-main-600 rounded-circle text-2xl mb-24">
                    <i className={item.icon} />
                  </span>
                  <h6 className="mb-12">{item.title}</h6>
                  <p className="text-gray-600 mb-0 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-80">
        <div className="container container-lg">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6 order-lg-2">
              <span className="text-main-600 fw-semibold text-sm mb-8 d-block">
                OUR STORY
              </span>
              <h3 className="mb-24">From a Small Idea to a Growing Marketplace</h3>
              <p className="text-gray-700 mb-16">
                SobarBazarBd started with a simple idea — to make online
                shopping in Bangladesh easier and more accessible. What began
                as a small project has grown into a full-featured marketplace
                serving customers all across the country.
              </p>
              <p className="text-gray-700 mb-24">
                We believe in empowering local businesses and connecting them
                with customers who value quality, trust, and convenience. Every
                seller on our platform goes through a verification process to
                ensure the best experience for our buyers.
              </p>
              <div className="d-flex flex-wrap gap-24">
                <div className="flex-align gap-12">
                  <span className="w-40 h-40 flex-center bg-main-50 text-main-600 rounded-circle text-lg flex-shrink-0">
                    <i className="ph-fill ph-check-circle" />
                  </span>
                  <span className="text-gray-900 fw-medium text-sm">
                    Verified Sellers Only
                  </span>
                </div>
                <div className="flex-align gap-12">
                  <span className="w-40 h-40 flex-center bg-main-50 text-main-600 rounded-circle text-lg flex-shrink-0">
                    <i className="ph-fill ph-check-circle" />
                  </span>
                  <span className="text-gray-900 fw-medium text-sm">
                    Nationwide Delivery
                  </span>
                </div>
                <div className="flex-align gap-12">
                  <span className="w-40 h-40 flex-center bg-main-50 text-main-600 rounded-circle text-lg flex-shrink-0">
                    <i className="ph-fill ph-check-circle" />
                  </span>
                  <span className="text-gray-900 fw-medium text-sm">
                    Customer First Approach
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="bg-main-50 rounded-24 p-32">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="bg-white rounded-16 p-24 text-center h-100">
                      <span className="text-main-600 text-4xl d-block mb-12">
                        <i className="ph-fill ph-map-pin" />
                      </span>
                      <h6 className="text-sm mb-4">Based In</h6>
                      <span className="text-gray-500 text-xs">Dhaka, Bangladesh</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-white rounded-16 p-24 text-center h-100">
                      <span className="text-main-600 text-4xl d-block mb-12">
                        <i className="ph-fill ph-package" />
                      </span>
                      <h6 className="text-sm mb-4">Delivery</h6>
                      <span className="text-gray-500 text-xs">All Over Bangladesh</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-white rounded-16 p-24 text-center h-100">
                      <span className="text-main-600 text-4xl d-block mb-12">
                        <i className="ph-fill ph-users-three" />
                      </span>
                      <h6 className="text-sm mb-4">Vendors</h6>
                      <span className="text-gray-500 text-xs">Growing Every Day</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-white rounded-16 p-24 text-center h-100">
                      <span className="text-main-600 text-4xl d-block mb-12">
                        <i className="ph-fill ph-heart" />
                      </span>
                      <h6 className="text-sm mb-4">Customers</h6>
                      <span className="text-gray-500 text-xs">Trust & Satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 bg-main-600">
        <div className="container container-lg text-center">
          <h3 className="text-white mb-16">Ready to Start Shopping?</h3>
          <p className="text-white mb-32" style={{ opacity: 0.85 }}>
            Browse thousands of products from verified sellers across Bangladesh.
          </p>
          <div className="d-flex gap-16 flex-center flex-wrap">
            <a
              href="/shop"
              className="btn bg-white text-main-600 rounded-pill px-32 py-16 fw-semibold hover-bg-main-50"
            >
              <i className="ph-fill ph-shopping-cart me-8" />
              Shop Now
            </a>
            <a
              href="/become-seller"
              className="btn border border-white text-white rounded-pill px-32 py-16 fw-semibold hover-bg-white hover-text-main-600"
            >
              <i className="ph-fill ph-storefront me-8" />
              Become a Seller
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
