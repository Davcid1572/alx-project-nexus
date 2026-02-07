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

import React, { useEffect } from "react";
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

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [dispatch, items.length]);

  // Scroll to top when category changes so user sees the start of the new list
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCategory]);

  const filteredProducts = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <section className="mt-12 mb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold capitalize text-gray-800 tracking-tight">
          {selectedCategory || "All Products"}
        </h2>
        <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
          {filteredProducts.length} Items
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-80 w-full bg-gray-100 animate-pulse rounded-xl border border-gray-100"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 text-center">
          <p className="font-medium">Oops! We couldn't load the products.</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-2 text-sm underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {/* Main Grid using ProductCard */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-32 border-2 border-dashed border-gray-100 rounded-2xl">
          <p className="text-gray-400 text-lg italic">
            No items found in this category.
          </p>
        </div>
      )}
    </section>
  );
};

export default Products;
