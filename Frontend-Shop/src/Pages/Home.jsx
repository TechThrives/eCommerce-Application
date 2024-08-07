import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import ProductCard from "../Components/ProductCard";
import HeroBanner from "../Components/HeroBanner";
import { MdArrowForward } from "react-icons/md";

export default function Home() {
  const [topProducts, setTopProducts] = useState([]);
  const fetchTopTenProducts = async () => {
    const data = [
      {
        id: "1",
        name: "Gaming Laptop",
        shortDescription: "Powerful gaming laptop",
        image: "https://placehold.co/500x500.png",
        price: 1000,
        original_price: 1500,
      },
      {
        id: "2",
        name: "Mechanical Keyboard Mechanical Keyboard Customizable RGB keyboard RGB keyboard RGB keyboard RRGB keyboardRGB keyboardRGB keyCustomizable RGB keyboard RGB keyboard RGB keyboard RRGB keyboardRGB keyboardRGB keyCustomizable RGB keyboard RGB keyboard RGB keyboard RRGB keyboardRGB keyboardRGB key",
        shortDescription:
          "Customizable RGB keyboard RGB keyboard RGB keyboard R RGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboard RGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardRGB keyboardGB keyboard RGB keyboard RGB keyboard",
        image: "https://placehold.co/500x500.png",
        price: 10000000000000000000,
        original_price: 15000000000000000000,
      },
      {
        id: "3",
        name: "Wireless Mouse",
        shortDescription: "Ergonomic wireless mouse",
        image: "https://placehold.co/500x500.png",
        price: 1000,
        original_price: 1500,
      },
      {
        id: "4",
        name: "Gaming Monitor",
        shortDescription: "High refresh rate gaming monitor",
        image: "https://placehold.co/500x500.png",
        price: 1000,
        original_price: 1500,
      },
      {
        id: "5",
        name: "Graphics Card",
        shortDescription: "Powerful graphics card for gaming",
        image: "https://placehold.co/500x500.png",
        price: 1000,
        original_price: 1500,
      },
      {
        id: "6",
        name: "CPU Cooler",
        shortDescription: "Liquid cooling CPU cooler",
        image: "https://placehold.co/500x500.png",
        price: 1000,
        original_price: 1500,
      },
      {
        id: "7",
        name: "Gaming Headset",
        shortDescription: "Immersive gaming headset with surround sound",
        image: "https://placehold.co/500x500.png",
        price: 1000,
        original_price: 1500,
      },
      {
        id: "8",
        name: "Gaming Chair",
        shortDescription: "Ergonomic gaming chair with lumbar support",
        image: "https://placehold.co/500x500.png",
        price: 1000,
        original_price: 1500,
      },
      {
        id: "9",
        name: "SSD Drive",
        shortDescription: "High-speed SSD storage drive",
        image: "https://placehold.co/500x500.png",
        price: 1000,
        original_price: 1500,
      },
      {
        id: "10",
        name: "Gaming Router",
        shortDescription: "High-performance gaming router",
        image: "https://placehold.co/500x500.png",
        price: 1000,
        original_price: 1500,
      },
    ];

    setTopProducts(data);
  };

  useEffect(() => {
    fetchTopTenProducts();
  }, []);
  return (
    <>
      <HeroBanner />
      <Wrapper>
        {/* heading and paragraph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX mid range console is combined with
            increased stack heights to help provide cushioning during extended
            stretches of running.
          </div>
        </div>
        {/* heading and paragraph end */}

        <div className="grid grid-cols-1 justify-center text-center mb-6">
          <h5 className="font-semibold text-3xl leading-normal mb-4">
            New Arrival Products
          </h5>
          <p className="text-slate-400 max-w-xl mx-auto">
            Shop the latest products from the most popular collections
          </p>
        </div>
        {/* products grid start */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-5 my-14 px-5 md:px-0">
          {topProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* products grid end */}

        <div className="grid items-end md:grid-cols-2 mb-6">
          <div className="md:text-start text-center">
            <h5 className="font-semibold text-3xl leading-normal mb-4">
              Trending Items
            </h5>
            <p className="text-slate-400 max-w-xl">
              Shop the latest products from the most popular items
            </p>
          </div>

          <div className="md:text-end text-center md:block">
            <Link to="/shop" className="text-stone-900 hover:text-orange-500">
              <div className="flex items-center justify-center md:justify-end">
                <span>See More Items</span>
                <MdArrowForward className="text-[19px] md:text-[24px] ml-1" />
              </div>
            </Link>
          </div>
        </div>
        {/* products grid start */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-5 my-14 px-5 md:px-0">
          {topProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* products grid end */}
      </Wrapper>
    </>
  );
}
