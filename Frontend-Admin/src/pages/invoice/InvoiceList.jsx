import React, { useState, useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import axios from "axios";
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
      const url = `https://api.example.com/invoices?page=${currentPage}&size=${pageSize}`;
      try {
        
        const data = {
          content: [
            {
              id: "123e4567-e89b-12d3-a456-426614174000",
              userId: "123e4567-e89b-12d3-a456-426614174000",
              products: [
                {
                  id: "123e4567-e89b-12d3-a456-426614174001",
                  name: "Product A",
                  price: 29.99,
                  quantity: 2
                },
                {
                  id: "123e4567-e89b-12d3-a456-426614174002",
                  name: "Product B",
                  price: 49.99,
                  quantity: 1
                }
              ],
              subTotal: 109.97,
              tax: 8.00,
              totalPrice: 117.97,
              paymentMethod: "Credit Card",
              paymentStatus: "Paid"
            }
            // Add more sample invoices here
          ],
          pageable: {
            pageNumber: 0,
            pageSize: 10
          },
          totalPages: 1,
          totalElements: 1
        };
        setInvoices(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setAppData((prev) => ({ ...prev, header: "Invoice List" }));
      } catch (error) {
        console.error("Error fetching data:", error);
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
                    {invoices.map((invoice, index) => (
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default InvoiceList;
