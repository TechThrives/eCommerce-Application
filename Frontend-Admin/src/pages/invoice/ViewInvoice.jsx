import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosConfig from "../../utils/axiosConfig";
import { useAppContext } from "../../utils/AppContext";
import { notify } from "../../utils/Helper";

function ViewInvoice() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const [invoice, setInvoice] = useState({ user: {}, products: [] });
  const pageSize = 10; // Assuming page size

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axiosConfig.get(`/api/invoices/${invoiceId}`);
        if (response.data) {
          setInvoice(response.data);
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          if (data.details && Array.isArray(data.details) && data.message) {
            notify(data.message || "An unexpected error occurred.", "error");
            navigate("/invoice-list");
          }
        } else {
          notify("An unexpected error occurred.", "error");
        }
      }
    };
    fetchInvoice();
    setAppData((prev) => ({ ...prev, header: "Invoice Details" }));
  }, [invoiceId]);

  const printDiv = (divId) => {
    // Get the content to print
    const printContents = document.getElementById(divId).innerHTML;

    // Create a new window
    const printWindow = window.open("", "", "height=600,width=800");

    // Write content to the new window
    printWindow.document.open();
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(printContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    // Wait for the new window to load before printing
    printWindow.onload = function () {
      printWindow.focus(); // Focus on the new window
      printWindow.print(); // Trigger the print dialog
      printWindow.close(); // Close the new window
    };
  };

  return (
    <>
      <div className="card bg-white overflow-hidden scrollable-content">
        <div className="card-header flex items-center justify-between">
          <h4 className="card-title">Invoice Details</h4>
          <div className="flex gap-3">
            <button
              className="btn bg-success text-white rounded-full"
              onClick={() => printDiv("invoice")}
            >
              Print
            </button>
            <button
              className="btn bg-primary text-white rounded-full"
              onClick={() => navigate("/invoice-list")}
            >
              Back
            </button>
          </div>
        </div>
        <div className="card p-6" id="invoice">
          <div className="flex justify-between">
            <div>
              <img
                className="h-6"
                src={`${process.env.PUBLIC_URL}/assets/images/logo-dark.png`}
                alt=""
              />

              <h1 className="mt-2 text-lg md:text-xl font-semibold text-primary">
                Digital Shop
              </h1>
            </div>

            <div className="text-end">
              <h2 className="text-2xl font-semibold text-gray-800">
                Invoice #
              </h2>
              <span className="mt-1 block text-gray-500">
                Invoice ID: {invoiceId}
              </span>

              <address className="mt-2 not-italic text-gray-800">
                <a
                  className="text-blue-500"
                  href="https://www.abc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.abc.com
                </a>
              </address>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-12 gap-3">
            <div class="col-span-5">
              <h3 class="text-lg font-semibold text-gray-800">Bill to:</h3>
              <h3 class="text-md font-medium text-gray-800">
                {invoice.user.firstName} {invoice.user.lastName}
              </h3>
              <address class="mt-1 not-italic text-gray-500">
                {invoice.user.email}
                <br />
                {invoice.user.phone}
                <br />{" "}
              </address>
            </div>

            <div class="col-span-2"></div>

            <div class="col-span-5 text-end">
              <table class="w-full">
                <tbody>
                  <tr>
                    <td class="py-1 font-medium">Invoice Date:</td>
                    <td class="py-1 font-medium">
                      {new Date(invoice.createdOn).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-medium text-left text-gray-800"
                        >
                          Sr. No
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-medium text-left text-gray-800"
                        >
                          Product Name
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-medium text-left text-gray-800"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-medium text-left text-gray-800"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {invoice.products.map((product, index) => (
                        <tr key={product.id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {product.name}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                            &#8377;{product.price}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                              <i className="uil uil-check-circle"></i>
                              <h2 className="text-sm font-normal">Paid</h2>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="w-full p-8"></div>

            <div className="w-full max-w-2xl sm:text-end space-y-2">
              <div className="grid grid-cols-1">
                <table className="w-full text-end">
                  <tbody>
                    <tr>
                      <td className="py-1 font-medium">Payment Method:</td>
                      <td className="py-1 font-medium">
                        {invoice.paymentMethod}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Payment Status:</td>
                      <td className="py-1 font-medium">
                        {invoice.paymentStatus}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Subtotal:</td>
                      <td className="py-1 font-medium">
                        &#8377;{invoice.subTotal}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Tax:</td>
                      <td className="py-1 font-medium">&#8377;{invoice.tax}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Total Price:</td>
                      <td className="py-1 font-medium">
                        &#8377;{invoice.totalPrice}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800">Thank you!</h4>
            <p className="text-gray-500">
              If you have any questions concerning this invoice, use the
              following contact information:
            </p>
            <div className="mt-2">
              <p className="block text-sm font-medium text-gray-800">
                digitalshop@example.com
              </p>
              <p className="block text-sm font-medium text-gray-800">
                <a
                  className="text-blue-500"
                  href="https://www.abc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.abc.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="mt-5 text-sm text-gray-500">
              {new Date().getFullYear()} &copy; DigitalShop.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewInvoice;
