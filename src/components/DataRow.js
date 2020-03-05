import React from "react";

const DataRow = props => {
  return (
    <tr>
      <td data-key="header-${props.id}">{props.header}</td>
      <td data-key="sample-${props.id}">{props.data}</td>
    </tr>
  );
};

export default DataRow;
