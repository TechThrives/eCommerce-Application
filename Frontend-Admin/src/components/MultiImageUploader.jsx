import React, { useState, useMemo } from "react";
import { notify } from "../utils/Helper";

function MultiImageUploader({ images, setImages }) {
  const handleImageChange = (event) => {
    const files = event.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith("image/")) {
        if (files[i].size > 2 * 1024 * 1024) {
          notify("Max file size is 2 MB", "warning");
          continue;
        }
        newImages.push(files[i]);
      }
    }

    setImages([...images, ...newImages]);
  };

  const handleImageRemove = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const imagePreviews = useMemo(() => {
    return images.map((image) => ({
      file: image,
      preview: URL.createObjectURL(image),
    }));
  }, [images]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center m-4">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
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
            <p className="mb-2 text-sm text-gray-700">
              <span className="font-semibold">Click to upload</span> or drag
              and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            multiple
            onChange={handleImageChange}
            className="hidden"
            accept="image/png, image/jpeg"
          />
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.length > 0 &&
          imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview.preview}
                alt={`Preview ${index + 1}`}
                className="h-32 w-full object-cover rounded-lg shadow-md"
              />
              <div className="absolute top-0 left-0 bg-black text-white px-1 py-1 rounded-bl-lg text-xs">
                {`${(preview.file.size / 1024).toFixed(2)} KB`}
              </div>
              <button
                onClick={() => handleImageRemove(index)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
      </div>
      {images.length === 0 && (
        <div className="relative flex items-center justify-center">
          <img
            src="/assets/images/no-image.png"
            alt="No Image"
            className="h-32"
          />
          <div className="absolute inset-0 flex items-center justify-center font-semibold text-md text-gray-900">
            No Image Selected
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiImageUploader;
