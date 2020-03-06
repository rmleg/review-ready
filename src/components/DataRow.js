import React from "react";

const DataRow = props => {
  return (
    <tr>
      <td key={`header-${props.id}`}>
        <input
          type="checkbox"
          id={`header-${props.id}`}
          onClick={() => props.clickColumnHandler(props.id)}
        />{" "}
        <label htmlFor={`header-${props.id}`}>{props.header}</label>
      </td>
      <td key={`sample-${props.id}`}>{props.data}</td>
    </tr>
  );
};

export default DataRow;
