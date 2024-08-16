import React from "react";

export default function Model({ setIsModelOpen, modelAction }) {
  const handleClose = () => {
    setIsModelOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">Confirm Action</h3>
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
        <div className="p-6">
          <p className="text-gray-700 font-semibold">
            Are you sure you want to perform this action?
          </p>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            type="button"
            className="font-medium py-2 px-4 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="font-medium ml-3 py-2 px-4 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600"
            onClick={modelAction}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
