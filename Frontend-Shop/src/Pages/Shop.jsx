import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import ProductListCard from "../Components/ProductListCard";
import Logo from "../Components/Images/logo.svg";
import { MdSearch } from "react-icons/md";

export default function Shop() {
  const [data, setData] = useState([]);
  const [isLast, setIsLast] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const itemsPerPage = 10;
  const topResult = useRef(null);
  const currentPage = useRef(1);

  const prod_data = [
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

  const array = [
    {
      id: 1,
      name: "Item 1",
    },
    {
      id: 2,
      name: "Item 2",
    },
    { id: 3, name: "Item 3" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: topResult.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handlePrevPage = () => {
    if (currentPage.current > 1) {
      currentPage.current -= 1;
      fetchData();
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    currentPage.current += 1;
    fetchData();
    scrollToTop();
  };

  const handleValChange = (e) => {
    const { value } = e.target;
    setSearchVal(value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchFilterData = async () => {
    setIsLast(false);
    currentPage.current = 1;
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${itemsPerPage}&_page=${currentPage.current}`
      );
      const res_data = await res.json();
      setIsLast(res_data.length < itemsPerPage ? true : false);
      setData(prod_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${itemsPerPage}&_page=${currentPage.current}`
      );
      const res_data = await res.json();
      setIsLast(res_data.length < itemsPerPage ? true : false);
      setData(prod_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleItemSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <>
      <div className="w-full py-2 relative">
        <Wrapper>
          <div className="mx-4 my-2 container relative">
            <div className="grid grid-cols-1">
              <h3 className="text-2xl leading-normal font-semibold">Shop</h3>
            </div>

            <div className="relative mt-3">
              <ul className="tracking-[0.5px] mb-0 inline-block">
                <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-orange-500">
                  <Link to="/shop">Shop</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-12 sm:grid-cols-2 grid-cols-1 gap-6">
            <div className="lg:col-span-3 md:col-span-4 sm:col-span-2  mb-14">
              <div className="rounded p-4 sticky top-20">
                <h5 className="text-xl font-medium">Filter</h5>

                <div className="mt-4">
                  <div>
                    <label htmlFor="search" className="font-medium">
                      Search:
                    </label>
                    <div className="relative mt-2">
                      <MdSearch
                        className="size-8 cursor-pointer p-1 text-white rounded-lg bg-stone-950 text-[24px] absolute top-1 end-1"
                        onClick={fetchFilterData}
                      />
                      <input
                        type="text"
                        className="h-10 pe-10 rounded px-3 bg-white border-2 border-gray-300 focus:ring-0 outline-none w-full"
                        name="search"
                        value={searchVal}
                        onChange={handleValChange}
                        id="search"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium">Sizes:</h5>
                  <ul className="list-none mt-2 overflow-hidden">
                    {array.map((item) => (
                      <li
                        key={item.id}
                        className={`mx-1 mb-1 font-semibold p-1 cursor-pointer inline-flex items-center justify-center tracking-wide align-middle text-xs text-center rounded-md border-[1.5px] border-stone-950 text-black/[0.8] hover:text-white hover:bg-stone-950 ${
                          selectedItems.includes(item.id)
                            ? "bg-stone-950 text-white"
                            : ""
                        }`}
                        onClick={() => toggleItemSelection(item.id)}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <label htmlFor="sort-by" className="font-medium">
                    Sort by:
                  </label>
                  <select
                    name="sort-by"
                    id="sort-by"
                    className="relative mt-2 form-select form-input w-full py-2 px-3 h-10 bg-transparent rounded outline-none border-2 border-gray-300 focus:ring-1"
                  >
                    <option value="">Price Low-High</option>
                    <option value="">Price High-Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-9 md:col-span-8 sm:col-span-2">
              <div className="md:flex justify-between items-center my-3">
                <span ref={topResult} className="font-semibold">
                  Showing 1-10 of 40 items
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 mb-10">
                {data.map((product) => (
                  <ProductListCard key={product.id} product={product} />
                ))}
              </div>

              {/* PAGINATION BUTTONS START */}

              <div className="flex gap-3 items-center justify-center my-14">
                <button
                  className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                  disabled={currentPage.current === 1}
                  onClick={handlePrevPage}
                >
                  Previous
                </button>

                <span className="font-bold">{`${currentPage.current} of ${data.pageCount}`}</span>

                <button
                  className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                  disabled={isLast}
                  onClick={handleNextPage}
                >
                  Next
                </button>
              </div>

              {/* PAGINATION BUTTONS END */}
              {isLoading && (
                <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
                  <img src={Logo} width={150} alt="" />
                  <span className="text-2xl font-medium">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
