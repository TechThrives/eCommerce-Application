import React from "react";
import { useState, useEffect } from "react";
import axiosConfig from "../../Utils/axiosConfig";
import { notify } from "../../Utils/Helper";
import { FaCartArrowDown, FaIndianRupeeSign } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import TableView from "../../Components/TableView";
import Loader from "../../Components/Loader";
import { useAppContext } from "../../Features/AppContext";

export default function Account() {
  const {user} = useAppContext();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const response = await axiosConfig.get(`/api/users/${user.id}`);
      if (response.data) {
        setDetails(response.data);
        fetchInvoices();
        fetchReviews();
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
  };

  const fetchReviews = async () => {
    try {
      const response = await axiosConfig.get(
        `/api/reviews/user/${user.id}?pageNo=0&pageSize=5`
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

  const fetchInvoices = async () => {
    try {
      const response = await axiosConfig.get(
        `/api/invoices/user/${user.id}?pageNo=0&pageSize=5`
      );
      if (response.data) {
        setInvoices(response.data.content);
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

  useEffect(() => {
    setIsLoading(true);
    fetchUserDetails();
  }, []);

  const tableDataInvoice = {
    name: "Invoices",
    link: "/account/invoices",
    linkName: "View All",
  };

  const invoiceColumns = [
    {
      field: "id",
      headerName: "No.",
      type: "index",
    },
    {
      field: "product",
      headerName: "Product",
      type: "text",
      render: (rowData) => `${rowData.products.length}`,
    },
    {
      field: "paymentStatus",
      headerName: "Status",
      type: "status",
    },
    {
      field: "createdOn",
      headerName: "Created On",
      type: "date",
    },
    {
      field: "totalPrice",
      headerName: "Total",
      type: "price",
    },
  ];

  const tableDataReview = {
    name: "Reviews",
    link: "/account/reviews",
    linkName: "View All",
  };

  const reviewColumns = [
    {
      field: "id",
      headerName: "No.",
      type: "index",
    },
    {
      field: "product",
      headerName: "Product",
      type: "text",
      jsonField: "product.name",
    },
    {
      field: "reviewText",
      headerName: "Review",
      type: "longText",
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "rating",
    },
    {
      field: "modifiedOn",
      headerName: "Date",
      type: "date",
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="w-full min-h-screen flex items-center justify-center bg-white absolute inset-0 z-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="items-center my-4">
              <h2 className="text-lg font-bold">Overview</h2>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                <div className="w-full ">
                  <div className="widget w-full p-4 rounded-lg bg-white border-l-4 border-purple-400">
                    <div className="flex items-center">
                      <div className="icon w-14 p-3.5 bg-purple-400 text-white rounded-full mr-3">
                        <FaCartArrowDown className="w-full h-full" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="text-md">5</div>
                        <div className="text-sm text-gray-400">Cart Items</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full ">
                  <div className="widget w-full p-4 rounded-lg bg-white border-l-4 border-yellow-400">
                    <div className="flex items-center">
                      <div className="icon w-14 p-3.5 bg-yellow-400 text-white rounded-full mr-3">
                        <FaHandHoldingHeart className="w-full h-full" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="text-md">5</div>
                        <div className="text-sm text-gray-400">
                          Wishlist Items
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full ">
                  <div className="widget w-full p-4 rounded-lg bg-white border-l-4 border-red-400">
                    <div className="flex items-center">
                      <div className="icon w-14 p-3.5 bg-red-400 text-white rounded-full mr-3">
                        <FiBox className="w-full h-full" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="text-md">5</div>
                        <div className="text-sm text-gray-400">Orders</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full ">
                  <div className="widget w-full p-4 rounded-lg bg-white border-l-4 border-green-400">
                    <div className="flex items-center">
                      <div className="icon w-14 p-3.5 bg-green-400 text-white rounded-full mr-3">
                        <FaIndianRupeeSign className="w-full h-full" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="text-md">&#8377;77</div>
                        <div className="text-sm text-gray-400">
                          Total Amount Spent
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-10">
                <TableView
                  tableData={tableDataInvoice}
                  columns={invoiceColumns}
                  rows={invoices}
                  pageSize={5}
                  currentPage={0}
                />
              </div>
              <div className="my-10">
                <TableView
                  tableData={tableDataReview}
                  columns={reviewColumns}
                  rows={reviews}
                  pageSize={5}
                  currentPage={0}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
