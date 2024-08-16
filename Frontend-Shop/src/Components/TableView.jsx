import React from "react";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import {
  FaClock,
  FaTimesCircle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

const TableView = ({
  tableData,
  columns,
  rows,
  handleView = (id) => {},
  handleEdit = (id) => {},
  handleDelete = (id) => {},
}) => {
  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const renderStars = (value) => {
    return (
      <div className="flex items-center">
        <ReactStars
          count={5}
          value={value}
          edit={false}
          size={24}
          isHalf={true}
          emptyIcon={<IoMdStarOutline />}
          halfIcon={<IoMdStarHalf />}
          fullIcon={<IoMdStar />}
          activeColor="#ffd700"
          className="inline-flex"
        />
      </div>
    );
  };
  const renderPaymentStatus = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 bg-yellow-100/60">
            <FaClock />
            <h2 className="text-sm font-normal">Pending</h2>
          </div>
        );
      case "SUCCESS":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
            <FaCheckCircle />
            <h2 className="text-sm font-normal">Paid</h2>
          </div>
        );
      case "FAILED":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60">
            <FaTimesCircle />
            <h2 className="text-sm font-normal">Failed</h2>
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-gray-500 bg-gray-100/60">
            <FaExclamationCircle />
            <h2 className="text-sm font-normal">{status}</h2>
          </div>
        );
    }
  };

  const getNestedValue = (object, path) => {
    return path.split(".").reduce((o, p) => (o ? o[p] : ""), object);
  };

  const renderCellContent = (column, row, index) => {
    const value = column.jsonField
      ? getNestedValue(row, column.jsonField)
      : row[column.field];

    if (column.render) {
      return column.render(row);
    }

    switch (column.type) {
      case "index":
        return <p className="font-bold text-blue-500">{index + 1}</p>;
      case "text":
        return <p className="text-sm text-wrap">{value}</p>;
      case "longText":
        return (
          <p className="text-sm text-wrap" title={value}>
            {truncateText(value, 50)}
          </p>
        );
      case "price":
        return <span className="font-bold">&#8377;{value}</span>;
      case "status":
        return renderPaymentStatus(value);
      case "date":
        return <p className="text-sm">{formatDateTime(value)}</p>;
      case "rating":
        return renderStars(value);
      case "actions":
        return (
          <div className="flex gap-2">
            {column.actions.includes("view") && (
              <FaEye
                className="cursor-pointer h-4 w-4"
                onClick={(e) => {
                  handleView(row);
                }}
              />
            )}
            {column.actions.includes("edit") && (
              <FaEdit
                className="cursor-pointer h-4 w-4"
                onClick={(e) => {
                  handleEdit(row);
                }}
              />
            )}
            {column.actions.includes("delete") && (
              <FaTrash
                className="cursor-pointer h-4 w-4"
                onClick={(e) => {
                  handleDelete(row);
                }}
              />
            )}
          </div>
        );
      default:
        return value;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-800 bg-green-200 rounded-lg bg-opacity-50";
      case "Shipped":
        return "text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50";
      case "Cancelled":
        return "text-gray-800 bg-gray-200 rounded-lg bg-opacity-50";
      default:
        return "";
    }
  };

  return (
    <div className="my-4">
      <div className="flex flex-row justify-between">
        <h2 className="text-lg font-bold mb-2">{tableData.name}</h2>
        {tableData.link && (
          <Link
            to={tableData.link}
            className="text-stone-900 hover:text-orange-500"
          >
            <div className="flex items-center justify-center md:justify-end">
              <span>{tableData.linkName}</span>
              <MdArrowForward className="ml-1" />
            </div>
          </Link>
        )}
      </div>

      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.headerName}
                  className={`p-2 text-sm font-semibold tracking-wide text-left ${
                    column.className
                  } 
                  ${column.type === "rating" ? "min-w-[130px]" : ""}`}
                >
                  {column.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`bg-${index % 2 === 0 ? "white" : "gray-100"}`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.headerName}
                      className={`p-2 text-gray-700 whitespace-nowrap ${column.className}`}
                    >
                      {renderCellContent(column, row, index)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center"
                >
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {rows.length > 0 ? (
          rows.map((row, index) => (
            <div key={row.id} className="bg-white rounded-lg shadow p-4">
              {columns
                .filter((column) => column.type !== "actions") // Exclude actions column
                .map((column) => (
                  <div
                    key={column.headerName}
                    className={`p-2 text-gray-700  ${column.className}`}
                  >
                    <span>{renderCellContent(column, row, index)}</span>
                  </div>
                ))}
              <div className="mt-4 text-stone-700 flex gap-2">
                {columns
                  .find((col) => col.type === "actions")
                  ?.actions.map((action) => {
                    switch (action) {
                      case "view":
                        return (
                          <FaEye
                            key={action}
                            className="cursor-pointer h-4 w-4"
                            onClick={(e) => handleView(row)}
                          />
                        );
                      case "edit":
                        return (
                          <FaEdit
                            key={action}
                            className="cursor-pointer h-4 w-4"
                            onClick={(e) => handleEdit(row)}
                          />
                        );
                      case "delete":
                        return (
                          <FaTrash
                            key={action}
                            className="cursor-pointer h-4 w-4"
                            onClick={(e) => handleDelete(row)}
                          />
                        );
                      default:
                        return null;
                    }
                  })}
              </div>
            </div>
          ))
        ) : (
          <div className=" p-1 text-gray-700 col-span-full text-center">
            No Records Found
          </div>
        )}
      </div>
    </div>
  );
};
export default TableView;
