import React from "react";
import ReactStars from "react-rating-stars-component";

export default function InfoModal({ setIsModelOpen, data }) {
  const handleClose = () => {
    setIsModelOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      aria-modal="true"
      tabIndex="-1"
    >
      <div className="w-full sm:max-w-lg m-3">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Details</h3>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <hr className="my-4 border-gray-200" />
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={data.user.profileImageUrl} // Replace with actual user photo URL
                alt="User"
                className="w-12 h-12 object-cover border border-gray-700 rounded-full"
              />
              <div>
                <h5 className="text-base text-gray-700">
                  {data.user.firstName} {data.user.lastName}
                </h5>
                <ReactStars
                  count={5}
                  value={data.rating}
                  edit={false}
                  size={24}
                  isHalf={true}
                  activeColor="#ffd700"
                  color="#8a8a8a"
                />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 overflow-y-auto max-h-60">
              {data.reviewText}The issue with the modal not displaying content could be due to the incorrect use of some CSS classes or JavaScript-based classes that aren't functioning as expected, particularly the hs-overlay-open classes. These classes seem to be related to a library or custoThe issue with the modal not displaying content could be due to the incorrect use of some CSS classes or JavaScript-based classes that aren't functioning as expected, particularly the hs-overlay-open classes. These classes seem to be related to a library or custoThe issue with the modal not displaying content could be due to the incorrect use of some CSS classes or JavaScript-based classes that aren't functioning as expected, particularly the hs-overlay-open classes. These classes seem to be related to a library or custoThe issue with the modal not displaying content could be due to the incorrect use of some CSS classes or JavaScript-based classes that aren't functioning as expected, particularly the hs-overlay-open classes. These classes seem to be related to a library or custo The issue with the modal not displaying content could be due to the incorrect use of some CSS classes or JavaScript-based classes that aren't functioning as expected, particularly the hs-overlay-open classes. These classes seem to be related to a library or custoThe issue with the modal not displaying content could be due to the incorrect use of some CSS classes or JavaScript-based classes that aren't functioning as expected, particularly the hs-overlay-open classes. These classes seem to be related to a library or custoThe issue with the modal not displaying content could be due to the incorrect use of some CSS classes or JavaScript-based classes that aren't functioning as expected, particularly the hs-overlay-open classes. These classes seem to be related to a library or custoThe issue with the modal not displaying content could be due to the incorrect use of some CSS classes or JavaScript-based classes that aren't functioning as expected, particularly the hs-overlay-open classes. These classes seem to be related to a library or custoThe issue with the modal not displaying content could be due to the incorrect use of some CSS classes or JavaScript-based classes that aren't functioning as expected, particularly the hs-overlay-open classes. These classes seem to be related to a library or custoThe issue with the modal not displaying content could be due to the incorrect use of some CSS classes or JavaScript-based classes that aren't functioning as expected, particularly the hs-overlay-open classes. These classes seem to be related to a library or custoThe issue with the modal not displaying content could be due to the incorrect use of some CSS classes or JavaScript-based classes that aren't functioning as expected, particularly the hs-overlay-open classes. These classes seem to be related to a library or custo
            </p>
          </div>
          <div className="flex justify-end mt-4">
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
