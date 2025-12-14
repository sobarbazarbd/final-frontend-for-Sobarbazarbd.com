"use client";

import React, { useMemo } from "react";
import ProductTabSection from "./ProductTabSection";

const RecommendedOne = ({ data = [] }) => {
  const subcategories = useMemo(() => {
    const subs = [];
    data.forEach((product) => {
      product.subcategories?.forEach((sub) => {
        if (sub && !subs.find((s) => s.id === sub.id)) {
          subs.push(sub);
        }
      });
    });
    return subs;
  }, [data]);

  const productsWithCategories = data.map((product) => ({
    ...product,
    categories: product.subcategories || [],
  }));

  return (
    <ProductTabSection
      sectionTitle="Recommended for you"
      categories={subcategories}
      data={productsWithCategories}
      tabClassName="common-tab nav-pills"
    />
  );
};

export default RecommendedOne;
