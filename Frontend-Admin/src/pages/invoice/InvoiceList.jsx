import React, { useState, useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
import Pagination from "../../components/Pagination";

function InvoiceList() {
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
          `${process.env.REACT_APP_BACKEND_URL}/api/invoices?pageNo=${
            currentPage - 1
          }&pageSize=${pageSize}`
        );
        if (response.data) {
          console.log(response.data);
          setInvoices(response.data.content);
          setTotalPages(response.data.totalPages);
          setTotalElements(response.data.totalElements);
          setAppData((prev) => ({ ...prev, header: "Invoice List" }));
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
    };

    fetchInvoices();
  }, [currentPage, setAppData]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="card bg-white overflow-hidden scrollable-content">
        <div className="card-header flex items-center justify-between">
          <h4 className="card-title">Invoice List</h4>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                    <th className="px-6 py-3 text-start text-sm text-gray-900">
                          Sr.No
                        </th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">User ID</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Products</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Total Price</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Payment Method</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Payment Status</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices.length > 0 ? (
                      invoices.map((invoice, index) => (
                        <tr key={invoice.id} className="even:bg-gray-100 odd:bg-white">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {index + 1 + (currentPage - 1) * pageSize}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {invoice.userId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {invoice.products.length}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          &#8377;{invoice.totalPrice.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {invoice.paymentMethod}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {invoice.paymentStatus}
                          </td>
                          <td className="px-6 py-4 flex gap-1 whitespace-nowrap text-end text-sm font-medium">
                            <a
                              className="text-primary hover:text-sky-700"
                              href={`/view-invoice/${invoice.id}`}
                            >
                              View Details
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center"
                        >
                          No Invoices Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
