import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
import Pagination from "../../components/Pagination";
import TableView from "../../components/TableView";

function InvoiceList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { setAppData } = useAppContext();
  const [invoices, setInvoices] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10; // Assuming page size

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axiosConfig.get(
          `/api/invoices?pageNo=${
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
    };
    
    fetchInvoices();
    setAppData((prev) => ({ ...prev, header: "Invoice List" }));
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableData = {
    name: "Invoice List",
  };

  const columns = [
    { headerName: "Sr.No.", field: "id", type: "index" },
    { headerName: "User ID", field: "userId", type: "text" },
    { headerName: "Products", field: "products", type: "text" },
    { headerName: "Total Price", field: "totalPrice", type: "price" },
    { headerName: "Payment Method", field: "paymentMethod", type: "text" },
    { headerName: "Payment Status", field: "paymentStatus", type: "text" },
    { 
      headerName: "Action", 
      field: "actions", 
      type: "actions", 
      actions: ["view"], 
      className: "font-medium" 
    },
  ];
  

  return (
    <>
      <div className="card bg-white overflow-hidden scrollable-content">
      <TableView
          tableData={tableData}
          columns={columns}
          rows={invoices}
          currentPage={currentPage}
          pageSize={pageSize}
          handleView={(row) => navigate(`/view-invoice/${row.id}`)}
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

export default InvoiceList;
