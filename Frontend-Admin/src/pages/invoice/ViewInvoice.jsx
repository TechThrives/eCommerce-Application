import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import axios from "axios";

function ViewInvoice() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const [invoice, setInvoice] = useState({ user: {}, products: [] });
  const pageSize = 10; // Assuming page size

  useEffect(() => {
    const fetchInvoice = async () => {
      const url = `https://api.example.com/invoices/${invoiceId}`;
      try {
        const data = {
          id: "123e4567-e89b-12d3-a456-426614174000",
          user: {
            id: "123e4567-e89b-12d3-a456-426614174000",
            firstName: "John",
            lastName: "Doe",
            email: "nLQp6@example.com",
            phone: "123-456-7890",
          },
          products: [
            {
              id: "123e4567-e89b-12d3-a456-426614174001",
              name: "Product A",
              price: 29.99,
              quantity: 2,
            },
            {
              id: "123e4567-e89b-12d3-a456-426614174002",
              name: "Product B",
              price: 49.99,
              quantity: 1,
            },
          ],
          createdOn: "2024-07-08T12:00:00",
          subTotal: 109.97,
          tax: 8.0,
          totalPrice: 117.97,
          paymentMethod: "Credit Card",
          paymentStatus: "Paid",
        };
        setInvoice(data);
        setAppData((prev) => ({ ...prev, header: "View Invoice" }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInvoice();
  }, [invoiceId, setAppData]);

  const printDiv = (divId) => {
    const printContents = document.getElementById(divId).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
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
        <div class="card p-6" id="invoice">
          <div class="flex justify-between">
            <div>
              <img class="h-6" src={`${process.env.PUBLIC_URL}/assets/images/logo-dark.png`} alt="" />

              <h1 class="mt-2 text-lg md:text-xl font-semibold text-primary">
                Digital Shop
              </h1>
            </div>

            <div class="text-end">
              <h2 class="text-2xl md:text-3xl font-semibold text-gray-800">
                Invoice #
              </h2>
              <span class="mt-1 block text-gray-500">Invoice ID: {invoiceId}</span>

              <address class="mt-2 not-italic text-gray-800">
                <a
                  class="text-blue-500"
                  href="https://www.abc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.abc.com
                </a>
              </address>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-3 gap-3">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Bill to:</h3>
              <h3 class="text-lg font-semibold text-gray-800">
                {invoice.user.firstName} {invoice.user.lastName}
              </h3>
              <address class="mt-2 not-italic text-gray-500">
                {invoice.user.email}
                <br />
                {invoice.user.phone}
                <br />
              </address>
            </div>

            <div class="col-start-3">
              <table class="w-full text-end">
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
                          <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                              <i className="uil uil-check-circle"></i>
                              <h2 class="text-sm font-normal">Paid</h2>
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

          <div class="mt-4 flex justify-end">
            <div class="w-full p-8"></div>

            <div class="w-full max-w-2xl sm:text-end space-y-2">
              <div class="grid grid-cols-1">
                <table class="w-full text-end">
                  <tbody>
                  <tr>
                      <td class="py-1 font-medium">Payment Method:</td>
                      <td class="py-1 font-medium">{invoice.paymentMethod}</td>
                    </tr>
                    <tr>
                      <td class="py-1 font-medium">Payment Status:</td>
                      <td class="py-1 font-medium">{invoice.paymentStatus}</td>
                    </tr>
                    <tr>
                      <td class="py-1 font-medium">Subtotal:</td>
                      <td class="py-1 font-medium">&#8377;{invoice.subTotal}</td>
                    </tr>
                    <tr>
                      <td class="py-1 font-medium">Tax:</td>
                      <td class="py-1 font-medium">&#8377;{invoice.tax}</td>
                    </tr>
                    <tr>
                      <td class="py-1 font-medium">Total Price:</td>
                      <td class="py-1 font-medium">&#8377;{invoice.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <h4 class="text-lg font-semibold text-gray-800">Thank you!</h4>
            <p class="text-gray-500">
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
                >
                  www.abc.com
                </a>
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <p class="mt-5 text-sm text-gray-500">
              {new Date().getFullYear()} &copy; DigitalShop.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewInvoice;
