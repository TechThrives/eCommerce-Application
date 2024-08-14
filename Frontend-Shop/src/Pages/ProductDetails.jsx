import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosConfig from "../Utils/axiosConfig";
import { useAppContext } from "../Features/AppContext";
import ReactStars from "react-rating-stars-component";
import { useWishListContext } from "../Features/WishListContext";
import Wrapper from "../Components/Wrapper";
import RelatedProductCard from "../Components/RelatedProductCard";
import ProductDetailsCarousel from "../Components/ProductDetailsCarousel";
import Logo from "../Components/Images/logo.svg";
import {
  IoIosCheckmarkCircle,
  IoMdStar,
  IoMdStarHalf,
  IoMdStarOutline,
} from "react-icons/io";

import { getDiscountedPricePercentage, notify } from "../Utils/Helper";
import { MdArrowForward } from "react-icons/md";
import { FaChevronRight, FaRegComment } from "react-icons/fa";
import { useCartContext } from "../Features/CartContext";
import Loader from "../Components/Loader";

const ProductDetails = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAppContext();
  const { wishListItems, wishListDispatch } = useWishListContext();
  const { cartItems, cartDispatch } = useCartContext();
  const [productDetails, setProductDetails] = useState({ category: {} });
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  // State to keep track of active tab
  const [activeTab, setActiveTab] = useState(1);

  // Function to handle tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleTextareaChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!user){
      notify("Please Sign in to write a review", "error");
      return;
    }
    // Validate inputs
    if (reviewText.trim() === "") {
      setError("Text cannot be empty.");
      return;
    } else if (rating === 0) {
      setError("Please provide a rating.");
      return;
    }
    // Handle form submission logic here
    const submissionData = {
      reviewText: reviewText,
      Rating: rating,
      ProductId: productDetails.id,
      Timestamp: new Date().toLocaleString(),
      UserId: "123", // This should be dynamic in a real application
    };
    console.log(submissionData);
    // Reset form fields and rating state
    setReviewText("");
    setRating(0);
    setError("");
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchReviews = async (productId) => {
      try {
        const response = await axiosConfig.get(
          `/api/reviews/product/${productId}?pageNo=0&pageSize=10`
        );
        if (response.data) {
          setReviews(response.data.content);
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

    const fetchRelatedProducts = async (categoryId) => {
      try {
        const response = await axiosConfig.get(`/api/products/category/${categoryId}?pageNo=0&pageSize=10`);
        if (response.data) {
          setRelatedProducts(response.data);
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

    const fetchProduct = async () => {
      try {
        const response = await axiosConfig.get(
          `/api/products/slug/${productSlug}`
        );
        if (response.data) {
          setProductDetails(response.data);
          fetchReviews(response.data.id);
          fetchRelatedProducts(response.data.category.id);
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          if (data.details && Array.isArray(data.details) && data.message) {
            notify(data.message || "An unexpected error occurred.", "error");
            navigate("/shop");
          }
        } else {
          notify("An unexpected error occurred.", "error");
        }
      }
      setIsLoading(false);
    };

    setActiveTab(1);
    fetchProduct();
  }, [productSlug]);

  const handleWishListClick = (item) => {
    const { id, name, shortDescription, image, price, originalPrice } = item;
    const payloadToAdd = {
      id,
      name,
      shortDescription,
      image,
      price,
      originalPrice,
    };
    const isInWishlist = wishListItems.wishList.some((item) => item.id === id);
    if (isInWishlist) {
      wishListDispatch({ type: "REMOVE_FROM_WISHLIST", payload: payloadToAdd });
      notify("Product removed from wishlist", "success");
    } else {
      wishListDispatch({ type: "ADD_TO_WISHLIST", payload: payloadToAdd });
      notify("Product added to wishlist", "success");
    }
  };

  const handleCartClick = (item) => {
    const { id, name, shortDescription, image, price, originalPrice } = item;
    const payloadToAdd = {
      id,
      name,
      shortDescription,
      image,
      price,
      originalPrice,
    };
    const isInCartList = cartItems.cart.some((item) => item.id === id);
    if (isInCartList) {
      cartDispatch({ type: "REMOVE_FROM_CART", payload: payloadToAdd });
      notify("Product removed from cart", "success");
    } else {
      cartDispatch({ type: "ADD_TO_CART", payload: payloadToAdd });
      notify("Product added to cart", "success");
    }
  };

  return (
    <div className="w-full">
      <Wrapper>
        {isLoading ? (
          <div className="w-full min-h-screen flex items-center justify-center bg-white absolute inset-0 z-10">
            <Loader />
          </div>
        ) : (
          <>
            <div className="mx-4 my-2 container relative">
              <div className="grid grid-cols-1">
                <h3 className="text-2xl leading-normal font-semibold">
                  {productDetails.name}
                </h3>
              </div>

              <div className="relative mt-3 mb-6">
                <ul className="tracking-[0.5px] mb-0 inline-block">
                  <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500">
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li className="inline-block text-base text-slate-950 mx-0.5">
                    <FaChevronRight className="text-[14px]" />
                  </li>
                  <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500">
                    <Link to={`/category/${productDetails.category.slug}`}>
                      {productDetails.category.name}
                    </Link>
                  </li>
                  <li className="inline-block text-base text-slate-950 mx-0.5">
                    <FaChevronRight className="text-[14px]" />
                  </li>
                  <li
                    className="inline-block uppercase text-[13px] font-bold text-orange-500"
                    aria-current="page"
                  >
                    {productDetails.name}
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3">
              {/* left column start */}
              <div className="flex-[1.5] w-full md:w-9/12 lg:max-w-[500px] mx-auto lg:mx-0">
                <ProductDetailsCarousel images={productDetails.imageUrls} />
              </div>
              {/* left column end */}

              {/* right column start */}
              <div className="flex-1 py-3">
                {/* PRODUCT TITLE */}
                <div className="text-xl font-semibold mb-2 leading-tight">
                  {productDetails.name}
                </div>

                {/* PRODUCT SUBTITLE */}
                <div className="text-lg font-semibold mb-2">
                  {productDetails.shortDescription}
                </div>
                <div>
                  <div className="text-md font-bold">Overview</div>
                  <span
                    className="text-md mb-6"
                    dangerouslySetInnerHTML={{
                      __html: productDetails.overview,
                    }}
                  />
                </div>

                {/* PRODUCT PRICE */}
                <div className="flex items-center mb-5">
                  <p className="mr-2 text-lg font-semibold">
                    MRP : &#8377;{productDetails.price}
                  </p>
                  {productDetails.originalPrice && (
                    <>
                      <p className="text-base  font-medium line-through">
                        &#8377;{productDetails.originalPrice}
                      </p>
                      <p className="ml-auto text-base font-semibold text-green-500">
                        {getDiscountedPricePercentage(
                          productDetails.originalPrice,
                          productDetails.price
                        )}
                        % off
                      </p>
                    </>
                  )}
                </div>

                <div className="">
                  <h4 className="mt-2 text-xl font-bold text-black">
                    Benefits
                  </h4>

                  <ul className="my-3 space-y-3 font-medium">
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <IoIosCheckmarkCircle className="w-5 h-5 text-blue-700" />
                      </div>
                      <p className="ml-3 leading-5 text-black">
                        <span className="font-bold">
                          24/7 Customer Support:
                        </span>{" "}
                        Round-the-clock assistance for technical queries and
                        troubleshooting.
                      </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <IoIosCheckmarkCircle className="w-5 h-5 text-blue-700" />
                      </div>
                      <p className="ml-3 leading-5 text-black">
                        <span className="font-bold">Documentation:</span>{" "}
                        Comprehensive guides for setup and customization.
                      </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <IoIosCheckmarkCircle className="w-5 h-5 text-blue-700" />
                      </div>
                      <p className="ml-3 leading-5 text-black">
                        <span className="font-bold">Global Reach:</span> Digital
                        products can be distributed globally, allowing customers
                        to shop from any location.
                      </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <IoIosCheckmarkCircle className="w-5 h-5 text-blue-700" />
                      </div>
                      <p className="ml-3 leading-5 text-black">
                        <span className="font-bold">
                          Secure Payment Options:
                        </span>{" "}
                        Variety of secure payment methods for safe transactions.
                      </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <IoIosCheckmarkCircle className="w-5 h-5 text-blue-700" />
                      </div>
                      <p className="ml-3 leading-5 text-black">
                        <span className="font-bold">Customer Reviews:</span>{" "}
                        Insights and reviews from satisfied users.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-row items-center justify-start gap-2">
                  {/* ADD TO CART BUTTON START */}
                  <button
                    className="w-48 py-4 rounded-full bg-black text-white text-md font-medium transition-transform active:scale-95 my-3 hover:opacity-75 flex items-center gap-2 justify-center"
                    onClick={() => handleCartClick(productDetails)}
                  >
                    Add to Cart
                  </button>
                  {/* ADD TO CART BUTTON END */}
                  {/* WHISHLIST BUTTON START */}
                  <button
                    onClick={() => handleWishListClick(productDetails)}
                    className="w-48 py-4 rounded-full border border-black text-md font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75"
                  >
                    Add to Wishlist
                  </button>
                  {/* WHISHLIST BUTTON END */}
                </div>
              </div>
              {/* right column end */}
            </div>

            <div className="my-10">
              <ul className="grid grid-flow-col text-center border-b gap-4 my-10">
                <li>
                  <span
                    onClick={() => handleTabChange(1)}
                    className={`flex justify-center border-b-4 cursor-pointer font-semibold ${
                      activeTab === 1
                        ? "text-stone-900 border-stone-900"
                        : "text-stone-600"
                    } hover:text-stone-900 hover:border-stone-900 py-4`}
                  >
                    Description
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => handleTabChange(2)}
                    className={`flex justify-center border-b-4 cursor-pointer font-semibold ${
                      activeTab === 2
                        ? "text-stone-900 border-stone-900"
                        : "text-stone-600"
                    } hover:text-stone-900 hover:border-stone-900 py-4`}
                  >
                    Reviews
                  </span>
                </li>
              </ul>
              <div className="mt-3 border-b pb-8">
                <div
                  id="description"
                  role="tabpanel"
                  aria-labelledby="description-label"
                  className={activeTab === 1 ? "" : "hidden"}
                >
                  <div>
                    <span
                      className="text-md mb-5"
                      dangerouslySetInnerHTML={{
                        __html: productDetails.description,
                      }}
                    />
                  </div>
                </div>
                <div
                  id="reviews"
                  role="tabpanel"
                  aria-labelledby="reviews-label"
                  className={activeTab === 2 ? "" : "hidden"}
                >
                  <div className="flex items-center justify-center">
                    <div className="w-[90%]">
                      {reviews.length > 0 ? (
                        reviews.map((review) => (
                          <div
                            key={review.id}
                            className="p-4 bg-gray-100 rounded-md shadow mt-6 w-full"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <img
                                  src={review.user.profileImageUrl}
                                  className="h-11 w-11 rounded-full shadow object-cover"
                                  alt=""
                                />

                                <div className="ms-3 flex-1">
                                  <span className="text-md font-semibold hover:text-orange-500 duration-500">
                                    {review.user.firstName}{" "}
                                    {review.user.lastName}
                                  </span>
                                  <p className="text-sm font-medium text-slate-600">
                                    {new Date(review.modifiedOn).toLocaleString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                      }
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <ReactStars
                              count={5}
                              value={review.rating}
                              edit={false}
                              size={24}
                              isHalf={true}
                              emptyIcon={<IoMdStarOutline />}
                              halfIcon={<IoMdStarHalf />}
                              fullIcon={<IoMdStar />}
                              activeColor="#ffd700"
                            />

                            <p className="text-stone-800 italic font-medium">
                              "{review.reviewText}"
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-lg font-semibold">
                          There are no reviews yet. Be the first to share your
                          feedback and help others make an informed decision!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* REVIEW FORM START */}
                <div className="flex flex-col p-6 mt-2 justify-center items-center">
                  <h5 className="text-xl font-semibold">Leave A Review</h5>
                  <div className="flex mt-6 w-full md:w-9/12">
                    <div className="mr-4 mt-2">
                      <img
                        src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg"
                        alt=""
                        className="max-w-full h-auto rounded-full border"
                        width="50"
                      />
                    </div>
                    <div className="flex-grow">
                      <div>
                        <div className="relative mt-2 mb-4">
                          <FaRegComment className="w-4 h-4 absolute top-3 start-4" />
                          <textarea
                            name="comments"
                            id="comments"
                            value={reviewText}
                            onChange={handleTextareaChange}
                            className="ps-11 w-full py-2 px-3 h-28 bg-transparent rounded outline-none border-2 border-gray-300 focus:ring-0"
                            placeholder="Message..."
                          ></textarea>
                          <p className="text-xs text-gray-500">
                            Press Shift + Enter to go to a new line
                          </p>
                          <ReactStars
                            key={rating} //For Force Update
                            count={5}
                            value={rating}
                            onChange={handleRatingChange}
                            size={24}
                            isHalf={true}
                            emptyIcon={<IoMdStarOutline />}
                            halfIcon={<IoMdStarHalf />}
                            fullIcon={<IoMdStar />}
                            activeColor="#ffd700"
                          />
                        </div>
                        {error && (
                          <p className="text-sm text-red-500 mb-2">{error}</p>
                        )}
                        <button
                          onClick={handleSubmit}
                          className="w-32 py-2 rounded-md bg-black text-white text-md font-medium transition-transform active:scale-95 hover:opacity-75"
                        >
                          Post Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              {/* REVIEW FORM END */}
            </div>

            <div className="grid items-end md:grid-cols-2">
              <div className="md:text-start text-center">
                <h5 className="font-semibold text-xl leading-normal">
                  You Might Also Like
                </h5>
              </div>

              <div className="md:text-end text-center md:block">
                <Link
                  to="/shop"
                  className="text-stone-900 hover:text-orange-500"
                >
                  <div className="flex items-center justify-center md:justify-end">
                    <span>See More Items</span>
                    <MdArrowForward className="text-[19px] md:text-[24px] ml-1" />
                  </div>
                </Link>
              </div>
            </div>

            {/* products grid start */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-5 my-8 px-5 md:px-0">
              {relatedProducts.map((product) => (
                <RelatedProductCard key={product.id} product={product} />
              ))}
            </div>
            {/* products grid end */}
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
