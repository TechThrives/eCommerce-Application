import React, { useEffect } from "react";
import { useAppContext } from "../utils/AppContext";

function Dashboard() {
  const { setAppData } = useAppContext();
  useEffect(() => {
    setAppData((prev) => ({ ...prev, header: "Dashboard" }));
  }, [setAppData]);
  return (
    <>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="p-5 flex items-center justify-between">
            <span>
              <span className="text-slate-400 font-semibold block">
                Total Visitors
              </span>
              <span className="text-xl font-semibold">
                <span>4564</span>
              </span>
            </span>

            <span className="flex justify-center items-center h-14 w-14 bg-blue-600/5 shadow shadow-blue-600/5 text-blue-600">
              <i className="uil uil-user text-xl"></i>
            </span>
          </div>

          <div className="px-5 py-4 bg-slate-50">
            <a
              href=""
              className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 text-blue-600 hover:text-blue-600 after:bg-blue-600"
            >
              View data <i className="uil uil-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="card">
          <div className="p-5 flex items-center justify-between">
            <span>
              <span className="text-slate-400 font-semibold block">
                Revenue
              </span>
              <span className="text-xl font-semibold">
                $<span>7564</span>
              </span>
            </span>

            <span className="flex justify-center items-center h-14 w-14 bg-blue-600/5 shadow shadow-blue-600/5 text-blue-600">
              <i className="uil uil-dollar-sign-alt text-xl"></i>
            </span>
          </div>

          <div className="px-5 py-4 bg-slate-50">
            <a
              href=""
              className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 text-blue-600 hover:text-blue-600 after:bg-blue-600"
            >
              View data <i className="uil uil-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="card">
          <div className="p-5 flex items-center justify-between">
            <span>
              <span className="text-slate-400 font-semibold block">Orders</span>
              <span className="text-xl font-semibold">
                <span>7891</span>+
              </span>
            </span>

            <span className="flex justify-center items-center h-14 w-14 bg-blue-600/5 shadow shadow-blue-600/5 text-blue-600">
              <i className="uil uil-shopping-bag text-xl"></i>
            </span>
          </div>

          <div className="px-5 py-4 bg-slate-50">
            <a
              href=""
              className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 text-blue-600 hover:text-blue-600 after:bg-blue-600"
            >
              View data <i className="uil uil-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="card">
          <div className="p-5 flex items-center justify-between">
            <span>
              <span className="text-slate-400 font-semibold block">Items</span>
              <span className="text-xl font-semibold">
                <span>486</span>
              </span>
            </span>

            <span className="flex justify-center items-center h-14 w-14 bg-blue-600/5 shadow shadow-blue-600/5 text-blue-600">
              <i className="uil uil-store text-xl"></i>
            </span>
          </div>

          <div className="px-5 py-4 bg-slate-50">
            <a
              href=""
              className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 text-blue-600 hover:text-blue-600 after:bg-blue-600"
            >
              View data <i className="uil uil-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="card overflow-hidden">
          <div className="card-header flex justify-between items-center">
            <h4 className="card-title">Recent Buyers</h4>
            <a href="" className="btn btn-sm bg-light !text-sm text-gray-800 ">
              Export
            </a>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle whitespace-nowrap">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-light/40 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-start">Product</th>
                      <th className="px-6 py-3 text-start">Customers</th>
                      <th className="px-6 py-3 text-start">Categories</th>
                      <th className="px-6 py-3 text-start">Popularity</th>
                      <th className="px-6 py-3 text-start">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-3">iPhone X</td>
                      <td className="px-6 py-3">Tiffany W. Yang</td>
                      <td className="px-6 py-3">
                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">
                          Mobile
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex w-full h-1.5 bg-light rounded-full overflow-hidden">
                          <div
                            className="progress-bar progress-bar-striped bg-success"
                            role="progressbar"
                            aria-valuenow="85"
                            aria-valuemin="20"
                            aria-valuemax="100"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-3">$ 1200.00</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-3">iPad</td>
                      <td className="px-6 py-3">Dale P. Warman</td>
                      <td className="px-6 py-3">
                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">
                          Tablet
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex w-full h-1.5 bg-light rounded-full overflow-hidden">
                          <div
                            className="progress-bar progress-bar-striped bg-success"
                            role="progressbar"
                            aria-valuenow="72"
                            aria-valuemin="20"
                            aria-valuemax="100"
                            style={{ width: "72%" }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-3">$ 1190.00</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-3">OnePlus</td>
                      <td className="px-6 py-3">Garth J. Terry</td>
                      <td className="px-6 py-3">
                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">
                          Electronics
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex w-full h-1.5 bg-light rounded-full overflow-hidden">
                          <div
                            className="progress-bar progress-bar-striped bg-success"
                            role="progressbar"
                            aria-valuenow="43"
                            aria-valuemin="20"
                            aria-valuemax="100"
                            style={{ width: "43%" }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-3">$ 999.00</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-3">ZenPad</td>
                      <td className="px-6 py-3">Marilyn D. Bailey</td>
                      <td className="px-6 py-3">
                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">
                          Cosmetics
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex w-full h-1.5 bg-light rounded-full overflow-hidden">
                          <div
                            className="progress-bar progress-bar-striped bg-success"
                            role="progressbar"
                            aria-valuenow="37"
                            aria-valuemin="20"
                            aria-valuemax="100"
                            style={{ width: "37%" }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-3">$ 1150.00</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-3">Pixel 2</td>
                      <td className="px-6 py-3">Denise R. Vaughan</td>
                      <td className="px-6 py-3">
                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">
                          Appliences
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex w-full h-1.5 bg-light rounded-full overflow-hidden">
                          <div
                            className="progress-bar progress-bar-striped bg-success"
                            role="progressbar"
                            aria-valuenow="82"
                            aria-valuemin="20"
                            aria-valuemax="100"
                            style={{ width: "82%" }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-3">$ 1180.00</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3">Pixel 2</td>
                      <td className="px-6 py-3">Jeffery R. Wilson</td>
                      <td className="px-6 py-3">
                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">
                          Mobile
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex w-full h-1.5 bg-light rounded-full overflow-hidden">
                          <div
                            className="progress-bar progress-bar-striped bg-success"
                            role="progressbar"
                            aria-valuenow="36"
                            aria-valuemin="20"
                            aria-valuemax="100"
                            style={{ width: "36%" }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-3">$ 1180.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="card-header flex justify-between items-center">
            <h4 className="card-title">Account Transactions</h4>
            <a href="" className="btn btn-sm bg-light !text-sm text-gray-800 ">
              Export
            </a>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle whitespace-nowrap">
              <div className="overflow-hidden">
                <table className="min-w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-3">
                        <div className="font-medium">4257 **** **** 7852</div>
                        <div className="text-xs">11 April 2023</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">$79.49</div>
                        <div className="text-xs">Amount</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">Visa</div>
                        <div className="text-xs">Card</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">Helen Warren</div>
                        <div className="text-xs">Pay</div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-3">
                        <div className="font-medium">4427 **** **** 4568</div>
                        <div className="text-xs">28 Jan 2023</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">$1254.00</div>
                        <div className="text-xs">Amount</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">Visa</div>
                        <div className="text-xs">Card</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">Kayla Lambie</div>
                        <div className="text-xs">Pay</div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-3">
                        <div className="font-medium">4265 **** **** 0025</div>
                        <div className="text-xs">08 Dec 2022</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">$784.25</div>
                        <div className="text-xs">Amount</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">Master</div>
                        <div className="text-xs">Card</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">Hugo Lavarack</div>
                        <div className="text-xs">Pay</div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-3">
                        <div className="font-medium">7845 **** **** 5214</div>
                        <div className="text-xs">03 Dec 2022</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">$485.24</div>
                        <div className="text-xs">Amount</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">Stripe</div>
                        <div className="text-xs">Card</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">Amber Scurry</div>
                        <div className="text-xs">Pay</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3">
                        <div className="font-medium">4257 **** **** 7852</div>
                        <div className="text-xs">12 Nov 2022</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">$8964.04</div>
                        <div className="text-xs">Amount</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">Maestro</div>
                        <div className="text-xs">Card</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-medium">Caitlyn Gibney</div>
                        <div className="text-xs">Pay</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
