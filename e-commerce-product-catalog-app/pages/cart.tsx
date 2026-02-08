import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
import {
  addToCart,
  decreaseQty,
  removeFromCart,
} from "@/utils/store/slices/cartSlice";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { items, totalQuantity } = useAppSelector((state) => state.cart);

  // Calculate the total price of all items in the cart
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        <img
          src="/assets/images/cart_icon.svg"
          alt="Empty Cart"
          className="w-20 opacity-20 mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/products"
          className="bg-indigo-500 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-600 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10 min-h-screen bg-gray-50/30">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Side: Cart Items List */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="w-24 h-24 shrink-0 flex items-center justify-center">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="max-h-full object-contain"
                />
              </div>

              <div className="flex-1">
                <p className="text-xs text-indigo-500 uppercase font-semibold">
                  {item.product.category}
                </p>
                <h3 className="text-lg font-medium text-gray-800 line-clamp-1">
                  {item.product.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  ${item.product.price} each
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                <button
                  onClick={() => dispatch(decreaseQty(item.product.id))}
                  className="text-indigo-600 font-bold px-2 hover:scale-110 transition"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-indigo-700">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(addToCart(item.product))}
                  className="text-indigo-600 font-bold px-2 hover:scale-110 transition"
                >
                  +
                </button>
              </div>

              <div className="text-right sm:min-w-25">
                <p className="text-xl font-bold text-gray-800">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className="text-red-400 text-xs hover:text-red-600 mt-1 flex items-center gap-1 ml-auto"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-500">
                <span>Items ({totalQuantity})</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-4 border-t">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-indigo-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-600 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]">
              Proceed to Checkout
            </button>

            <Link
              href="/products"
              className="block text-center text-indigo-500 mt-4 text-sm font-medium hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
