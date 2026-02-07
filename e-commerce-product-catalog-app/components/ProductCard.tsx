import React from "react";
import { Product } from "@/interfaces"; // Assuming your interface is here

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full">
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition h-32 md:h-40 object-contain"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="text-gray-500/60 text-sm mt-2">
        <p className="capitalize">{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product.title}
        </p>

        {/* Rating Section */}
        <div className="flex items-center gap-0.5">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <svg
                key={i}
                width="14"
                height="13"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                  fill="#615fff"
                  fillOpacity={product.rating.rate > i ? "1" : "0.35"}
                />
              </svg>
            ))}
          <p className="ml-1 text-xs">({product.rating.count})</p>
        </div>

        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-indigo-500">
            ${product.price}
          </p>
          <div className="text-indigo-500">
            {count === 0 ? (
              <button
                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-20 w-16 h-8.5 rounded text-indigo-600 font-medium"
                onClick={() => setCount(1)}
              >
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-8.5 bg-indigo-500 rounded text-white select-none">
                <button onClick={() => setCount((p) => Math.max(p - 1, 0))}>
                  -
                </button>
                <span>{count}</span>
                <button onClick={() => setCount((p) => p + 1)}>+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
