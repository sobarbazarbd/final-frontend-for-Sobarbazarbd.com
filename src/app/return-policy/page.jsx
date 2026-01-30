import Breadcrumb from "@/components/Breadcrumb";
import ColorInit from "@/helper/ColorInit";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "Return Policy - SobazarBd",
  description:
    "Read SobarBazarBd return and refund policy. Learn how to return products and get your money back.",
};

const page = () => {
  return (
    <>
      <ColorInit color={true} />
      <ScrollToTopInit color="#299E60" />
      <Breadcrumb title="Return Policy" />

      <section className="py-80">
        <div className="container container-lg">
          <div className="row gy-4">
            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="border border-gray-100 rounded-16 p-24 position-sticky" style={{ top: "100px" }}>
                <h6 className="mb-16 text-lg">Quick Links</h6>
                <ul className="d-flex flex-column gap-12">
                  {[
                    { label: "Return Eligibility", id: "eligibility" },
                    { label: "Return Process", id: "process" },
                    { label: "Refund Policy", id: "refund" },
                    { label: "Exchange Policy", id: "exchange" },
                    { label: "Non-Returnable Items", id: "non-returnable" },
                    { label: "Damaged Products", id: "damaged" },
                    { label: "Contact Us", id: "contact" },
                  ].map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-gray-600 hover-text-main-600 text-sm d-flex align-items-center gap-8"
                      >
                        <i className="ph ph-caret-right text-xs" />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              <div className="border border-gray-100 rounded-24 p-32">
                {/* Header */}
                <div className="mb-40 pb-32 border-bottom border-gray-100">
                  <div className="flex-align gap-16 mb-16">
                    <span className="w-56 h-56 flex-center bg-main-50 text-main-600 rounded-circle text-2xl">
                      <i className="ph-fill ph-arrows-counter-clockwise" />
                    </span>
                    <div>
                      <h3 className="mb-4">Return & Refund Policy</h3>
                      <span className="text-gray-500 text-sm">
                        Last updated: January 2025
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    At SobarBazarBd, we want you to be completely satisfied
                    with your purchase. If you are not happy with your order,
                    we are here to help. Please read our return and refund
                    policy carefully.
                  </p>
                </div>

                {/* Section 1 */}
                <div id="eligibility" className="mb-40">
                  <div className="flex-align gap-12 mb-16">
                    <span className="w-32 h-32 flex-center bg-main-600 text-white rounded-circle text-sm fw-bold flex-shrink-0">
                      1
                    </span>
                    <h5 className="mb-0">Return Eligibility</h5>
                  </div>
                  <div className="ps-44">
                    <p className="text-gray-700 mb-16">
                      You may return most items purchased from SobarBazarBd
                      within <strong>7 days</strong> of delivery. To be
                      eligible for a return:
                    </p>
                    <ul className="d-flex flex-column gap-12 mb-0">
                      {[
                        "The item must be unused and in the same condition that you received it.",
                        "The item must be in the original packaging.",
                        "You must have the receipt or proof of purchase (order ID).",
                        "The return request must be made within 7 days of receiving the product.",
                      ].map((text, i) => (
                        <li key={i} className="flex-align gap-8">
                          <span className="w-24 h-24 flex-center bg-main-50 text-main-600 rounded-circle text-xs flex-shrink-0">
                            <i className="ph-fill ph-check" />
                          </span>
                          <span className="text-gray-700 text-sm">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Section 2 */}
                <div id="process" className="mb-40">
                  <div className="flex-align gap-12 mb-16">
                    <span className="w-32 h-32 flex-center bg-main-600 text-white rounded-circle text-sm fw-bold flex-shrink-0">
                      2
                    </span>
                    <h5 className="mb-0">Return Process</h5>
                  </div>
                  <div className="ps-44">
                    <p className="text-gray-700 mb-16">
                      Follow these steps to return a product:
                    </p>
                    <div className="row g-3">
                      {[
                        {
                          step: "Step 1",
                          title: "Submit Request",
                          desc: "Log in to your account, go to Order History, and click \"Return\" on the item you want to return.",
                          icon: "ph-fill ph-clipboard-text",
                        },
                        {
                          step: "Step 2",
                          title: "Wait for Approval",
                          desc: "Our team will review your request within 24-48 hours and notify you via email or SMS.",
                          icon: "ph-fill ph-clock",
                        },
                        {
                          step: "Step 3",
                          title: "Ship the Item",
                          desc: "Once approved, pack the item securely and ship it back to us. You will receive a return shipping address.",
                          icon: "ph-fill ph-package",
                        },
                        {
                          step: "Step 4",
                          title: "Get Refund",
                          desc: "After we receive and inspect the item, your refund will be processed within 5-7 business days.",
                          icon: "ph-fill ph-wallet",
                        },
                      ].map((item, idx) => (
                        <div className="col-sm-6" key={idx}>
                          <div className="bg-gray-50 rounded-16 p-24 h-100">
                            <span className="text-main-600 text-2xl d-block mb-12">
                              <i className={item.icon} />
                            </span>
                            <span className="text-main-600 text-xs fw-semibold d-block mb-4">
                              {item.step}
                            </span>
                            <h6 className="text-sm mb-8">{item.title}</h6>
                            <p className="text-gray-600 text-xs mb-0">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div id="refund" className="mb-40">
                  <div className="flex-align gap-12 mb-16">
                    <span className="w-32 h-32 flex-center bg-main-600 text-white rounded-circle text-sm fw-bold flex-shrink-0">
                      3
                    </span>
                    <h5 className="mb-0">Refund Policy</h5>
                  </div>
                  <div className="ps-44">
                    <p className="text-gray-700 mb-16">
                      Once your return is received and inspected, we will send
                      you a notification. Your refund will be processed as
                      follows:
                    </p>
                    <div className="border border-gray-100 rounded-16 overflow-hidden">
                      <table className="w-100" style={{ borderCollapse: "collapse" }}>
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-24 py-16 text-sm fw-semibold text-gray-900 text-start border-bottom border-gray-100">
                              Payment Method
                            </th>
                            <th className="px-24 py-16 text-sm fw-semibold text-gray-900 text-start border-bottom border-gray-100">
                              Refund Timeline
                            </th>
                            <th className="px-24 py-16 text-sm fw-semibold text-gray-900 text-start border-bottom border-gray-100">
                              Refund To
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["bKash / Nagad", "3-5 business days", "Original mobile wallet"],
                            ["Bank Transfer", "5-7 business days", "Original bank account"],
                            ["Cash on Delivery", "5-7 business days", "bKash / Bank account"],
                            ["Card Payment", "7-10 business days", "Original card"],
                          ].map(([method, timeline, refundTo], idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="px-24 py-12 text-sm text-gray-700 border-bottom border-gray-100">
                                {method}
                              </td>
                              <td className="px-24 py-12 text-sm text-gray-700 border-bottom border-gray-100">
                                {timeline}
                              </td>
                              <td className="px-24 py-12 text-sm text-gray-700 border-bottom border-gray-100">
                                {refundTo}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Section 4 */}
                <div id="exchange" className="mb-40">
                  <div className="flex-align gap-12 mb-16">
                    <span className="w-32 h-32 flex-center bg-main-600 text-white rounded-circle text-sm fw-bold flex-shrink-0">
                      4
                    </span>
                    <h5 className="mb-0">Exchange Policy</h5>
                  </div>
                  <div className="ps-44">
                    <p className="text-gray-700 mb-0">
                      If you received a defective or damaged item, or the wrong
                      product was delivered, we will exchange it free of charge.
                      Simply submit a return request and select{" "}
                      <strong>&quot;Exchange&quot;</strong> as the reason. The
                      replacement product will be shipped once we receive the
                      returned item. If the same product is unavailable, you
                      will receive a full refund.
                    </p>
                  </div>
                </div>

                {/* Section 5 */}
                <div id="non-returnable" className="mb-40">
                  <div className="flex-align gap-12 mb-16">
                    <span className="w-32 h-32 flex-center bg-danger-600 text-white rounded-circle text-sm fw-bold flex-shrink-0">
                      5
                    </span>
                    <h5 className="mb-0">Non-Returnable Items</h5>
                  </div>
                  <div className="ps-44">
                    <p className="text-gray-700 mb-16">
                      The following items cannot be returned or exchanged:
                    </p>
                    <div className="row g-3">
                      {[
                        "Perishable goods (food, flowers, etc.)",
                        "Personal care & hygiene products",
                        "Undergarments & innerwear",
                        "Customized or personalized items",
                        "Products with broken seals or tags removed",
                        "Gift cards & vouchers",
                      ].map((text, i) => (
                        <div className="col-sm-6" key={i}>
                          <div className="flex-align gap-8">
                            <span className="w-24 h-24 flex-center bg-danger-50 text-danger-600 rounded-circle text-xs flex-shrink-0">
                              <i className="ph-fill ph-x" />
                            </span>
                            <span className="text-gray-700 text-sm">{text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 6 */}
                <div id="damaged" className="mb-40">
                  <div className="flex-align gap-12 mb-16">
                    <span className="w-32 h-32 flex-center bg-main-600 text-white rounded-circle text-sm fw-bold flex-shrink-0">
                      6
                    </span>
                    <h5 className="mb-0">Damaged or Wrong Products</h5>
                  </div>
                  <div className="ps-44">
                    <div className="bg-main-50 rounded-16 p-24">
                      <p className="text-gray-700 mb-12">
                        If you received a damaged or wrong product, please:
                      </p>
                      <ul className="d-flex flex-column gap-8 mb-0">
                        <li className="flex-align gap-8">
                          <span className="w-24 h-24 flex-center bg-white text-main-600 rounded-circle text-xs fw-bold flex-shrink-0">
                            1
                          </span>
                          <span className="text-gray-700 text-sm">
                            Take photos/video of the damaged product and packaging.
                          </span>
                        </li>
                        <li className="flex-align gap-8">
                          <span className="w-24 h-24 flex-center bg-white text-main-600 rounded-circle text-xs fw-bold flex-shrink-0">
                            2
                          </span>
                          <span className="text-gray-700 text-sm">
                            Submit a return request within 48 hours of delivery.
                          </span>
                        </li>
                        <li className="flex-align gap-8">
                          <span className="w-24 h-24 flex-center bg-white text-main-600 rounded-circle text-xs fw-bold flex-shrink-0">
                            3
                          </span>
                          <span className="text-gray-700 text-sm">
                            Our team will arrange a free pickup and replacement/refund.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 7 - Contact */}
                <div id="contact">
                  <div className="flex-align gap-12 mb-16">
                    <span className="w-32 h-32 flex-center bg-main-600 text-white rounded-circle text-sm fw-bold flex-shrink-0">
                      7
                    </span>
                    <h5 className="mb-0">Need Help?</h5>
                  </div>
                  <div className="ps-44">
                    <p className="text-gray-700 mb-16">
                      If you have any questions about our return policy, feel
                      free to reach out to us:
                    </p>
                    <div className="d-flex flex-wrap gap-16">
                      <a
                        href="/contact"
                        className="btn btn-main rounded-pill py-12 px-24 text-sm fw-medium"
                      >
                        <i className="ph-fill ph-chats-teardrop me-8" />
                        Contact Support
                      </a>
                      <a
                        href="mailto:support24@Sobarbazarbd.com"
                        className="btn border border-main-600 text-main-600 rounded-pill py-12 px-24 text-sm fw-medium hover-bg-main-600 hover-text-white"
                      >
                        <i className="ph-fill ph-envelope me-8" />
                        Email Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
