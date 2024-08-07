import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import MultiImageUploader from "../../components/MultiImageUploader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddProduct() {
  const { setAppData } = useAppContext();
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

  useEffect(() => {
    setAppData((prev) => ({ ...prev, header: "Product Add" }));
  }, [setAppData]);

  useEffect(() => {
    const fetchCategories = async () => {
      // const response = await fetch("");
      // const data = await response.json();
      setCategories([
        { name: "Category 1", id: 1 },
        { name: "Category 2", id: 2 },
      ]);
    };
    fetchCategories();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(product);
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
    console.log(formData.getAll("description"));
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
                    value={product.originalPrice}
                    className="form-input px-12 "
                    placeholder="0.00"
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
                    className="form-input px-12"
                    placeholder="0.00"
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
                      <span className="flex items-center gap-1.5 py-0.5 px-1.5 text-xs font-medium bg-primary/10 text-primary">
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
                    placeholder="Product Name"
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
              Add Product
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

export default AddProduct;
