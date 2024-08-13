import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import axiosConfig from "../Utils/axiosConfig";
import { notify } from "../Utils/Helper";
import ProductListCard from "../Components/ProductListCard";
import Loader from "../Components/Loader";
import { MdSearch } from "react-icons/md";
import AutoCompleteInput from "../Components/AutoCompleteInput";
import debounce from "lodash.debounce";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const pageSize = 10;
  const topResult = useRef(null);

  const scrollToTop = useCallback(() => {
    if (topResult.current) {
      window.scrollTo({
        top: topResult.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  // Debounced fetch function
  const fetchProducts = useCallback(
    debounce(async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();

        if (searchVal) queryParams.append("searchVal", searchVal);
        if (selectedTags.length > 0)
          queryParams.append("tags", selectedTags.join(","));
        if (minPrice) queryParams.append("minPrice", minPrice);
        if (maxPrice) queryParams.append("maxPrice", maxPrice);
        if (sortBy) queryParams.append("sortBy", sortBy);

        queryParams.append("pageNo", currentPage - 1);
        queryParams.append("pageSize", pageSize);

        const response = await axiosConfig.get(
          `/api/products?${queryParams.toString()}`
        );
        if (response.data) {
          setProducts(response.data.content);
          setTotalPages(response.data.totalPages);
          setTotalElements(response.data.totalElements);
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
      setIsLoading(false);
    }, 500), // Debounce delay
    [searchVal, selectedTags, minPrice, maxPrice, sortBy, currentPage]
  );

  useEffect(() => {
    fetchProducts();
    scrollToTop();
  }, [currentPage, fetchProducts, scrollToTop]);

  const handleValChange = (e) => {
    setSearchVal(e.target.value);
    fetchProducts(); // Call fetchProducts for search input change
  };

  const toggleItemSelection = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleApplyFilters = () => {
    setCurrentPage(1); // Reset to first page when applying filters
    fetchProducts();
  };

  return (
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
          <div className="lg:col-span-3 md:col-span-4 sm:col-span-2 mb-14">
            <div className="rounded p-4 sticky top-20">
              <h5 className="text-xl font-medium">Filter</h5>

              <div className="mt-4">
                <label htmlFor="search" className="font-medium">
                  Search:
                </label>
                <div className="relative mt-2">
                  <MdSearch
                    className="size-8 cursor-pointer p-1 text-white rounded-lg bg-stone-950 text-[24px] absolute top-1 end-1"
                    onClick={handleApplyFilters}
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

              <div className="mt-4">
                <label htmlFor="tags" className="font-medium">
                  Tags:
                </label>
                <div className="relative mt-2">
                  <AutoCompleteInput
                    onTagSelect={toggleItemSelection}
                    selectedTags={selectedTags}
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap items-end gap-2 mb-2 w-full">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1.5 py-0.5 px-1.5 text-xs font-medium bg-gray-100 text-black"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => toggleItemSelection(tag)}
                          className="focus:outline-none"
                        >
                          <svg
                            className="w-4 h-4 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
              </div>

              <div className="mt-4">
                <label htmlFor="sort-by" className="font-medium">
                  Sort by:
                </label>
                <select
                  name="sort-by"
                  id="sort-by"
                  className="relative mt-2 form-select form-input w-full py-2 px-3 h-10 bg-transparent rounded outline-none border-2 border-gray-300 focus:ring-1"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="priceAsc">Price Low-High</option>
                  <option value="priceDesc">Price High-Low</option>
                  <option value="avgRatingAsc">Rating Low-High</option>
                  <option value="avgRatingDesc">Rating High-Low</option>
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="min-price" className="font-medium">
                  Minimum Price:
                </label>
                <input
                  type="number"
                  id="min-price"
                  name="min-price"
                  className="relative mt-2 form-input w-full py-2 px-3 h-10 bg-transparent rounded outline-none border-2 border-gray-300 focus:ring-1"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="max-price" className="font-medium">
                  Maximum Price:
                </label>
                <input
                  type="number"
                  id="max-price"
                  name="max-price"
                  className="relative mt-2 form-input w-full py-2 px-3 h-10 bg-transparent rounded outline-none border-2 border-gray-300 focus:ring-1"
                  placeholder="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <button
                  className="w-full py-2 bg-stone-950 text-white rounded"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-9 md:col-span-8 sm:col-span-2">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-white bg-opacity-50 absolute inset-0 z-10">
                <Loader />
              </div>
            ) : (
              <>
                <div className="md:flex justify-between items-center my-3">
                  <span ref={topResult} className="font-semibold">
                    Showing{" "}
                    {totalPages > 0 ? (currentPage - 1) * pageSize + 1 : 0}-
                    {Math.min(currentPage * pageSize, totalElements)} of{" "}
                    {totalElements} items
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-10">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <ProductListCard key={product.id} product={product} />
                    ))
                  ) : (
                    <p>No products found.</p>
                  )}
                </div>

                <div className="flex gap-3 items-center justify-center my-14">
                  <button
                    className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    Previous
                  </button>

                  <span className="font-bold">
                    {totalPages > 0
                      ? `${currentPage} of ${totalPages}`
                      : " 0 of 0"}
                  </span>

                  <button
                    className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                    disabled={currentPage >= totalPages || totalPages === 0}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
}