import Categories from "@/components/Categories";
import MainBanner from "@/components/MainBanner";
import React from "react";

const index = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">
      <MainBanner />
      <Categories />
    </div>
  );
};

// export default index;
// import Categories from "@/components/Categories";
// import MainBanner from "@/components/MainBanner";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
// import {
//   fetchProducts,
//   fetchCategories,
// } from "@/utils/store/slices/productsSlice";

// const Index = () => {
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
//     <div className="px-6 md:px-16 lg:px-24 xl:px-32">
//       <MainBanner />

//       {/* Category Selection Section */}
//       <Categories />

//       {/* Product Display Section
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold mb-6 capitalize">
//           {selectedCategory ? selectedCategory : "All Products"}
//         </h2>

//         {loading && <p className="animate-pulse">Loading products...</p>}
//         {error && <p className="text-red-500">{error}</p>}

//         {!loading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="group border p-4 rounded-xl hover:shadow-lg transition"
//               >
//                 <div className="h-64 w-full flex items-center justify-center overflow-hidden">
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     className="max-h-full group-hover:scale-105 transition duration-300"
//                   />
//                 </div>
//                 <div className="mt-4">
//                   <p className="text-xs text-gray-500 uppercase">
//                     {product.category}
//                   </p>
//                   <h3 className="font-semibold line-clamp-2 h-12">
//                     {product.title}
//                   </h3>
//                   <p className="mt-2 font-bold text-lg">${product.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       // </div> */}
//     </div>
//   );
// };

export default index;
