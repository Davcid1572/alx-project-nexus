import React from "react";
import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
import { setSelectedCategory } from "@/utils/store/slices/productsSlice";

// Helper to map API strings to your local assets
const categoryImages: Record<string, string> = {
  electronics: "/assets/images/electronics.png",
  jewelery: "/assets/images/jewelery.png",
  "men's clothing": "/assets/images/mens.png",
  "women's clothing": "/assets/images/womens.png",
};

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory, loading } = useAppSelector(
    (state) => state.products,
  );

  if (loading && categories.length === 0) return <p>Loading categories...</p>;

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium capitalize">Categories</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
        {/* "All" Category Option */}
        <div
          onClick={() => dispatch(setSelectedCategory(null))}
          className={`group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center border transition-all ${
            !selectedCategory
              ? "bg-gray-100 border-black"
              : "border-transparent bg-gray-50"
          }`}
        >
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center group-hover:scale-110 transition">
            📦
          </div>
          <p className="text-sm font-medium">All</p>
        </div>

        {/* API Categories */}
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => dispatch(setSelectedCategory(cat))}
            className={`group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center border transition-all ${
              selectedCategory === cat
                ? "bg-gray-100 border-black"
                : "border-transparent bg-gray-50"
            }`}
          >
            <img
              className="group-hover:scale-110 transition w-16 h-16 object-contain"
              src={categoryImages[cat] || "/assets/images/default.png"}
              alt={cat}
            />
            <p className="text-sm font-medium capitalize text-center">{cat}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
