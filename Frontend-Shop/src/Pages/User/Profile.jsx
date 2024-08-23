import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Features/AppContext";

export default function Profile() {
  const { user } = useAppContext();
  const [additionInfo, setAdditionInfo] = useState({});
  useEffect(() => {
    setAdditionInfo({
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      mobile_number: user.phoneNumber,
      address: user.address,
      state: user.state,
      country: user.country,
      pincode: user.pincode,
    });
  }, []);
  const handleChange = (e) => {
    setAdditionInfo({ ...additionInfo, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-1">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <form className="space-y-4">
              <section className="flex-[2]">
                <h2 className="text-lg font-bold">Additional Details</h2>
                <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                  <div className="relative">
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={additionInfo.first_name}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="first_name"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      First Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={additionInfo.last_name}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="last_name"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Last Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      disabled
                      value={additionInfo.email}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="email"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="mobile_number"
                      name="mobile_number"
                      value={additionInfo.mobile_number}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="mobile_number"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Mobile Number
                    </label>
                  </div>
                </div>
              </section>
              {/* <hr className="my-6 border-gray-300" /> */}
              {/* <section className="flex-[2]">
                <h2 className="text-lg font-bold">Address Information</h2>
                <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                  <div className="relative md:col-span-2">
                    <textarea
                      type="text"
                      id="address"
                      name="address"
                      value={additionInfo.address}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="address"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Address
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={additionInfo.state}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="state"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      City
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={additionInfo.country}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="country"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Country
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={additionInfo.pincode}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="pincode"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Pin Code
                    </label>
                  </div>
                </div>
              </section> */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 text-white rounded-md shadow-sm hover:bg-stone-900"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
