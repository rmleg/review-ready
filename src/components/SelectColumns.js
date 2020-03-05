import React from "react";
import Data from "./Data";

const SelectColumns = props => {
  /* let output = props.data.map(title => {
    return <li>{title}</li>;
  }); */
  /* let headers = props.headers.map((value, index) => (
    <td data-key={index} key={`header-${index}`}>
      {value}
    </td>
  ));

  let sampleData = props.data.map((value, index) => (
    <td data-key={index} key={`sample-${index}`}>
      {value}
    </td>
  )); */

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Data Header</th>
          <th scope="col">Sample Data</th>
        </tr>
      </thead>
      <tbody>
        <Data headers={props.headers} data={props.data} />
      </tbody>
    </table>
  );
};

export default SelectColumns;
