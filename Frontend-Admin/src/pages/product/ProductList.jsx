import React, { useState, useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";

function ProductList() {
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10; // Assuming page size from API response

  useEffect(() => {
    const fetchProducts = async () => {
      const url = `https://api.example.com/products?page=${currentPage}&size=${pageSize}`;
      try {
        // const response = await axios.get(url);
        const data = {
          content: [
            {
              id: "123e4567-e89b-12d3-a456-426614174000",
              name: "Product Name",
              slug: "product-name",
              overview: "Short overview of the product",
              shortDescription: "Brief description",
              description: "Detailed description of the product",
              price: 99.99,
              originalPrice: 129.99,
              tags: ["tag1", "tag2"],
              avgRating: 4.5,
              reviewCount: 150,
              createdOn: "2023-07-08T12:00:00",
              modifiedOn: "2024-07-08T12:00:00",
              category: {
                id: "123e4567-e89b-12d3-a456-426614174001",
                name: "Category Name",
                slug: "category-name",
                description: "Category description",
                productCount: 50,
              },
            },
            {
              id: "123e4567-e89b-12d3-a456-426614174002",
              name: "Another Product",
              slug: "another-product",
              overview: "Short overview of another product",
              shortDescription: "Brief description",
              description: "Detailed description of another product",
              price: 59.99,
              originalPrice: 89.99,
              tags: ["tag3", "tag4"],
              avgRating: 4.0,
              reviewCount: 75,
              createdOn: "2023-06-08T12:00:00",
              modifiedOn: "2024-06-08T12:00:00",
              category: {
                id: "123e4567-e89b-12d3-a456-426614174003",
                name: "Another Category",
                slug: "another-category",
                description: "Another category description",
                productCount: 30,
              },
            },
          ],
          pageable: {
            sort: {
              sorted: true,
              unsorted: false,
              empty: false,
            },
            pageNumber: 0,
            pageSize: 10,
            offset: 0,
            paged: true,
            unpaged: false,
          },
          totalPages: 5,
          totalElements: 50,
          last: false,
          first: true,
          numberOfElements: 10,
          size: 10,
          number: 0,
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          empty: false,
        };
        setProducts(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setAppData((prev) => ({ ...prev, header: "Product List" }));
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message)
      }
    };

    fetchProducts();
  }, [currentPage, setAppData]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="card bg-white overflow-hidden">
        <div className="card-header flex items-center justify-between">
          <h4 className="card-title">Product List</h4>
          <button
            className="btn bg-primary text-white rounded-full"
            onClick={() => {
              navigate("/add-product");
            }}
          >
            Add Product
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
                        Overview
                      </th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">
                        Category
                      </th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product, index) => (
                      <tr
                        key={product.id}
                        className="even:bg-gray-100 odd:bg-white"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {index + 1 + (currentPage - 1) * pageSize}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-wrap text-sm text-gray-800">
                          {product.overview}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {product.category.name}
                        </td>
                        <td className="px-6 py-4 flex gap-1 whitespace-nowrap text-end text-sm font-medium">
                          <a
                            className="text-primary hover:text-sky-700"
                            href={`/edit-product/${product.slug}`}
                          >
                            Edit
                          </a>
                          <a
                            className="text-danger hover:text-red-600"
                            href="#"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default ProductList;
