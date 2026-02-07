// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
// import {
//   fetchCategories,
//   setSelectedCategory,
// } from "@/utils/store/slices/productsSlice";

// // Mapping the API strings to the images you saved
// const categoryData: Record<string, { img: string; label: string }> = {
//   electronics: { img: "/assets/images/electronics.png", label: "Electronics" },
//   jewelery: { img: "/assets/images/jewelry.png", label: "Jewelry" },
//   "men's clothing": { img: "/assets/images/mens.png", label: "Men's Fashion" },
//   "women's clothing": {
//     img: "/assets/images/womens.png",
//     label: "Women's Fashion",
//   },
// };

// const Categories = () => {
//   const dispatch = useAppDispatch();
//   const { categories, selectedCategory, loading } = useAppSelector(
//     (state) => state.products,
//   );

//   // Fetch only categories when this component mounts
//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   if (loading && categories.length === 0) {
//     return <div className="mt-16 text-center">Loading categories...</div>;
//   }

//   return (
//     <div className="my-16">
//       <p className="text-2xl md:text-3xl font-medium capitalize text-gray-800">
//         Browse by Category
//       </p>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
//         {/* Optional: "All" button to clear filters */}
//         <div
//           onClick={() => dispatch(setSelectedCategory(null))}
//           className={`group cursor-pointer py-6 px-4 rounded-xl flex flex-col items-center border transition-all ${
//             !selectedCategory
//               ? "border-black bg-gray-50"
//               : "border-gray-100 hover:border-gray-300"
//           }`}
//         >
//           <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gray-200 rounded-full group-hover:scale-110 transition">
//             📦
//           </div>
//           <p className="text-sm font-semibold">All Items</p>
//         </div>

//         {/* Dynamic API Categories */}
//         {categories.map((cat) => (
//           <div
//             key={cat}
//             onClick={() => dispatch(setSelectedCategory(cat))}
//             className={`group cursor-pointer py-6 px-4 rounded-xl flex flex-col items-center border transition-all ${
//               selectedCategory === cat
//                 ? "border-black bg-gray-50"
//                 : "border-gray-100 hover:border-gray-300"
//             }`}
//           >
//             <div className="w-20 h-20 mb-3 flex items-center justify-center overflow-hidden">
//               <img
//                 className="group-hover:scale-110 transition duration-300 object-contain max-h-full"
//                 src={categoryData[cat]?.img || "/assets/images/default.png"}
//                 alt={cat}
//               />
//             </div>
//             <p className="text-sm font-semibold capitalize text-center">
//               {categoryData[cat]?.label || cat}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Categories;

import React, { useEffect } from "react";
import { useRouter } from "next/router"; // Import router
import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
import { fetchCategories } from "@/utils/store/slices/productsSlice";

const categoryData: Record<string, { img: string; label: string }> = {
  electronics: { img: "/assets/images/electronics.png", label: "Electronics" },
  jewelery: { img: "/assets/images/jewelry.png", label: "Jewelry" },
  "men's clothing": { img: "/assets/images/mens.png", label: "Men's Fashion" },
  "women's clothing": {
    img: "/assets/images/womens.png",
    label: "Women's Fashion",
  },
};

const Categories = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (cat: string | null) => {
    if (!cat) {
      router.push("/"); // Go home for "All Items"
    } else {
      // Navigate to /category/electronics, etc.
      // encodeURIComponent handles spaces in "men's clothing"
      router.push(`/category/${encodeURIComponent(cat)}`);
    }
  };

  if (loading && categories.length === 0) return <div>Loading...</div>;

  return (
    <div className="my-16">
      <p className="text-2xl md:text-3xl font-medium capitalize text-gray-800">
        Browse by Category
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {/* All Items Button */}
        <div
          onClick={() => handleCategoryClick(null)}
          className="group cursor-pointer py-6 px-4 rounded-xl flex flex-col items-center border border-gray-100 hover:border-black transition-all"
        >
          <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gray-200 rounded-full group-hover:scale-110 transition">
            📦
          </div>
          <p className="text-sm font-semibold">All Items</p>
        </div>

        {/* Dynamic Categories */}
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className="group cursor-pointer py-6 px-4 rounded-xl flex flex-col items-center border border-gray-100 hover:border-black transition-all"
          >
            <div className="w-20 h-20 mb-3 flex items-center justify-center overflow-hidden">
              <img
                className="group-hover:scale-110 transition duration-300 object-contain max-h-full"
                src={categoryData[cat]?.img || "/assets/images/default.png"}
                alt={cat}
              />
            </div>
            <p className="text-sm font-semibold capitalize text-center">
              {categoryData[cat]?.label || cat}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
