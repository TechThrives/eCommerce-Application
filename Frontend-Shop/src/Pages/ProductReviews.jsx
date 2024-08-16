import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axiosConfig from "../Utils/axiosConfig";
import { notify } from "../Utils/Helper";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import Pagination from "../Components/Pagination";
import Loader from "../Components/Loader";
import Wrapper from "../Components/Wrapper";

export default function ProductReviews() {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [reviewsDetails, setReviewsDetails] = useState({avgRating:0,product:{imageUrls:[] },reviewDistribution:[]});
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 10;
  const topResult = useRef(null);

  const reviewDistributionFormatter = (reviewDistribution) =>
    reviewDistribution.map((item) => {
      let color;
      switch (item.stars) {
        case 2:
          color = "bg-yellow-500";
          break;
        case 1:
          color = "bg-red-500";
          break;
        default:
          color = "bg-green-500";
      }

      return { ...item, color };
    });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const scrollToTop = useCallback(() => {
    if (topResult.current) {
      window.scrollTo({
        top: topResult.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const fetchReviewsDetails = async () => {
      try {
        const response = await axiosConfig.get(
          `/api/reviews/product-summary/slug/${productSlug}`
        );
        if (response.data) {
          setReviewsDetails({...response.data, reviewDistribution:reviewDistributionFormatter(response.data.reviewDistribution)});
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

    const fetchReviews = async () => {
      try {
        const response = await axiosConfig.get(
          `/api/reviews/product/slug/${productSlug}?pageNo=${currentPage - 1}&pageSize=${pageSize}`
        );
        if (response.data) {
          setReviews(response.data.content);
          setTotalPages(response.data.totalPages);
          setTotalElements(response.data.totalElements);
          fetchReviewsDetails();
          scrollToTop();
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
    setIsLoading(true);
    fetchReviews();
  }, [productSlug, currentPage, scrollToTop]);

  return (
    <div className="w-full">
      <Wrapper>
        {isLoading ? (
          <div className="w-full min-h-screen flex items-center justify-center bg-white absolute inset-0 z-10">
            <Loader />
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="m-4">
              <div className="text-lg font-bold">
                {reviewsDetails.product.name}
              </div>
              <div className="text-sm text-gray-500">
              {reviewsDetails.product.overview}
              </div>
            </div>
            {/* Summary Section */}
            <div className="flex flex-col justify-center items-center gap-6 sm:flex-row bg-white shadow rounded-lg p-6 mb-4">
              <img
                className="min-w-48 min-h-48 h-48 w-48 object-cover rounded-md group-hover:scale-110 duration-500"
                src={reviewsDetails.product.imageUrls[0]}
                alt="product"
              />
              <div className="flex flex-col gap-2 justify-center text-center items-center">
                <div className="text-2xl font-bold">
                {reviewsDetails.avgRating.toFixed(1)} <span className="text-yellow-400">★</span>
                </div>
                <div>
                  <div className="text-gray-700 text-wrap">
                    Based on {totalElements} reviews
                  </div>
                </div>
              </div>
              <div className="flex mt-4 flex-col w-full">
                {reviewsDetails.reviewDistribution.map((item, index) => (
                  <div key={index} className="flex items-center mb-1">
                    <div className="flex w-12 text-sm justify-center items-center">
                      {item.stars}
                      <span className="text-yellow-400 text-lg">★</span>
                    </div>
                    <div className="bg-gray-200 w-full rounded">
                      <div
                        className={`h-2 rounded ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <div className="ml-2 text-sm w-6">{item.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Reviews</h2>
              <span ref={topResult} className="font-semibold">
                Showing {totalPages > 0 ? (currentPage - 1) * pageSize + 1 : 0}-
                {Math.min(currentPage * pageSize, totalElements)} of{" "}
                {totalElements} items
              </span>
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
                            {review.user.firstName} {review.user.lastName}
                          </span>
                          <p className="text-sm font-medium text-slate-600">
                            {new Date(review.reviewDate).toLocaleString(
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
                  There are no reviews yet. Be the first to share your feedback
                  and help others make an informed decision!
                </p>
              )}
              <div className="mt-6 flex flex-start">
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </Wrapper>
    </div>
  );
}
