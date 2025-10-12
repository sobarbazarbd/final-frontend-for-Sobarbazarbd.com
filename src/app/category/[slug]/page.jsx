import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FooterTwo from "@/components/FooterTwo";
import HeaderTwo from "@/components/HeaderTwo";
import ShippingTwo from "@/components/ShippingTwo";
import ColorInit from "@/helper/ColorInit";
import Preloader from "@/helper/Preloader";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

// 🔹 Demo products
const demoProducts = [
  { id: 1, name: "Organic Broccoli", price: "$12.00", image: "/assets/images/thumbs/product1.png", category: "vegetables", badge: "Sale 50%" },
  { id: 2, name: "Chicken Breast", price: "$18.99", image: "/assets/images/thumbs/product2.png", category: "fish-meats", badge: "New" },
  { id: 3, name: "Chocolate Cake", price: "$25.00", image: "/assets/images/thumbs/product3.png", category: "desserts", badge: "Best seller" },
  { id: 4, name: "Apple Juice", price: "$8.50", image: "/assets/images/thumbs/product4.png", category: "drinks-juice", badge: "Hot" },
  { id: 5, name: "Dog Food", price: "$14.00", image: "/assets/images/thumbs/product5.png", category: "animals-food", badge: "Sale 20%" },
  { id: 6, name: "Fresh Mango", price: "$11.00", image: "/assets/images/thumbs/product6.png", category: "fresh-fruits", badge: "New" },
  { id: 7, name: "Candy Mix", price: "$6.50", image: "/assets/images/thumbs/product7.png", category: "yummy-candy", badge: "Best seller" },
  { id: 8, name: "Egg Tray", price: "$10.00", image: "/assets/images/thumbs/product8.png", category: "dairy-eggs", badge: "Hot" },
  { id: 9, name: "Potato Chips", price: "$5.00", image: "/assets/images/thumbs/product9.png", category: "snacks", badge: "Sale 30%" },
  { id: 10, name: "Frozen Pizza", price: "$15.00", image: "/assets/images/thumbs/product10.png", category: "frozen-foods", badge: "New" },
];

const CategoryPage = ({ params }) => {
  const { slug } = params;

  const filteredProducts = demoProducts.filter((p) => p.category === slug);

  return (
    <>
      <ColorInit color={true} />
      <ScrollToTopInit color="#FA6400" />
      <Preloader />
      <HeaderTwo category={true} />
      <Breadcrumb title={slug.replace("-", " ")} />

      <section className="featured-products py-5">
        <div className="container container-lg">
          <div className="row g-4">
            {filteredProducts.length === 0 ? (
              <p className="text-muted">No products found for this category.</p>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-6 col-md-4 col-lg-3">
                  <div className="mt-24 product-card d-flex gap-16 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    <a
                      href={`/category/${slug}`}
                      className="product-card__thumb flex-center h-unset rounded-8 bg-gray-50 position-relative w-unset flex-shrink-0 p-24"
                    >
                      {product.badge && (
                        <span className="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                          {product.badge}
                        </span>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-auto max-w-unset"
                      />
                    </a>
                    <div className="product-card__content my-20 flex-grow-1 text-center">
                      <h6 className="title text-lg fw-semibold mb-12">
                        <a href={`/category/${slug}`} className="link text-line-2">
                          {product.name}
                        </a>
                      </h6>
                      <div className="product-card__price my-20">
                        <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                          {product.price}
                        </span>
                        <span className="text-heading text-md fw-semibold">
                          {product.price}{" "}
                          <span className="text-gray-500 fw-normal">/Qty</span>
                        </span>
                      </div>
                      <a
                        href="/cart"
                        className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                      >
                        Add To Cart <i className="ph ph-shopping-cart" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <ShippingTwo />
      <FooterTwo />
    </>
  );
};

export default CategoryPage;
