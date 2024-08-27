import React, { useEffect, useState } from "react";
import axiosConfig from "../../Utils/axiosConfig";
import { notify } from "../../Utils/Helper";
import TableView from "../../Components/TableView";
import Pagination from "../../Components/Pagination";
import Model from "../../Components/Model";
import InfoModal from "../../Components/InfoModal";
import Loader from "../../Components/Loader";
import { useAppContext } from "../../Features/AppContext";

export default function Reviews() {
  const { user } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInfoModelOpen, setIsInfoModelOpen] = useState(false);
  const pageSize = 10; // Assuming page size from API response

  const fetchReviews = async () => {
    try {
      const response = await axiosConfig.get(
        `/api/reviews/user/${user.id}?pageNo=${
          currentPage - 1
        }&pageSize=${pageSize}`
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
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchReviews();
  }, [currentPage]);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.delete(
        `/api/reviews/${selectedReview.id}`
      );
      if (response.status === 204) {
        notify("Review deleted successfully", "success");
        fetchReviews();
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableData = {
    name: "Reviews",
  };

  const columns = [
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
    {
      headerName: "Action",
      field: "actions",
      type: "actions",
      actions: ["view", "edit", "delete"],
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
            {isModelOpen && (
              <Model
                setIsModelOpen={setIsModelOpen}
                modelAction={handleDelete}
              />
            )}
            {isInfoModelOpen && (
              <InfoModal
                setIsModelOpen={setIsInfoModelOpen}
                data={selectedReview}
              />
            )}
            <div className="items-center my-4">
              <TableView
                tableData={tableData}
                columns={columns}
                rows={reviews}
                handleView={(row) => {
                  setSelectedReview(row);
                  setIsInfoModelOpen(true);
                }}
                handleDelete={(row) => {
                  setSelectedReview(row);
                  setIsModelOpen(true);
                }}
                pageSize={pageSize}
                currentPage={currentPage}
              />
              <div className="flex flex-start">
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
