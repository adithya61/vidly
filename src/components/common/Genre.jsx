import React, { Component } from "react";

const Genre = (props) => {
  const { allGenre, currentGenre, textProperty, valueProperty, onGenreChange } =
    props;

  return (
    <ul className="list-group">
      {allGenre.map((genre) => (
        <li
          key={genre[valueProperty]}
          style={{ cursor: "pointer" }}
          className={
            genre[textProperty] === currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreChange(genre[textProperty])}
        >
          <a>{genre[textProperty]}</a>
        </li>
      ))}
    </ul>
  );
};

Genre.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Genre;
