import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
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
        const response = await axiosConfig.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`
        );
        if (response.data) {
          setUser(response.data);
          setAppData((prev) => ({ ...prev, header: "User Details" }));
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          if (data.details && Array.isArray(data.details) && data.message) {
            notify(`${data.message}: ${data.details.join(", ")}`, "error");
          } else {
            notify(data.message || "An unexpected error occurred.", "error");
          }
        } else {
          notify("An unexpected error occurred.", "error");
        }
      }
    };
    fetchUser();
  }, [userId, setAppData]);


  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await axiosConfig.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/reviews/user/${userId}?pageNo=${
            currentReviewPage - 1
          }&pageSize=${pageSize}`
        );
        if (response.data) {
          console.log(response.data);
          setReviews(response.data.content);
          setTotalReviewPages(response.data.totalPages);
          setTotalReviewElements(response.data.totalElements);
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          if (data.details && Array.isArray(data.details) && data.message) {
            notify(`${data.message}: ${data.details.join(", ")}`, "error");
          } else {
            notify(data.message || "An unexpected error occurred.", "error");
          }
        } else {
          notify("An unexpected error occurred.", "error");
        }
      }
    };

    const fetchInvoices = async () => {
      try {
        const response = await axiosConfig.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/invoices/user/${userId}?pageNo=${
            currentInvoicePage - 1
          }&pageSize=${pageSize}`
        );
        if (response.data) {
          console.log(response.data);
          setInvoices(response.data.content);
          setTotalInvoicePages(response.data.totalPages);
          setTotalInvoiceElements(response.data.totalElements);
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          if (data.details && Array.isArray(data.details) && data.message) {
            notify(`${data.message}: ${data.details.join(", ")}`, "error");
          } else {
            notify(data.message || "An unexpected error occurred.", "error");
          }
        } else {
          notify("An unexpected error occurred.", "error");
        }
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
                      {reviews.length > 0 ? (
                      reviews.map((review, index) => (
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
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center"
                        >
                          No Reviews Found
                        </td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
          {totalReviewPages > 1 && (
            <Pagination
              currentPage={currentReviewPage}
              totalPages={totalReviewPages}
              onPageChange={handleReviewPageChange}
            />
          )}
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
                  {invoices.length > 0 ? (
                      invoices.map((invoice, index) => (
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
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center"
                        >
                          No Invoices Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
        {totalInvoicePages > 1 && (
            <Pagination
              currentPage={currentInvoicePage}
              totalPages={totalInvoicePages}
              onPageChange={handleInvoicePageChange}
            />
          )}
        </div>
        </div>

      </div>
    </>
  );
}

export default ViewUser;
