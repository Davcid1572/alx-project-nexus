import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppSelector } from "@/utils/store/hooks";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const cartCount = useAppSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link
        onClick={() => setOpen(false)}
        href="/"
        className="text-2xl text-white hover:scale-105"
      >
        <Image
          src="/assets/images/logo.png"
          alt="App Logo"
          width={78.73}
          height={40.6}
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/contact">Contact</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={"assets/images/search_icon.svg"} alt="Search Icon" />
        </div>

        <div
          onClick={() => router.push("/cart")}
          className="relative cursor-pointer"
        >
          <img src={"assets/images/cart_icon.svg"} alt="Cart Icon" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-4.5 h-4.5 rounded-full">
            {cartCount}
          </button>
        </div>
        <div className="relative group">
          <img
            src={"assets/images/profile_icon.png"}
            alt="User Icon"
            className="w-10"
          />
          <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
            <li
              onClick={() => router.push("/order")}
              className="p-1.5 pl-3 hover:bg-indigo-300 cursor-pointer"
            >
              My orders
            </li>
          </ul>
        </div>
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <img src={"assets/images/menu_icon.svg"} alt="Menu Icon" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${open ? "flex" : "hidden"} absolute top-15 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}
      >
        <Link href="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link href="/products" onClick={() => setOpen(false)}>
          Products
        </Link>
        <Link href="/products" onClick={() => setOpen(false)}>
          My Orders
        </Link>
        <Link href="/contact" onClick={() => setOpen(false)}>
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Header;
