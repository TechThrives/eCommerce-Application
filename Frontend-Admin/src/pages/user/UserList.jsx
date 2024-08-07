import React, { useState, useEffect } from "react";
import { useAppContext } from "../../utils/AppContext";
import axios from "axios";
import Pagination from "../../components/Pagination";

function UserList() {
  const { setAppData } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      const url = `https://api.example.com/categories?page=${currentPage}&size=${pageSize}`;
      try {
        const data = {
          content: [
            {
              id: "123e4567-e89b-12d3-a456-426614174000",
              firstName: "John",
              lastName: "Doe",
              email: "john.doe@example.com",
              phoneNumber: "123-456-7890"
            },
            {
              id: "123e4567-e89b-12d3-a456-426614174001",
              firstName: "Jane",
              lastName: "Smith",
              email: "jane.smith@example.com",
              phoneNumber: "987-654-3210"
            },
            // Add more sample users here
          ],
          pageable: {
            sort: {
              sorted: true,
              unsorted: false,
              empty: false
            },
            pageNumber: 0,
            pageSize: 10,
            offset: 0,
            paged: true,
            unpaged: false
          },
          totalPages: 1,
          totalElements: 2,
          last: true,
          first: true,
          numberOfElements: 2,
          size: 10,
          number: 0,
          sort: {
            sorted: true,
            unsorted: false,
            empty: false
          },
          empty: false
        };
        setUsers(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setAppData((prev) => ({ ...prev, header: "User List" }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, [currentPage, setAppData]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="card bg-white overflow-hidden">
        <div className="card-header flex items-center justify-between">
          <h4 className="card-title">User List</h4>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Sr.No</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">First Name</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Last Name</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Email</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Phone Number</th>
                      <th className="px-6 py-3 text-start text-sm text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user, index) => (
                      <tr key={user.id} className="even:bg-gray-100 odd:bg-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {index + 1 + (currentPage - 1) * pageSize}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {user.firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {user.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {user.phoneNumber}
                        </td>
                        <td className="px-6 py-4 flex gap-1 whitespace-nowrap text-end text-sm font-medium">
                          <a
                            className="text-primary hover:text-sky-700"
                            href={`/view-user/${user.id}`}
                          >
                            View Details
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

export default UserList;
