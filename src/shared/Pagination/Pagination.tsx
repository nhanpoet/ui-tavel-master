import React, { FC } from "react";
import twFocusClass from "utils/twFocusClass";

export interface PaginationProps {
  className?: string;
  totalPosts?: any;
  postsPerPage?: any;
  setCurrentPage?: any;
}

const Pagination: FC<PaginationProps> = ({
  className = "",
  totalPosts,
  postsPerPage,
  setCurrentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {pages.map((page, index) => {
        return (
          <button
            className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </nav>
  );
};

export default Pagination;
