import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/AppContext";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
import Pagination from "../../components/Pagination";
import TableView from "../../components/TableView";

function UserList() {
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosConfig.get(
          `/api/users?pageNo=${
            currentPage - 1
          }&pageSize=${pageSize}`
        );
        if (response.data) {
          setUsers(response.data.content);
          setTotalPages(response.data.totalPages);
          setTotalElements(response.data.totalElements);
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
    
    fetchUsers();
    setAppData((prev) => ({ ...prev, header: "User List" }));
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableData = {
    name: "User List",
  };

  const columns = [
    { headerName: "Sr.No", field: "id", type: "index" },
    { headerName: "First Name", field: "firstName", type: "text" },
    { headerName: "Last Name", field: "lastName", type: "text" },
    { headerName: "Email", field: "email", type: "text" },
    { headerName: "Phone Number", field: "phoneNumber", type: "text" },
    { 
      headerName: "Action", 
      field: "actions", 
      type: "actions", 
      actions: ["view"], 
      className: "font-medium" 
    },
  ];

  return (
    <>
      <div className="card bg-white overflow-hidden">
        <TableView
          tableData={tableData}
          columns={columns}
          rows={users}
          currentPage={currentPage}
          pageSize={pageSize}
          handleView={(row) => navigate(`/view-user/${row.id}`)}
        />
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

export default UserList;
