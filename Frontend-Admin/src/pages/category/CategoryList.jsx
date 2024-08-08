import React, { useState, useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
import Pagination from "../../components/Pagination";

function CategoryList() {
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosConfig.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/categories?pageNo=${
            currentPage - 1
          }&pageSize=${pageSize}`
        );
        if (response.data) {
          setCategories(response.data.content);
          setTotalPages(response.data.totalPages);
          setTotalElements(response.data.totalElements);
          setAppData((prev) => ({ ...prev, header: "Category List" }));
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
    };

    fetchCategories();
  }, [currentPage, setAppData]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="card bg-white overflow-hidden">
        <div className="card-header flex items-center justify-between">
          <h4 className="card-title">Category List</h4>
          <button
            className="btn bg-primary text-white rounded-full"
            onClick={() => navigate("/add-category")}
          >
            Add Category
          </button>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">
                        Sr.No
                      </th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">
                        Name
                      </th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">
                        Description
                      </th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">
                        Product Count
                      </th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {categories.length > 0 ? (
                      categories.map((category, index) => (
                        <tr
                          key={category.id}
                          className="even:bg-gray-100 odd:bg-white"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {index + 1 + (currentPage - 1) * pageSize}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {category.name}
                          </td>
                          <td className="px-6 py-4 whitespace-wrap text-sm text-gray-800">
                            {category.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {category.productCount}
                          </td>
                          <td className="px-6 py-4 flex gap-1 whitespace-nowrap text-end text-sm font-medium">
                            <a
                              className="text-primary hover:text-sky-700"
                              href={`/edit-category/${category.id}`}
                            >
                              Edit
                            </a>
                            <a
                              className="text-danger hover:text-red-600"
                              href="#"
                              onClick={() =>
                                console.log(`Delete category ${category.id}`)
                              }
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center"
                        >
                          No Categories Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryList;
