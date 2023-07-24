import React, { Component } from "react";
import _ from "lodash";
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const { pageSize, itemsCount, onPageChange, currentPage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount == 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li style={{cursor:'pointer'}}
              key={page}
              className={
                page === currentPage ? "page-item live" : "page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
