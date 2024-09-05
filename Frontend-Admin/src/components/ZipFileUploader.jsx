import React, { useState } from "react";
import { notify } from "../utils/Helper";

function ZipFileUploader({ zipFile, setZipFile }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.type === "application/zip") {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB size limit
        notify("Max file size is 10 MB", "warning");
        return;
      }
      setZipFile(file);
    }
  };

  const handleFileRemove = () => {
    setZipFile(null);
  };

  return (
    <div className="w-full lg:flex lg:items-center lg:justify-center lg:space-x-4">
      {/* File picker */}
      <div className="flex items-center justify-center lg:w-1/2">
        <label
          htmlFor="zip-file"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center ">
            <svg
              className="w-8 h-8 mb-2 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-center text-xs text-gray-500">ZIP</p>
            </div>
          </div>
          <input
            id="zip-file"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".zip"
          />
        </label>
      </div>

      {/* File info */}
      <div className="lg:w-1/2 mt-4 lg:mt-0">
        {zipFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <i className="uil uil-file-check-alt text-2xl"></i>
              <div>
                <p className="text-sm text-gray-900 font-medium break-all">
                  {zipFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {`${(zipFile.size / 1024 / 1024).toFixed(2)} MB`}
                </p>
              </div>
            </div>
            <button
              onClick={handleFileRemove}
              className="ml-4 bg-red-500 text-white px-4 py-1 rounded-md"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <i className="uil uil-file-alt text-2xl"></i>
            <div>
              <p className="text-sm text-gray-900 font-medium">
                No file selected
              </p>
              <p className="text-xs text-gray-500">Select a .zip file</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ZipFileUploader;
