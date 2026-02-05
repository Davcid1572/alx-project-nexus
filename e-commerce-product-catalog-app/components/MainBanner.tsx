import React from "react";
import Link from "next/link";

const MainBanner = () => {
  return (
    <div className="relative">
      <img
        src={"/assets/images/mainbanner_bg.png"}
        alt="Main Banner"
        className="w-full hidden md:block"
      />
      <img
        src={"/assets/images/mainbanner_bg_sm.png"}
        alt="Main Banner small"
        className="w-full md:hidden"
      />
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18  lg:pl-24 z-100">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">
          Qualities You Can Trust, Savings You Will Love!
        </h1>
      </div>
      <div className="flex items-center mt-6 ml-3 font-medium ">
        <Link
          className="group z-100  flex items-center gap-2 px-7 md:px-9 py-3 bg-amber-400 hover:bg-amber-200 transition rounded text-white cursor-pointer"
          href="/products"
        >
          Shop Now
          <img
            className="md:hidden transition group-focus:translate-x-1"
            src={"/assets/images/white_arrow_icon.svg"}
            alt="Shop Now Arrow"
          />
        </Link>
        <Link
          className="group z-100 hidden md:flex items-center gap-2 px-9 py-3"
          href="/products"
        >
          Explore deals
          <img
            className=" transition group-focus:translate-x-1"
            src={"/assets/images/black_arrow_icon.svg"}
            alt="Shop Now Arrow"
          />
        </Link>
      </div>
    </div>
  );
};

export default MainBanner;
