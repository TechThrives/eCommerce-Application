import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import axios from "axios";
import Pagination from "../../components/Pagination";

function ViewUser() {
  const { userId } = useParams();
  const { setAppData } = useAppContext();
  const [reviews, setReviews] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [user, setUser] = useState(null);
  const [totalReviewPages, setTotalReviewPages] = useState(0);
  const [totalReviewElements, setTotalReviewElements] = useState(0);
  const [totalInvoicePages, setTotalInvoicePages] = useState(0);
  const [totalInvoiceElements, setTotalInvoiceElements] = useState(0);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [currentInvoicePage, setCurrentInvoicePage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Simulating API response with static data
        const userData = {
          id: "123e4567-e89b-12d3-a456-426614174000",
          firstName: "John",
          lastName: "Doe",
          email: "nLQp6@example.com",
          phone: "123-456-7890",
          address: "123 Main St",
          city: "New York",
          state: "NY",
          zip: "10001",
        };
        setUser(userData);
        setAppData((prev) => ({ ...prev, header: "View User" }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUser();
  }, [userId, setAppData]);


  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const reviewsData = {
          content: [
            {
              id: "123e4567-e89b-12d3-a456-426614174000",
              rating: 4.5,
              comment: "Great product!",
              createdOn: "2024-07-08T12:00:00",
              product: {
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "Product Name",
                slug: "product-name",
              },
            },
          ],
          pageable: {
            pageNumber: 0,
            pageSize: 10,
          },
          totalPages: 1,
          totalElements: 1,
        };
        setReviews(reviewsData.content);
        setTotalReviewPages(reviewsData.totalPages);
        setTotalReviewElements(reviewsData.totalElements);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchInvoices = async () => {
      const url = `https://api.example.com/invoices?page=${currentInvoicePage}&size=${pageSize}`;
      try {
        
        const data = {
          content: [
            {
              id: "123e4567-e89b-12d3-a456-426614174000",
              userId: "123e4567-e89b-12d3-a456-426614174000",
              products: [
                {
                  id: "123e4567-e89b-12d3-a456-426614174001",
                  name: "Product A",
                  price: 29.99,
                  quantity: 2
                },
                {
                  id: "123e4567-e89b-12d3-a456-426614174002",
                  name: "Product B",
                  price: 49.99,
                  quantity: 1
                }
              ],
              subTotal: 109.97,
              tax: 8.00,
              totalPrice: 117.97,
              paymentMethod: "Credit Card",
              paymentStatus: "Paid"
            }
            // Add more sample invoices here
          ],
          pageable: {
            pageNumber: 0,
            pageSize: 10
          },
          totalPages: 1,
          totalElements: 1
        };
        setInvoices(data.content);
        setTotalInvoicePages(data.totalPages);
        setTotalInvoiceElements(data.totalElements);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserReviews();
    fetchInvoices();
  }, [userId, currentReviewPage, currentInvoicePage]);

  const handleReviewPageChange = (pageNumber) => {
    setCurrentReviewPage(pageNumber);
  };

  const handleInvoicePageChange = (pageNumber) => {
    setCurrentInvoicePage(pageNumber);
  };

  return (
    <>
      <div className="card bg-white overflow-hidden">
        <div className="card-header flex items-center justify-between">
          <h4 className="card-title">User Details</h4>
        </div>
        {user && (
          <>
            <div className="py-4 px-6">
              <table class="w-full">
                <tbody>
                  <tr>
                    <td class="py-1 font-medium text-gray-900">Name :</td>
                    <td class="py-1 font-medium">
                      {user.firstName} {user.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td class="py-1 font-medium text-gray-900">Email :</td>
                    <td class="py-1 font-medium">{user.email}</td>
                  </tr>
                  <tr>
                    <td class="py-1 font-medium text-gray-900">Phone No :</td>
                    <td class="py-1 font-medium">{user.phone}</td>
                  </tr>
                  <tr>
                    <td class="py-1 font-medium text-gray-900">Address :</td>
                    <td class="py-1 font-medium">
                      {user.address}, {user.city}, {user.state}, {user.zip}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        <div>
          <div className="p-4">
            <h4 className="card-title m-2">User Reviews</h4>
            <div className="overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-start text-sm text-gray-900">
                          Sr.No
                        </th>
                        <th className="px-6 py-3 text-start text-sm text-gray-900">
                          Product
                        </th>
                        <th className="px-6 py-3 text-start text-sm text-gray-900">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-start text-sm text-gray-900">
                          Comment
                        </th>
                        <th className="px-6 py-3 text-start text-sm text-gray-900">
                          Date
                        </th>
                        <th className="px-6 py-3 text-start text-sm text-gray-900">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reviews.map((review, index) => (
                        <tr
                          key={review.id}
                          className="even:bg-gray-100 odd:bg-white"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {index + 1 + (currentReviewPage - 1) * pageSize}
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
              currentPage={currentReviewPage}
              totalPages={totalReviewPages}
              onPageChange={handleReviewPageChange}
            />
          </div>
        </div>

        <div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                    <th className="px-6 py-3 text-start text-sm text-gray-900">
                          Sr.No
                        </th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">User ID</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Subtotal</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Tax</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Total Price</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Payment Method</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Payment Status</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices.map((invoice, index) => (
                      <tr key={invoice.id} className="even:bg-gray-100 odd:bg-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {index + 1 + (currentInvoicePage - 1) * pageSize}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {invoice.userId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          ${invoice.subTotal.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          ${invoice.tax.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          ${invoice.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {invoice.paymentMethod}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {invoice.paymentStatus}
                        </td>
                        <td className="px-6 py-4 flex gap-1 whitespace-nowrap text-end text-sm font-medium">
                          <a
                            className="text-primary hover:text-sky-700"
                            href={`/view-invoice/${invoice.id}`}
                          >
                            View Details
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
            currentPage={currentInvoicePage}
            totalPages={totalInvoicePages}
            onPageChange={handleInvoicePageChange}
          />
        </div>
        </div>

      </div>
    </>
  );
}

export default ViewUser;
