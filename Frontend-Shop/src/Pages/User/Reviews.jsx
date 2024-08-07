import React, { useEffect, useState } from "react";
import TableView from "../../Components/TableView";
import Pagination from "../../Components/Pagination";

export default function Reviews() {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10; // Assuming page size from API response

  useEffect(() => {
    const fetchReviews = async () => {
      const url = `https://api.example.com/products?page=${currentPage}&size=${pageSize}`;
      try {
        // const response = await axios.get(url);
        const data = {
          content: [
            {
              id: 10001,
              product: "Smartphone",
              review: "Great product!",
              rating: 5,
              date: "2024-07-22 12:46:56.537819",
            },
            {
              id: 10002,
              product:
                "Laptop Good value for moneyGood value for moneyGood value for money",
              review:
                "Good value for moneyGood value for moneyGood value for moneyGood value for moneyGood value for moneyGood value for moneyGood value for money.",
              rating: 4,
              date: "2024-07-22 12:46:56.537819",
            },
            {
              id: 10003,
              product: "Headphones",
              review: "Average quality.",
              rating: 3,
              date: "2024-07-22 12:46:56.537819",
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
        setReviews(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message)
      }
    };

    fetchReviews();
  }, [currentPage, pageSize]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableData = {
    name: "Reviews",
  };

  const columns = [
    {
      field: "id",
      headerName: "No.",
      type: "index",
    },
    {
      field: "product",
      headerName: "Product",
      type: "text",
    },
    {
      field: "review",
      headerName: "Review",
      type: "longText",
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "rating",
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
    },
    {
      headerName: "Action",
      type: "actions",
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="items-center my-4">
          <TableView tableData={tableData} columns={columns} rows={reviews} />
          <div className="flex flex-start">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
