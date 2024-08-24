import React, { useState } from "react";
import { useAppContext } from "../../Features/AppContext";
import { FaEdit } from "react-icons/fa";
import axiosConfig from "../../Utils/axiosConfig";
import { notify } from "../../Utils/Helper";
import Loader from "../../Components/Loader";

export default function Profile() {
  const { user } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [additionInfo, setAdditionInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profileImageUrl: user.profileImageUrl,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImg" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setAdditionInfo((prev) => ({
          ...prev,
          profileImageUrl: reader.result,
          image: file,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setAdditionInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", additionInfo.firstName);
    formData.append("lastName", additionInfo.lastName);
    if (additionInfo.image) {
      formData.append("image", additionInfo.image);
    }

    try {
      const response = await axiosConfig.put(`api/users/${user.id}`, formData);
      if (response.data) {
        notify("Profile updated successfully.", "success");
        setAdditionInfo({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          profileImageUrl: response.data.profileImageUrl,
          image: null,
        });
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

  return (
    <>
      {isLoading ? (
        <div className="w-full min-h-screen flex items-center justify-center bg-white absolute inset-0 z-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-1">
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="space-y-4">
                  <section className="flex-[2]">
                    <h2 className="text-lg font-bold">Additional Details</h2>
                    <div className="mx-auto w-32 h-32 mb-4 border rounded-full relative bg-gray-100 shadow-inset group">
                      <img
                        id="image"
                        className="object-cover w-full h-32 rounded-full"
                        src={additionInfo.profileImageUrl}
                        alt="Profile"
                      />
                      <div className="flex flex-col justify-center w-32 absolute inset-0">
                        <label
                          htmlFor="profileImg"
                          className="text-md cursor-pointer flex items-center justify-center absolute inset-0 w-full h-full rounded-full bg-gray-100/90 opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                        >
                          <FaEdit className="w-6 h-6" />
                        </label>
                        <input
                          name="profileImg"
                          id="profileImg"
                          accept="image/*"
                          className="hidden"
                          type="file"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Form fields */}
                    <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                      {/* First Name Field */}
                      <div className="relative">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={additionInfo.firstName}
                          onChange={handleChange}
                          className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="firstName"
                          className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          First Name
                        </label>
                      </div>

                      {/* Last Name Field */}
                      <div className="relative">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={additionInfo.lastName}
                          onChange={handleChange}
                          className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="lastName"
                          className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Last Name
                        </label>
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={additionInfo.email}
                          className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                          placeholder=" "
                          required
                          readOnly
                          disabled
                        />
                        <label
                          htmlFor="email"
                          className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Email
                        </label>
                      </div>

                      {/* Phone Number Field */}
                      <div className="relative">
                        <input
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={additionInfo.phoneNumber}
                          className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                          placeholder=" "
                          required
                          readOnly
                          disabled
                        />
                        <label
                          htmlFor="phoneNumber"
                          className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Phone Number
                        </label>
                      </div>
                    </div>
                  </section>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-stone-800 text-white rounded-md shadow-sm hover:bg-stone-900"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
}
