import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosConfig from "../../Utils/axiosConfig";
import { notify } from "../../Utils/Helper";
import Logo from "../../Components/Images/Logo.svg";
import { FaRegCheckCircle } from "react-icons/fa";
import Loader from "../../Components/Loader";

function ViewInvoice() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [invoice, setInvoice] = useState({ user: {}, products: [] });
  const [printContent, setPrintContent] = useState("");

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axiosConfig.get(`/api/invoices/${invoiceId}`);
        if (response.data) {
          setInvoice(response.data);
          generatePrintContent(response.data, totalTax);
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
      setIsLoading(false);
    };
    setIsLoading(true);
    fetchInvoice();
  }, [invoiceId]);

  const itemTaxes = useMemo(() => {
    return invoice.products.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      tax: (item.price * invoice.tax).toFixed(2),
    }));
  }, [invoice]);

  const totalTax = useMemo(() => {
    return itemTaxes
      .reduce((total, item) => total + parseFloat(item.tax), 0)
      .toFixed(2);
  }, [itemTaxes]);

  const generatePrintContent = (invoice, totalTax) => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invoice - Digital Shop</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
    <style>
      @media print {
        @page {
          margin: 0cm;
        }
        body {
          margin: 1cm;
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
      }
    </style>
  </head>
  <body class="flex flex-col min-h-screen">
    <main class="flex-grow">
      <div class="bg-white overflow-hidden m-4 p-6">
        <div
          class="relative flex flex-col break-words box-border h-fit bg-white overflow-hidden scrollable-content"
        >
          <div
            class="relative bg-white flex flex-col break-words box-border h-fit p-6"
          >
            <div class="flex justify-between">
              <div class="flex flex-row items-center">
                <img class="h-12 mr-2" src=${Logo} alt="" />
                <h1 class="text-lg md:text-xl font-semibold text-black">
                  Digital Shop
                </h1>
              </div>
              <div class="text-end">
                <h2 class="text-2xl font-semibold text-gray-900">Invoice #</h2>
                <span class="mt-1 block text-gray-500"
                  >Invoice ID: ${invoiceId}</span
                >
                <address class="mt-2 not-italic text-gray-800">
                  <a
                    class="text-blue-500"
                    href="https://www.abc.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >www.abc.com</a
                  >
                </address>
              </div>
            </div>
            <div class="mt-4 grid grid-cols-12 gap-3 text-sm">
              <div class="col-span-5">
                <h3 class="text-lg font-semibold text-gray-900">Bill to:</h3>
                <h3 class="text-md font-medium text-gray-800">
                  ${invoice.user.firstName} ${invoice.user.lastName}
                </h3>
                <address class="mt-1 not-italic text-gray-700">
                  ${invoice.user.email}<br />
                  ${invoice.user.phoneNumber}<br />
                </address>
              </div>
              <div class="col-span-2"></div>
              <div class="col-span-5 text-end text-sm">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="py-1 font-medium">Invoice Date:</td>
                      <td class="py-1 font-medium text-gray-700">
                        ${new Date(invoice.createdOn).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="flex flex-col mt-2">
              <div class="overflow-x-auto">
                <div class="inline-block min-w-full py-2 align-middle">
                  <div
                    class="overflow-hidden border border-gray-200 rounded-lg"
                  >
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-blue-50">
                        <tr>
                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-medium text-left text-gray-800"
                          >
                            Sr. No
                          </th>
                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-medium text-left text-gray-800"
                          >
                            Product Name
                          </th>
                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-medium text-left text-gray-800"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-medium text-left text-gray-800"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        ${invoice.products
                          .map(
                            (product, index) => `
                          <tr key="${product.id}">
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              ${index + 1}
                            </td>
                            <td class="px-4 py-4 text-sm text-gray-500 text-wrap">
                              ${product.name}
                            </td>
                            <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                              &#8377;${product.price}
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                                <i class="fas fa-check-circle"></i>
                                <h2 class="text-sm font-normal">Paid</h2>
                              </div>
                            </td>
                          </tr>
                        `
                          )
                          .join("")}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 flex justify-end text-sm">
              <div class="w-full p-8"></div>
              <div class="w-full max-w-2xl sm:text-end space-y-2">
                <div class="grid grid-cols-1">
                  <table class="w-full text-end">
                    <tbody>
                      <tr>
                        <td class="py-1 font-medium">Payment Method:</td>
                        <td class="py-1 font-medium">
                          ${invoice.paymentMethod}
                        </td>
                      </tr>
                      <tr>
                        <td class="py-1 font-medium">Payment Status:</td>
                        <td class="py-1 font-medium">
                          ${invoice.paymentStatus}
                        </td>
                      </tr>
                      <tr>
                        <td class="py-1 font-medium">Subtotal:</td>
                        <td class="py-1 font-medium">
                          &#8377;${invoice.subTotal}
                        </td>
                      </tr>
                      <tr>
                        <td class="py-1 font-medium">Tax:</td>
                        <td class="py-1 font-medium">&#8377;${totalTax}</td>
                      </tr>
                      <tr>
                        <td class="py-1 font-medium">Total Price:</td>
                        <td class="py-1 font-medium">
                          &#8377;${invoice.totalPrice}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="mt-6">
              <h4 class="text-md font-semibold text-gray-800">Thank you!</h4>
              <p class="text-gray-500 text-sm">
                If you have any questions concerning this invoice, use the
                following contact information:
              </p>
              <div class="mt-2">
                <p class="block text-sm font-medium text-gray-800">
                  digitalshop@example.com
                </p>
                <p class="block text-sm font-medium text-gray-800">
                  <a
                    class="text-blue-500"
                    href="https://www.abc.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >www.abc.com</a
                  >
                </p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <p class="mt-5 text-sm text-gray-500">
                <span id="container-year"></span> &copy; DigitalShop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="text-sm bg-slate-100 text-slate-600 p-2 text-center">
      <p>
        &copy; <span id="footer-year"></span> Digital Shop. All Rights Reserved.
      </p>
    </footer>

    <script>
      document.getElementById("container-year").innerHTML =
        new Date().getFullYear();
      document.getElementById("footer-year").innerHTML =
        new Date().getFullYear();
    </script>
  </body>
</html>
`;
    setPrintContent(htmlContent);
  };

  const handlePrint = () => {
    const printFrame = document.getElementById("printFrame");
    const printDoc =
      printFrame.contentDocument || printFrame.contentWindow.document;

    // Open the iframe document for writing
    printDoc.open();
    printDoc.write(printContent);
    printDoc.close();

    // Wait for the iframe to load the content before printing
    printFrame.onload = () => {
      printFrame.contentWindow.focus(); // Focus on the iframe
      printFrame.contentWindow.print(); // Print the content
    };
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full min-h-screen flex items-center justify-center bg-white absolute inset-0 z-10">
          <Loader />
        </div>
      ) : (
        <>
          <iframe
            id="printFrame"
            style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
          ></iframe>

          <div className="relative  border border-gray-200/80 flex flex-col break-words box-border h-fit bg-white overflow-hidden scrollable-content">
            <div className="relative bg-white  border border-gray-200/80 flex flex-col break-words box-border h-fit p-6">
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
                  <h3 className="text-lg font-semibold text-gray-800">
                    Bill to:
                  </h3>
                  <h3 className="text-md font-medium text-gray-800">
                    {invoice.user.firstName} {invoice.user.lastName}
                  </h3>
                  <address className="mt-1 not-italic text-gray-500">
                    {invoice.user.email}
                    <br />
                    {invoice.user.phone}
                    <br />
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
                              <td className="px-4 py-4 text-sm text-gray-500 text-wrap">
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
                          <td className="py-1 font-medium">
                            &#8377;{totalTax}
                          </td>
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
                <h4 className="text-md font-semibold text-gray-800">
                  Thank you!
                </h4>
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
              onClick={() => handlePrint()}
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
      )}
    </>
  );
}

export default ViewInvoice;
