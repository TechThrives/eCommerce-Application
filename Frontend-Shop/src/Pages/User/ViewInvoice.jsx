import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosConfig from "../../Utils/axiosConfig";
import { useAppContext } from "../../Features/AppContext";
import { notify } from "../../Utils/Helper";
import Logo from "../../Components/Images/Logo.svg";
import { FaRegCheckCircle } from "react-icons/fa";

function ViewInvoice() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const [invoice, setInvoice] = useState({ user: {}, products: [] });

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
            navigate("/account/invoices");
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
      <div className="relative  border border-gray-200/80 flex flex-col break-words box-border h-fit bg-white overflow-hidden scrollable-content">
        <div
          className="relative bg-white  border border-gray-200/80 flex flex-col break-words box-border h-fit p-6"
          id="invoice"
        >
          <div className="flex justify-between">
            <div className="flex flex-row items-center">
              <img className="h-12 mr-2" src={Logo} alt="" />

              <h1 className="text-lg md:text-xl font-semibold text-black">
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

          <div className="mt-4 grid grid-cols-12 gap-3 text-sm ">
            <div className="col-span-5">
              <h3 className="text-lg font-semibold text-gray-800">Bill to:</h3>
              <h3 className="text-md font-medium text-gray-800">
                {invoice.user.firstName} {invoice.user.lastName}
              </h3>
              <address className="mt-1 not-italic text-gray-500">
                {invoice.user.email}
                <br />
                {invoice.user.phone}
                <br />{" "}
              </address>
            </div>

            <div className="col-span-2"></div>

            <div className="col-span-5 text-end text-sm ">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1 font-medium">Invoice Date:</td>
                    <td className="py-1 font-medium">
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
                              <FaRegCheckCircle />
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

          <div className="mt-4 flex justify-end text-sm ">
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
            <h4 className="text-md font-semibold text-gray-800">Thank you!</h4>
            <p className="text-gray-500 text-sm">
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
      <div className="flex justify-end gap-3">
      <button
        className="my-2 px-2 py-2 bg-stone-950 text-white rounded"
        onClick={() => printDiv("invoice")}
      >
        Print
      </button>
      <button
        className="my-2 px-2 py-2 bg-stone-950 text-white rounded"
        onClick={() => navigate("/account/invoices")}
      >
        Back
      </button>
      </div>
    </>
  );
}

export default ViewInvoice;
