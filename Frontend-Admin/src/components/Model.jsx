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
          <h3 className="text-lg font-bold">
            Confirm Action
          </h3>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            <span className="sr-only">Close</span>
            <i className="uil uil-times text-xl"></i>
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600">
            Are you sure you want to perform this action?
          </p>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            type="button"
            className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="ml-3 py-2 px-4 bg-warning text-white rounded-md shadow-sm hover:bg-yellow-700"
            onClick={modelAction}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
