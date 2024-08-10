import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import MultiImageUploader from "../../components/MultiImageUploader";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditProduct() {
  const {productId} = useParams();
  const { setAppData, setIsLoading } = useAppContext();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    overview: "",
    shortDescription: "",
    price: 0.0,
    originalPrice: 0.0,
    quantity: "",
    categoryId: "",
  });
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Split tagInput by commas and trim whitespace from each tag
      const newTags = tagInput.split(",").map((tag) => tag.trim());

      // Filter out empty tags and tags already in the list
      const uniqueTags = newTags.filter(
        (tag) => tag !== "" && !tags.includes(tag)
      );

      // Add unique tags to the existing tags list
      setTags([...tags, ...uniqueTags]);
      setTagInput("");
    }
  };

  const urlToFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosConfig.get(`/api/products/${productId}`);
        if (response.data) {
          setProduct(response.data);
          setProduct((prev) => ({ ...prev, categoryId: response.data.category.id }));
          setTags(response.data.tags);
          setDescription(response.data.description);
          const imageFiles = await Promise.all(
            response.data.imageUrls.map(async (imageUrl) => {
              const file = await urlToFile(imageUrl, imageUrl); // Ensure urlToFile is correctly defined
              return file;
            })
          );
    
          setImages(imageFiles);
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          if (data.details && Array.isArray(data.details) && data.message) {
            notify(data.message || "An unexpected error occurred.", "error");
            navigate("/product-list");
          }
        } else {
          notify("An unexpected error occurred.", "error");
        }
      }

    }

    const fetchCategories = async () => {
      try {
        const response = await axiosConfig.get(
          `/api/categories/all`
        );
        if (response.data) {
          setCategories(response.data);
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
    };
    fetchProduct();
    fetchCategories();
    setAppData((prev) => ({ ...prev, header: "Product Edit" }));
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!images.length) {
      notify("Product image is required", "error");
      return;
    }
    if (!product.name) {
      notify("Product name is required", "error");
      return;
    }
    if (!product.categoryId) {
      notify("Please select a category", "error");
      return;
    }
    if (!product.overview) {
      notify("Product overview is required", "error");
      return;
    }
    if (!product.shortDescription) {
      notify("Product short description is required", "error");
      return;
    }
    if (!description) {
      notify("Product description is required", "error");
      return;
    }
    if (product.originalPrice <= 0) {
      notify("Product original price is required", "error");
      return;
    }
    if (product.price < 0 || product.price > product.originalPrice) {
      notify("Product price must be between 0 and original price", "error");
      return;
    }
    if (!tags.length) {
      notify("At least one tag is required", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("overview", product.overview);
    formData.append("shortDescription", product.shortDescription);
    formData.append("description", description);
    formData.append("price", product.price);
    formData.append("originalPrice", product.originalPrice);
    formData.append("quantity", product.quantity);
    tags.forEach((tag) => {
      formData.append("tags", tag);
    });
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("categoryId", product.categoryId);
    setIsLoading(true);
    try {
      const response = await axiosConfig.put(
        `/api/products/${productId}`,
        formData
      );
      if (response.data) {
        notify("Product updated successfully", "success");
        if (response.data) {
          setProduct(response.data);
          setProduct((prev) => ({ ...prev, categoryId: response.data.category.id }));
          setTags(response.data.tags);
          setDescription(response.data.description);
          const imageFiles = await Promise.all(
            response.data.imageUrls.map(async (imageUrl) => {
              const file = await urlToFile(imageUrl, imageUrl); // Ensure urlToFile is correctly defined
              return file;
            })
          );

          setImages(imageFiles);
        }
        
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.details && Array.isArray(data.details) && data.message) {
          notify(`${data.message}: ${data.details.join(", ")}`, "error");
        } else {
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
      <div className="flex flex-col gap-6">
        <div className="card">
          <div className="p-6">
            <h4 className="card-title mb-4">Product</h4>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label
                  htmlFor="images"
                  className="text-gray-800 text-sm font-medium inline-block mb-2"
                >
                  Product Images{" "}
                  <em className="text-xs text-gray-500">
                    First image will be featured
                  </em>
                </label>
                <MultiImageUploader images={images} setImages={setImages} />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="text-gray-800 text-sm font-medium inline-block mb-2"
                >
                  Product Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  onChange={handleChange}
                  value={product.name}
                  className="form-input"
                  placeholder="Product Name"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="text-gray-800 text-sm font-medium inline-block mb-2"
                >
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="categoryId"
                  onChange={handleChange}
                  value={product.categoryId}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="overview"
                  className="text-gray-800 text-sm font-medium inline-block mb-2"
                >
                  Overview
                </label>
                <div className="flex">
                  <textarea
                    id="overview"
                    name="overview"
                    rows="2"
                    className="form-textarea"
                    onChange={handleChange}
                    value={product.overview}
                  ></textarea>
                </div>
              </div>

              <div>
                <label
                  htmlFor="shortDescription"
                  className="text-gray-800 text-sm font-medium inline-block mb-2"
                >
                  Short Description
                </label>
                <div className="flex">
                  <textarea
                    id="shortDescription"
                    name="shortDescription"
                    rows="2"
                    className="form-textarea"
                    onChange={handleChange}
                    value={product.shortDescription}
                  ></textarea>
                </div>
              </div>

              <div className="lg:col-span-2">
                <label
                  htmlFor="description"
                  className="text-gray-800 text-sm font-medium inline-block mb-2"
                >
                  Description
                </label>
                <ReactQuill
                  id="description"
                  name="description"
                  theme="snow"
                  onChange={setDescription}
                  value={description}
                />
              </div>

              <div>
                <label
                  htmlFor="originalPrice"
                  className="text-gray-800 text-sm font-medium inline-block mb-2"
                >
                  Original Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    onChange={handleChange}
                    min={0}
                    value={product.originalPrice}
                    className="form-input px-12 "
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 start-4 flex items-center pointer-events-none z-20">
                    <span className="text-gray-500">&#8377;</span>
                  </div>
                  <div className="absolute inset-y-0 end-4 flex items-center pointer-events-none z-20">
                    <span className="text-gray-500">INR</span>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="text-gray-800 text-sm font-medium inline-block mb-2"
                >
                  Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    onChange={handleChange}
                    value={product.price}
                    min={0}
                    max={product.originalPrice}
                    className="form-input px-12"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 start-4 flex items-center pointer-events-none z-20">
                    <span className="text-gray-500">&#8377;</span>
                  </div>
                  <div className="absolute inset-y-0 end-4 flex items-center pointer-events-none z-20">
                    <span className="text-gray-500">INR</span>
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="tags"
                  className="text-gray-800 text-sm font-medium inline-block mb-2"
                >
                  Product Tags
                </label>
                <div>
                  <div className="flex flex-wrap items-end gap-2 mb-2 w-full">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1.5 py-0.5 px-1.5 text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="focus:outline-none"
                        >
                          <svg
                            className="w-4 h-4 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    name="tags"
                    id="tags"
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    className="form-input"
                    placeholder="Product Tags"
                  />
                  <em className="text-xs text-gray-500">
                    Press Enter to add tag
                  </em>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mb-2">
            <button
              className="btn bg-primary text-white rounded-full"
              onClick={handleSubmit}
            >
              Update Product
            </button>
            <button
              type="button"
              className="btn bg-dark text-white rounded-full"
              onClick={() => {
                navigate("/product-list");
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
