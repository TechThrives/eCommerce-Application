import React, { useState, useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
import Pagination from "../../components/Pagination";
import TableView from "../../components/TableView";

function CategoryList() {
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosConfig.get(
          `/api/categories?pageNo=${
            currentPage - 1
          }&pageSize=${pageSize}`
        );
        if (response.data) {
          setCategories(response.data.content);
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

    fetchCategories();
    setAppData((prev) => ({ ...prev, header: "Category List" }));
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableData = {
    name: "Category List",
  };

  const columns = [
    {
      headerName: "Sr.No",
      field: "id",
      type: "index",
    },
    {
      headerName: "Name",
      field: "name",
      type: "text",
    },
    {
      headerName: "Description",
      field: "description",
      type: "longText",
    },
    {
      headerName: "Product Count",
      field: "productCount",
      type: "text", 
    },
    {
      headerName: "Action",
      type: "actions",
      actions: ["edit", "delete"],
      className: "font-medium" 
    },
  ];
  

  return (
    <>
      <div className="card bg-white overflow-hidden">
      <TableView
          tableData={tableData}
          columns={columns}
          rows={categories}
          currentPage={currentPage}
          pageSize={pageSize}
          handleEdit={(row) => navigate(`/edit-category/${row.id}`)}
          handleDelete={(row) => {
            console.log(row);
          }}
          headerJsx={<button
            className="btn bg-primary text-white rounded-full"
            onClick={() => {
              navigate("/add-category");
            }}
          >
            Add Category
          </button>}
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

export default CategoryList;
