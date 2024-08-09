import React, { useState, useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
import Pagination from "../../components/Pagination";
import TableView from "../../components/TableView";

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
        const response = await axiosConfig.get(
          `/api/reviews?pageNo=${currentPage - 1}&pageSize=${pageSize}`
        );
        if (response.data) {
          setReviews(response.data.content);
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
    };

    fetchReviews();
    setAppData((prev) => ({ ...prev, header: "Review List" }));
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableData = {
    name: "Review List",
  };

  const columns = [
    { headerName: "Sr.No.", field: "id", type: "index" },
    { headerName: "User", field: "user", type: "text" },
    { headerName: "Product", field: "product", type: "text" },
    { headerName: "Rating", field: "rating", type: "text" },
    { headerName: "Comment", field: "comment", type: "longText" },
    { headerName: "Date", field: "date", type: "date" },
    {
      headerName: "Action",
      field: "actions",
      type: "actions",
      actions: ["view", "delete"],
      className: "font-medium",
    },
  ];

  return (
    <>
      <div className="card bg-white overflow-hidden">
        <TableView
          tableData={tableData}
          columns={columns}
          rows={reviews}
          currentPage={currentPage}
          pageSize={pageSize}
          handleView={(row) => {
            console.log(row);
          }}
          handleDelete={(row) => {
            console.log(row);
          }}
        />
        <div className="flex justify-center">
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
  );
}

export default ReviewList;
