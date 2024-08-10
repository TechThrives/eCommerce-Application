import React from "react";
import ReactStars from "react-rating-stars-component";

const TableView = ({
  tableData,
  columns,
  rows,
  handleView = (id) => {},
  handleEdit = (id) => {},
  handleDelete = (id) => {},
  headerJsx = <></>,
  pageSize,
  currentPage,
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
        return (
          <p className="text-gray-900">
            {" "}
            {index + 1 + (currentPage - 1) * pageSize}
          </p>
        );
      case "text":
        return <p className="text-wrap">{value}</p>;
      case "longText":
        return (
          <p className="text-wrap" title={value}>
            {truncateText(value, 50)}
          </p>
        );
      case "price":
        return <span className="font-bold">&#8377;{value}</span>;
      case "status":
        return <p>{value}</p>;
      case "date":
        return <p className="text-sm">{formatDateTime(value)}</p>;
      case "rating":
        return (
          <p>
            <ReactStars
              count={5}
              value={value}
              edit={false}
              size={24}
              isHalf={true}
              activeColor="#ffd700"
              color="#8a8a8a"
            />
          </p>
        );
      case "actions":
        return (
          <div className="flex gap-2">
            {column.actions.includes("view") && (
              <button
                className="text-primary hover:text-sky-700"
                onClick={(e) => {
                  handleView(row);
                }}
              >
                View
              </button>
            )}
            {column.actions.includes("edit") && (
              <button
                className="text-success hover:text-green-700"
                onClick={(e) => {
                  handleEdit(row);
                }}
              >
                Edit
              </button>
            )}
            {column.actions.includes("delete") && (
              <button
                className="text-danger hover:text-red-600"
                onClick={() => {
                  handleDelete(row);
                }}
              >
                Delete
              </button>
            )}
          </div>
        );
      default:
        return value;
    }
  };

  const renderCardContent = (column, row, index) => {
    const value = column.jsonField
      ? getNestedValue(row, column.jsonField)
      : row[column.field];

    if (column.render) {
      return column.render(row);
    }
    switch (column.type) {
      case "index":
        return <p> {index + 1 + (currentPage - 1) * pageSize}</p>;
      case "text":
        return <p>{value}</p>;
      case "longText":
        return <p title={value}>{truncateText(value, 30)}</p>;
      case "price":
        return <p className="font-bold">&#8377;{value}</p>;
      case "status":
        return <p>{value}</p>;
      case "date":
        return <p>{formatDateTime(value)}</p>;
      case "rating":
        return (
          <p>
            <ReactStars
              count={5}
              value={value}
              edit={false}
              size={24}
              isHalf={true}
              activeColor="#ffd700"
              color="#8a8a8a"
            />
          </p>
        );
      default:
        return <p>{value}</p>;
    }
  };

  return (
    <>
      {/* Header for both views */}
      <div className="card-header flex items-center justify-between p-4 border-b">
        <h4 className="card-title">{tableData.name}</h4>
        {headerJsx && headerJsx}
      </div>

      {/* Table View */}
      <div className="hidden md:block p-4">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.headerName}
                        className="px-6 py-3 text-start text-sm text-gray-900"
                      >
                        {column.headerName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rows.length > 0 ? (
                    rows.map((row, index) => (
                      <tr
                        key={row.id}
                        className={`even:bg-gray-100 odd:bg-white`}
                      >
                        {columns.map((column) => (
                          <td
                            key={column.headerName}
                            className={`px-6 py-4 whitespace-nowrap text-sm text-gray-800 ${column.className}`}
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
          </div>
        </div>
      </div>

      {/* Card View */}
      <div className="md:hidden p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <div key={row.id} className="bg-white rounded-lg shadow p-4">
                {columns
                  .filter((column) => column.type !== "actions") // Exclude actions column
                  .map((column) => (
                    <div
                      key={column.headerName}
                      className="flex items-start mb-2"
                    >
                      <strong className="text-gray-700 w-1/3">
                        {column.headerName}:
                      </strong>
                      <span className="w-2/3">
                        {renderCardContent(column, row, index)}
                      </span>
                    </div>
                  ))}
                <div className="mt-4 flex gap-2">
                  {columns
                    .find((col) => col.type === "actions")
                    ?.actions.map((action) => (
                      <button
                        key={action}
                        className={`font-medium text-${
                          action === "view"
                            ? "primary"
                            : action === "edit"
                            ? "success"
                            : "danger"
                        } hover:text-${
                          action === "view"
                            ? "sky-700"
                            : action === "edit"
                            ? "green-700"
                            : "red-600"
                        }`}
                        onClick={() => {
                          if (action === "view") handleView(row);
                          if (action === "edit") handleEdit(row);
                          if (action === "delete") handleDelete(row);
                        }}
                      >
                        {action.charAt(0).toUpperCase() + action.slice(1)}
                      </button>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-800 font-medium">
              No Records Found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TableView;
