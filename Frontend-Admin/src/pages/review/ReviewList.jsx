import React, { useState, useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
import Pagination from "../../components/Pagination";
import TableView from "../../components/TableView";
import Model from "../../components/Model";
import InfoModal from "../../components/InfoModal";

function ReviewList() {
  const { setAppData, setIsLoading } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const[isModelOpen, setIsModelOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isInfoModelOpen, setIsInfoModelOpen ] = useState(false);
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

  const tableData = {
    name: "Review List",
  };

  const columns = [
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
      className: "font-medium",
    },
  ];

  return (
    <>
      <div className="card bg-white overflow-hidden">
      {isModelOpen && (
          <Model setIsModelOpen={setIsModelOpen} modelAction={handleDelete} />
        )}

        {isInfoModelOpen && (
          <InfoModal setIsModelOpen={setIsInfoModelOpen} data={selectedReview} />
        )}
        <TableView
          tableData={tableData}
          columns={columns}
          rows={reviews}
          currentPage={currentPage}
          pageSize={pageSize}
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
