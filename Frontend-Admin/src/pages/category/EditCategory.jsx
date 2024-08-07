import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";

function EditCategory() {
  const {categoryId} = useParams();
  const { setAppData } = useAppContext();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(category);
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      setCategory({
        name: "Category Name",
        description: "Category Description",
      });
    };
    fetchCategory();
  }, [categoryId]);

  useEffect(() => {
    setAppData((prev) => ({ ...prev, header: "Category Edit" }));
  }, [setAppData]);

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
