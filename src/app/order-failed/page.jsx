import Link from "next/link";

export const metadata = {
  title: "Payment Failed - SobazarBd",
  description: "Payment failed",
};

const OrderFailedPage = () => {
  return (
    <section className="py-80">
      <div className="container container-lg">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="bg-color-three rounded-16 p-40">
              <div className="mb-32">
                <i className="ph ph-x-circle text-64 text-danger-600"></i>
              </div>
              <h3 className="mb-16">Payment Failed!</h3>
              <p className="text-gray-700 mb-32">
                Unfortunately, your payment could not be processed. 
                Please try again or contact our support team.
              </p>
              <div className="flex-center gap-16 flex-wrap">
                <Link
                  href="/checkout"
                  className="btn btn-main rounded-pill py-16 px-32"
                >
                  Try Again
                </Link>
                <Link
                  href="/contact"
                  className="btn btn-outline-main rounded-pill py-16 px-32"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderFailedPage;
