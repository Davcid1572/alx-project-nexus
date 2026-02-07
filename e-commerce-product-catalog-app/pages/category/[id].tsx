import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
import { fetchProducts } from "@/utils/store/slices/productsSlice";

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query; // This gets the category name from the URL
  const dispatch = useAppDispatch();

  const { items, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  // Filter products based on the URL ID
  const filteredProducts = items.filter((product) => product.category === id);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <h1 className="text-3xl font-bold capitalize mb-8">{id}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-xl shadow-sm">
            <img
              src={product.image}
              alt={product.title}
              className="h-48 mx-auto object-contain"
            />
            <h2 className="mt-4 font-semibold line-clamp-2">{product.title}</h2>
            <p className="text-xl font-bold mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
