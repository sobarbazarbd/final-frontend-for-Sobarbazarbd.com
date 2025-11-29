import Link from "next/link";

export const metadata = {
  title: "Order Success - SobazarBd",
  description: "Your order has been placed successfully",
};

const OrderSuccessPage = () => {
  return (
    <section className="py-80">
      <div className="container container-lg">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="bg-color-three rounded-16 p-40">
              <div className="mb-32">
                <i className="ph ph-check-circle text-64 text-success-600"></i>
              </div>
              <h3 className="mb-16">Order Placed Successfully!</h3>
              <p className="text-gray-700 mb-32">
                Thank you for your order. We have received your order and will process it shortly.
                You will receive a confirmation call/SMS shortly.
              </p>
              <div className="flex-center gap-16 flex-wrap">
                <Link
                  href="/shop"
                  className="btn btn-main rounded-pill py-16 px-32"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccessPage;
