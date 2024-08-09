import React, { useState, useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
import Pagination from "../../components/Pagination";
import TableView from "../../components/TableView";

function ProductList() {
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10; // Assuming page size from API response

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosConfig.get(
          `/api/products?pageNo=${
            currentPage - 1
          }&pageSize=${pageSize}`
        );
        if (response.data) {
          setProducts(response.data.content);
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
    
    fetchProducts();
    setAppData((prev) => ({ ...prev, header: "Product List" }));
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableData = {
    name: "Product List",
  };

  const columns = [
    { headerName: "Sr.No.", field: "id", type: "index" },
    { headerName: "Name", field: "name", type: "text" },
    { headerName: "Overview", field: "overview", type: "longText" },
    { 
      headerName: "Category", 
      field: "category", 
      type: "text", 
      jsonField: "category.name" 
    },
    { 
      headerName: "Actions", 
      field: "actions", 
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
          rows={products}
          currentPage={currentPage}
          pageSize={pageSize}
          handleEdit={(row) => navigate(`/edit-product/${row.id}`)}
          handleDelete={(row) => {
            console.log(row);
          }}
          headerJsx={<button
            className="btn bg-primary text-white rounded-full"
            onClick={() => {
              navigate("/add-product");
            }}
          >
            Add Product
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

export default ProductList;
