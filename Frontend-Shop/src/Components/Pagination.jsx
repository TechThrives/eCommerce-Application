import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const maxVisiblePages = 3; // Maximum number of visible page buttons

    // Calculate maxLeft and maxRight based on current page and maxVisiblePages
    let maxLeft = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let maxRight = Math.min(totalPages, maxLeft + maxVisiblePages - 1);

    // Adjust maxLeft and maxRight if at the beginning or end of the pagination range
    if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
      maxRight = Math.min(totalPages, maxVisiblePages);
    } else if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
      maxLeft = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    const pages = [];

    // Add the ellipsis and first page if not already at the beginning
    if (maxLeft > 1) {
      pages.push(
        <button
          key={1}
          type="button"
          className="px-3 h-8 bg-stone-800 hover:bg-stone-900 text-white rounded-lg"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      if (maxLeft > 2) {
        pages.push(
          <button
            key={null}
            type="button"
            className="px-3 h-8 bg-stone-800 hover:bg-stone-900 text-white rounded-lg"
          >
            ...
          </button>
        );
      }
    }

    // Render the page numbers within the calculated range
    for (let page = maxLeft; page <= maxRight; page++) {
      pages.push(
        <button
          key={page}
          type="button"
          className={`px-3 h-8 text-white rounded-lg ${
            page === currentPage
              ? "bg-orange-500 hover:bg-orange-550"
              : "bg-stone-800 hover:bg-stone-900"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      );
    }

    // Add the ellipsis and last page if not already at the end
    if (maxRight < totalPages) {
      if (maxRight < totalPages - 1) {
        pages.push(
          <button
            key={null}
            type="button"
            className="px-3 h-8 bg-stone-800 hover:bg-stone-900 text-white rounded-lg"
          >
            ...
          </button>
        );
      }
      pages.push(
        <button
          key={totalPages}
          type="button"
          className="px-3 h-8 bg-stone-800 hover:bg-stone-900 text-white rounded-lg"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap gap-1">
      <div className="inline-flex overflow-hidden rounded-sm mb-2 gap-1 flex-wrap">
        {!(currentPage === 1) && (
          <button
            type="button"
            className="px-3 h-8 bg-stone-800 hover:bg-stone-900 text-white rounded-lg"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}
        {renderPageNumbers()}
        {!(currentPage === totalPages) && (
          <button
            type="button"
            className="px-3 h-8 bg-stone-800 hover:bg-stone-900 text-white rounded-lg"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
