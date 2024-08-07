import React from "react";
import { useState, useEffect } from "react";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import TableView from "../../Components/TableView";

export default function Account() {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const url = `https://api.example.com/products?page=${1}&size=${5}`;
      try {
        // const response = await axios.get(url);
        const data = {
          content: [
            {
              id: 10001,
              details: "Kring New Fit office chair, mesh + PU, black",
              status: "Delivered",
              createdOn: "2024-07-22 12:46:56.537819",
              total: "200.00",
            },
            {
              id: 10002,
              details: "Kring New Fit office chair, mesh + PU, black",
              status: "Shipped",
              createdOn: "2024-07-22 12:46:56.537819",
              total: "200.00",
            },
            {
              id: 10003,
              details: "Kring New Fit office chair, mesh + PU, black",
              status: "Cancelled",
              createdOn: "2024-07-22 12:46:56.537819",
              total: "200.00",
            },
          ],
          pageable: {
            sort: {
              sorted: true,
              unsorted: false,
              empty: false,
            },
            pageNumber: 0,
            pageSize: 10,
            offset: 0,
            paged: true,
            unpaged: false,
          },
          totalPages: 5,
          totalElements: 50,
          last: false,
          first: true,
          numberOfElements: 10,
          size: 10,
          number: 0,
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          empty: false,
        };
        setOrders(data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message)
      }
    };

    fetchOrders();
  }, []);

  const tableDataOrder = {
    name: "Orders",
    link: "account/orders",
    linkName: "View All",
  };

  const orderColumns = [
    {
      field: "id",
      headerName: "No.",
      type: "index",
    },
    {
      field: "details",
      headerName: "Details",
      type: "longText",
    },
    {
      field: "status",
      headerName: "Status",
      type: "status",
    },
    {
      field: "createdOn",
      headerName: "Created On",
      type: "date",
    },
    {
      field: "total",
      headerName: "Total",
      type: "price",
    },
    {
      headerName: "Action",
      type: "actions",
    },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      const url = `https://api.example.com/products?page=${1}&size=${5}`;
      try {
        // const response = await axios.get(url);
        const data = {
          content: [
            {
              id: 10001,
              product: "Smartphone",
              review: "Great product!",
              rating: 5,
              date: "2024-07-22 12:46:56.537819",
            },
            {
              id: 10002,
              product:
                "Laptop Good value for moneyGood value for moneyGood value for money",
              review:
                "Good value for moneyGood value for moneyGood value for moneyGood value for moneyGood value for moneyGood value for moneyGood value for money.",
              rating: 4,
              date: "2024-07-22 12:46:56.537819",
            },
            {
              id: 10003,
              product: "Headphones",
              review: "Average quality.",
              rating: 3,
              date: "2024-07-22 12:46:56.537819",
            },
          ],
          pageable: {
            sort: {
              sorted: true,
              unsorted: false,
              empty: false,
            },
            pageNumber: 0,
            pageSize: 10,
            offset: 0,
            paged: true,
            unpaged: false,
          },
          totalPages: 5,
          totalElements: 50,
          last: false,
          first: true,
          numberOfElements: 10,
          size: 10,
          number: 0,
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          empty: false,
        };
        setReviews(data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message)
      }
    };

    fetchReviews();
  }, []);

  const tableDataReview = {
    name: "Reviews",
    link: "account/reviews",
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
    },
    {
      field: "review",
      headerName: "Review",
      type: "longText",
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "rating",
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
    },
    {
      headerName: "Action",
      type: "actions",
    },
  ];

  return (
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
                    <div className="text-sm text-gray-400">Wishlist Items</div>
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
              tableData={tableDataOrder}
              columns={orderColumns}
              rows={orders}
            />
          </div>
          <div className="my-10">
            <TableView
              tableData={tableDataReview}
              columns={reviewColumns}
              rows={reviews}
            />
          </div>
        </div>
      </div>
    </>
  );
}
