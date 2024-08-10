import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";

function EditCategory() {
  const {categoryId} = useParams();
  const { setAppData, setIsLoading } = useAppContext();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!category.name) {
      notify("Category name is required", "error");
      return;
    }
    if (!category.description) {
      notify("Category description is required", "error");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axiosConfig.put(
        `/api/categories/${categoryId}`,
        category
      );
      if (response.data) {
        notify("Category updated successfully", "success");
        setCategory(response.data);
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
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosConfig.get(`/api/categories/${categoryId}`);
        if (response.data) {
          setCategory(response.data);
        }
        } catch (error) {
          if (error.response) {
            const { data } = error.response;
            if (data.details && Array.isArray(data.details) && data.message) {
              notify(data.message || "An unexpected error occurred.", "error");
              navigate("/category-list");
            } 
          } else {
            notify("An unexpected error occurred.", "error");
          }
        }
    };
    fetchCategory();
    setAppData((prev) => ({ ...prev, header: "Category Edit" }));
  }, [categoryId]);


  return (
    <>
    <div className="flex flex-col gap-6">
      <div className="card">
        <div className="p-6">
          <h4 className="card-title mb-4">Category</h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
            <div>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-medium inline-block mb-2"
              >
                Category Name
              </label>
              <input
                name="name"
                id="name"
                type="text"
                onChange={handleChange}
                value={category.name}
                className="form-input"
                placeholder="Category Name"
              />
            </div>

            <div>
              <label
                htmlFor="overview"
                className="text-gray-800 text-sm font-medium inline-block mb-2"
              >
                Category Description
              </label>
              <div className="flex">
                <textarea
                  id="description"
                  name="description"
                  rows="2"
                  className="form-textarea"
                  onChange={handleChange}
                  value={category.description}
                ></textarea>
              </div>
            </div>

            
          </div>
        </div>
        <div className="flex justify-center gap-2 mb-2">
          <button
            className="btn bg-primary text-white rounded-full"
            onClick={handleSubmit}
          >
            Update Category
          </button>
          <button
            type="button"
            className="btn bg-dark text-white rounded-full"
            onClick={() => {
              navigate("/category-list");
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

export default EditCategory;
