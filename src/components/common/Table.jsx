import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./TableBody";

const Table = ({ data, columns, sortColumn, onSort }) => {
  return (
    <table className="table table-striped table-bordered w-1">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
