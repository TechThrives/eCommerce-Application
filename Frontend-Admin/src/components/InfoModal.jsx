import React from "react";
import ReactStars from "react-rating-stars-component";

export default function InfoModal({ setIsModelOpen, data }) {
  const handleClose = () => {
    setIsModelOpen(false);
  };

  return (
    <div
      className="hs-overlay w-full h-full fixed top-0 left-0 z-50 overflow-x-hidden overflow-y-auto open flex justify-center items-center  bg-gray-800 bg-opacity-50"
      aria-overlay="true"
      tabIndex="-1"
    >
      <div className="transition-all sm:max-w-lg sm:w-full m-3">
        <div className="flex flex-col border shadow-sm hs-overlay-open:opacity-100 hs-overlay-open:duration-200 opacity-0 hs-overlay-open:ease-in hs-overlay-open:scale-100 ease-out transition-all scale-95 duration-200 bg-white rounded-lg p-2">
          <div className="flex justify-between items-center py-3 px-4">
            <h3 className=" text-gray-800 text-lg font-bold">Details</h3>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <i className="uil uil-times text-xl"></i>
            </button>
          </div>
          <hr className="border-gray-200" />
          <div className="p-4 overflow-y-auto">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={data.user.profileImageUrl} // Replace with actual user photo URL
                alt="User"
                className="w-12 h-12 object-cover border-1 border-gray-700 rounded-full mr-4"
              />
              <div>
                <h5 className="text-base text-gray-700">
                  {data.user.firstName} {data.user.lastName}
                </h5>
                <p className="text-sm text-gray-500">
                  <ReactStars
                    count={5}
                    value={data.rating}
                    edit={false}
                    size={24}
                    isHalf={true}
                    activeColor="#ffd700"
                    color="#8a8a8a"
                  />
                </p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 overflow-y-auto max-h-60">{data.reviewText}</p>
          </div>
          <div className="flex justify-end p-4 border-t">
            <button
              type="button"
              className="font-medium py-2 px-4 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
