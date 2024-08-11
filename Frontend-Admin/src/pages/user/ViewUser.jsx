import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
import Pagination from "../../components/Pagination";
import TableView from "../../components/TableView";
import Model from "../../components/Model";
import InfoModal from "../../components/InfoModal";

function ViewUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { setAppData, setIsLoading } = useAppContext();
  const [reviews, setReviews] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [user, setUser] = useState(null);
  const [totalReviewPages, setTotalReviewPages] = useState(0);
  const [totalReviewElements, setTotalReviewElements] = useState(0);
  const [totalInvoicePages, setTotalInvoicePages] = useState(0);
  const [totalInvoiceElements, setTotalInvoiceElements] = useState(0);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [currentInvoicePage, setCurrentInvoicePage] = useState(1);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isInfoModelOpen, setIsInfoModelOpen ] = useState(false);
  const reviewPageSize = 10;
  const invoicePageSize = 10;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosConfig.get(
          `/api/users/${userId}`
        );
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          if (data.details && Array.isArray(data.details) && data.message) {
            notify(data.message || "An unexpected error occurred.", "error");
            navigate("/user-list");
          }
        } else {
          notify("An unexpected error occurred.", "error");
        }
      }
    };
    fetchUser();
    setAppData((prev) => ({ ...prev, header: "User Details" }));
  }, [userId]);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await axiosConfig.get(
          `${
            process.env.REACT_APP_BACKEND_URL
          }/api/reviews/user/${userId}?pageNo=${
            currentReviewPage - 1
          }&pageSize=${reviewPageSize}`
        );
        if (response.data) {
          setReviews(response.data.content);
          setTotalReviewPages(response.data.totalPages);
          setTotalReviewElements(response.data.totalElements);
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

    const fetchInvoices = async () => {
      try {
        const response = await axiosConfig.get(
          `${
            process.env.REACT_APP_BACKEND_URL
          }/api/invoices/user/${userId}?pageNo=${
            currentInvoicePage - 1
          }&pageSize=${invoicePageSize}`
        );
        if (response.data) {
          setInvoices(response.data.content);
          setTotalInvoicePages(response.data.totalPages);
          setTotalInvoiceElements(response.data.totalElements);
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

    fetchUserReviews();
    fetchInvoices();
  }, [userId, currentReviewPage, currentInvoicePage]);

  const handleReviewPageChange = (pageNumber) => {
    setCurrentReviewPage(pageNumber);
  };

  const handleInvoicePageChange = (pageNumber) => {
    setCurrentInvoicePage(pageNumber);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.delete(
        `/api/reviews/${selectedReview.id}`
      );
      if (response.status === 204) {
        notify("Review deleted successfully", "success");
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
    setSelectedReview(null);
    setIsModelOpen(false);
    setIsLoading(false);
  };

  const reviewTableData = {
    name: "Review List",
  };

  const reviewColumns = [
    { headerName: "Sr.No.", field: "id", type: "index" },
    { headerName: "User", field: "user", type: "text", render: (rowData) => `${rowData.user.firstName} ${rowData.user.lastName}`,},
    { headerName: "Product", field: "product", jsonField: "product.name", type: "text" },
    { headerName: "Rating", field: "rating", type: "rating", className:"min-w-40"},
    { headerName: "Review", field: "reviewText", type: "longText" },
    { headerName: "Date", field: "reviewDate", type: "date" },
    { 
      headerName: "Action", 
      field: "actions", 
      type: "actions", 
      actions: ["view", "delete"], 
      className: "font-medium" 
    },
  ];

  const invoiceTableData = {
    name: "Invoice List",
  };

  const invoiceColumns = [
    { headerName: "Sr.No.", field: "id", type: "index" },
    { headerName: "User", field: "user", type: "text", render: (rowData) => `${rowData.user.firstName} ${rowData.user.lastName}`,},
    { headerName: "Products", field: "products", type: "text", render: (rowData) => `${rowData.products.length}`,},
    { headerName: "Total Price", field: "totalPrice", type: "price" },
    { headerName: "Payment Method", field: "paymentMethod", type: "text" },
    { headerName: "Payment Status", field: "paymentStatus", type: "status" },
    { 
      headerName: "Action", 
      field: "actions", 
      type: "actions", 
      actions: ["view"], 
      className: "font-medium" 
    },
  ];

  return (
    <>
      <div className="card bg-white overflow-hidden">
        <div className="card-header flex items-center justify-between">
          <h4 className="card-title">User Details</h4>
        </div>
        {user && (
          <>
            <div className="py-4 px-6">
                {/* show user details */}
                <div className="flex flex-col justify-center items-center">
                  <img
                    className="w-24 h-24 object-cover border-2 border-gray-700 rounded-full mr-4"
                    src={user.profileImageUrl}
                    alt="Profile"
                  />
                    <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-600">{user.phoneNumber}</p>

                </div>
            </div>
          </>
        )}

        <div>
        {isModelOpen && (
          <Model setIsModelOpen={setIsModelOpen} modelAction={handleDelete} />
        )}

        {isInfoModelOpen && (
          <InfoModal setIsModelOpen={setIsInfoModelOpen} data={selectedReview} />
        )}

        <TableView
          tableData={reviewTableData}
          columns={reviewColumns}
          rows={reviews}
          currentPage={currentReviewPage}
          pageSize={reviewPageSize}
          handleView={(row) => {
            setSelectedReview(row);
            setIsInfoModelOpen(true);
          }}
          handleDelete={(row) => {
            setSelectedReview(row);
            setIsModelOpen(true);
          }}
        />
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
        <TableView
          tableData={invoiceTableData}
          columns={invoiceColumns}
          rows={invoices}
          currentPage={currentInvoicePage}
          pageSize={invoicePageSize}
          handleView={(row) => navigate(`/view-invoice/${row.id}`)}
        />
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
