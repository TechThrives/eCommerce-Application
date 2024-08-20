import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../Utils/axiosConfig";
import { notify } from "../../Utils/Helper";
import TableView from "../../Components/TableView";
import Pagination from "../../Components/Pagination";
import Loader from "../../Components/Loader";
import Model from "../../Components/Model";
import { useAppContext } from "../../Features/AppContext";

export default function Invoices() {
  const {user} = useAppContext();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [invoices, setInvoices] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const pageSize = 10; // Assuming page size from API response

  const fetchInvoices = async () => {
    try {
      const response = await axiosConfig.get(
        `/api/invoices/user/${user.id}?pageNo=${
          currentPage - 1
        }&pageSize=${pageSize}`
      );
      if (response.data) {
        setInvoices(response.data.content);
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
    fetchInvoices();
  }, [currentPage]);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.delete(
        `/api/invoices/${selectedInvoice.id}`
      );
      if (response.status === 204) {
        notify("Invoice deleted successfully", "success");
        fetchInvoices();
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
    setSelectedInvoice(null);
    setIsModelOpen(false);
    setIsLoading(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableData = {
    name: "Invoices",
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
    {
      headerName: "Action",
      field: "actions",
      type: "actions",
      actions: ["view", "delete"],
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
          <Model setIsModelOpen={setIsModelOpen} modelAction={handleDelete} />
        )}
        <div className="items-center my-4">
          <TableView
            tableData={tableData}
            columns={columns}
            rows={invoices}
            handleView={(row) => {
              navigate(`/account/view-invoice/${row.id}`);
            }}
            handleDelete={(row) => {
              setSelectedInvoice(row);
              setIsModelOpen(true);
            }}
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
