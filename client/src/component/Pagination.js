import React from "react";

function Pagination({ nPages, currentPage, setCurrentPage }) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const currentPagin = (pgNum) => {
    setCurrentPage(pgNum);
  };
  return (
    <nav className="pagination-main " style={{ marginInline: "auto" }}>
      <ul className="pagination justify-content-center">
        <li className="page-item" onClick={goToPrevPage}>
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage == pgNumber ? "active" : ""} `}
            onClick={() => currentPagin(pgNumber)}
          >
            <a
              className="page-link"
              id={`pages pagination${pgNumber}`}
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item" onClick={goToNextPage}>
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
