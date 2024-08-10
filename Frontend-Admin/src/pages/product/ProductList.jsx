import React, { useState, useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
import Pagination from "../../components/Pagination";
import TableView from "../../components/TableView";
import Model from "../../components/Model";

function ProductList() {
  const navigate = useNavigate();
  const { setAppData, setIsLoading } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const pageSize = 10; // Assuming page size from API response

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosConfig.get(
          `/api/products?pageNo=${currentPage - 1}&pageSize=${pageSize}`
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

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.delete(
        `/api/products/${selectedProduct.id}`
      );
      if (response.status === 204) {
        notify("Product deleted successfully", "success");
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
    setSelectedProduct(null);
    setIsModelOpen(false);
    setIsLoading(false);
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
      jsonField: "category.name",
    },
    { headerName: "Reviews", field: "reviewCount", type: "text" },
    {
      headerName: "Actions",
      field: "actions",
      type: "actions",
      actions: ["edit", "delete"],
      className: "font-medium",
    },
  ];

  return (
    <>
      <div className="card bg-white overflow-hidden">
        {isModelOpen && (
          <Model setIsModelOpen={setIsModelOpen} modelAction={handleDelete} />
        )}

        <TableView
          tableData={tableData}
          columns={columns}
          rows={products}
          currentPage={currentPage}
          pageSize={pageSize}
          handleEdit={(row) => navigate(`/edit-product/${row.id}`)}
          handleDelete={(row) => {
            setSelectedProduct(row);
            setIsModelOpen(true);
          }}
          headerJsx={
            <button
              className="btn bg-primary text-white rounded-full"
              onClick={() => {
                navigate("/add-product");
              }}
            >
              Add Product
            </button>
          }
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
