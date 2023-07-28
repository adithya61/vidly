import React, { Component } from "react";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";

class TableHeader extends Component {
  raiseSort = (path) => {
    // determine sorting order ascecding or descending order
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path == path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order == "asc") return <TbSortAscending />;
    return <TbSortDescending />;
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              className="clickable"
            >
              {" "}
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
