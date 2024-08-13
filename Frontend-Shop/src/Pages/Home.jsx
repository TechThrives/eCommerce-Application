import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import ProductCard from "../Components/ProductCard";
import HeroBanner from "../Components/HeroBanner";
import { MdArrowForward } from "react-icons/md";
import { notify } from "../Utils/Helper";
import axiosConfig from "../Utils/axiosConfig";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosConfig.get(`/api/products/top/10`);
        if (response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          if (data.details && Array.isArray(data.details) && data.message) {
            notify(data.message || "An unexpected error occurred.", "error");
          }
        } else {
          notify("An unexpected error occurred.", "error");
        }
      }
    };

    fetchProducts();
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
          {products.map((product) => (
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* products grid end */}
      </Wrapper>
    </>
  );
}
