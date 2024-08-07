import React, { useState, useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import axios from "axios";
import Pagination from "../../components/Pagination";

function ReviewList() {
  const { setAppData } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Simulating an API call
        const data = {
          content: [
            {
              id: "123e4567-e89b-12d3-a456-426614174000",
              rating: 4.5,
              comment: "Great product!",
              createdOn: "2024-07-08T12:00:00",
              user: {
                id: "123e4567-e89b-12d3-a456-426614174000",
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com"
              },
              product: {
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "Product Name",
                slug: "product-name"
              }
            },
            // Add more sample reviews here
          ],
          pageable: {
            pageNumber: 0,
            pageSize: 10
          },
          totalPages: 1,
          totalElements: 1
        };
        setReviews(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setAppData((prev) => ({ ...prev, header: "Review List" }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchReviews();
  }, [currentPage, setAppData]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="card bg-white overflow-hidden">
        <div className="card-header flex items-center justify-between">
          <h4 className="card-title">Review List</h4>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Sr.No</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">User</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Product</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Rating</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Comment</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Date</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reviews.map((review, index) => (
                      <tr key={review.id} className="even:bg-gray-100 odd:bg-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {index + 1 + (currentPage - 1) * pageSize}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {`${review.user.firstName} ${review.user.lastName}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {review.product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {review.rating}
                        </td>
                        <td className="px-6 py-4 whitespace-wrap text-sm text-gray-800">
                          {review.comment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {new Date(review.createdOn).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 flex gap-1 whitespace-nowrap text-end text-sm font-medium">
                          
                          <a
                            className="text-danger hover:text-red-600"
                            href="#"
                            onClick={() => console.log(`Delete review ${review.id}`)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default ReviewList;
