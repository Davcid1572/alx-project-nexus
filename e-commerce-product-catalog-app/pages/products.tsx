// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
// import {
//   fetchProducts,
//   fetchCategories,
// } from "@/utils/store/slices/productsSlice";

// const products = () => {
//   const dispatch = useAppDispatch();

//   // Get products and the selected category from the store
//   const { items, selectedCategory, loading, error } = useAppSelector(
//     (state) => state.products,
//   );

//   // 1. Fetch data on mount
//   useEffect(() => {
//     dispatch(fetchProducts());
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   // 2. Filter logic: If a category is selected, filter the items.
//   // Otherwise, show everything.
//   const filteredProducts = selectedCategory
//     ? items.filter((item) => item.category === selectedCategory)
//     : items;

//   return (
//     <div className="mt-12">
//       <h2 className="text-2xl font-bold mb-6 capitalize">
//         {selectedCategory ? selectedCategory : "All Products"}
//       </h2>

//       {loading && <p className="animate-pulse">Loading products...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredProducts.map((product) => (
//             <div
//               key={product.id}
//               className="group border p-4 rounded-xl hover:shadow-lg transition"
//             >
//               <div className="h-64 w-full flex items-center justify-center overflow-hidden">
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   className="max-h-full group-hover:scale-105 transition duration-300"
//                 />
//               </div>
//               <div className="mt-4">
//                 <p className="text-xs text-gray-500 uppercase">
//                   {product.category}
//                 </p>
//                 <h3 className="font-semibold line-clamp-2 h-12">
//                   {product.title}
//                 </h3>
//                 <p className="mt-2 font-bold text-lg">${product.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default products;

// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
// import {
//   fetchProducts,
//   fetchCategories,
// } from "@/utils/store/slices/productsSlice";
// import ProductCard from "@/components/ProductCard";

// const Products = () => {
//   const dispatch = useAppDispatch();
//   const { items, selectedCategory, loading, error } = useAppSelector(
//     (state) => state.products,
//   );

//   useEffect(() => {
//     if (items.length === 0) {
//       dispatch(fetchProducts());
//       dispatch(fetchCategories());
//     }
//   }, [dispatch, items.length]);

//   // Scroll to top when category changes so user sees the start of the new list
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [selectedCategory]);

//   const filteredProducts = selectedCategory
//     ? items.filter((item) => item.category === selectedCategory)
//     : items;

//   return (
//     <section className="mt-12 mb-20">
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-2xl md:text-3xl font-bold capitalize text-gray-800 tracking-tight">
//           {selectedCategory || "All Products"}
//         </h2>
//         <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
//           {filteredProducts.length} Items
//         </div>
//       </div>

//       {/* Loading Skeletons */}
//       {loading && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//           {[...Array(10)].map((_, i) => (
//             <div
//               key={i}
//               className="h-80 w-full bg-gray-100 animate-pulse rounded-xl border border-gray-100"
//             />
//           ))}
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 text-center">
//           <p className="font-medium">Oops! We couldn't load the products.</p>
//           <button
//             onClick={() => dispatch(fetchProducts())}
//             className="mt-2 text-sm underline hover:text-red-800"
//           >
//             Try again
//           </button>
//         </div>
//       )}

//       {/* Main Grid using ProductCard */}
//       {!loading && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
//           {filteredProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && filteredProducts.length === 0 && (
//         <div className="text-center py-32 border-2 border-dashed border-gray-100 rounded-2xl">
//           <p className="text-gray-400 text-lg italic">
//             No items found in this category.
//           </p>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Products;

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
import {
  fetchProducts,
  fetchCategories,
} from "@/utils/store/slices/productsSlice";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const dispatch = useAppDispatch();
  const { items, selectedCategory, loading, error } = useAppSelector(
    (state) => state.products,
  );

  // 1. Create a state to track the current sort order
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">(
    "default",
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [dispatch, items.length]);

  // 2. Filter products by category first
  const filteredProducts = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  // 3. Apply sorting logic to the filtered list
  // We use [...array] to create a copy because .sort() modifies the original array
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price; // Low to High
    } else if (sortOrder === "desc") {
      return b.price - a.price; // High to Low
    }
    return 0; // Default (API order)
  });

  return (
    <div className="mt-12 min-h-[400px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold capitalize text-gray-800">
            {selectedCategory ? selectedCategory : "All Products"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {sortedProducts.length} items found
          </p>
        </div>

        {/* 4. The Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer"
          >
            <option value="default">Featured</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-72 w-full bg-gray-100 animate-pulse rounded-md"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          <p>Error loading products: {error}</p>
        </div>
      )}

      {/* 5. Render the Sorted List */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!loading && sortedProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No products found.
        </div>
      )}
    </div>
  );
};

export default Products;
