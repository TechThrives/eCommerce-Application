import React, { useEffect, useState } from "react";
import TableView from "../../Components/TableView";
import Pagination from "../../Components/Pagination";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10; // Assuming page size from API response

  useEffect(() => {
    const fetchOrders = async () => {
      const url = `https://api.example.com/products?page=${currentPage}&size=${pageSize}`;
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
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message)
      }
    };

    fetchOrders();
  }, [currentPage, pageSize]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableData = {
    name: "Orders",
  };
  const columns = [
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

  return (
    <>
      <div className="flex flex-col">
        <div className="items-center my-4">
          <TableView tableData={tableData} columns={columns} rows={orders} />
          <div className="flex flex-start">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
