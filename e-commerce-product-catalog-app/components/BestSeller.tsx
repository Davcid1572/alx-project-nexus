import React from "react";
import ProductCard from "./ProductCard";
import { useAppSelector } from "@/utils/store/hooks";

const BestSeller = () => {
  // 1. Grab items from Redux store
  const { items, loading } = useAppSelector((state) => state.products);

  // 2. Sort by the number of reviews (rating.count) to find "Best Sellers"
  // We take a slice of the top 5 or 6 items
  const bestSellers = [...items]
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, 5);

  if (loading && items.length === 0) return null;

  return (
    <div className="my-16">
      <p className="text-2xl md:text-3xl font-medium capitalize text-gray-800">
        Best Sellers
      </p>
      {/* 3. Setup the responsive grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
