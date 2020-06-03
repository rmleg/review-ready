import React from "react";
import Data from "./Data";
import BackButton from "./BackButton";
import { Button } from "reactstrap";

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
    <>
      <BackButton handleBackClick={props.handleBackClick} />
      <h3 className="mb-3 col-md-12">
        Select columns from '{props.name}' to include in export
      </h3>
      <div className="mb-3 ml-3 download">
        <Button color="info" onClick={props.clickExportHandler}>
          &darr; Download CSV with selections
        </Button>
      </div>

      <div className="col-md-12 mb-3"><Button color="info" onClick={props.clickSelectAllHandler}>
        {props.selectAll ? "Unselect All" : "Select All"}
      </Button></div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Column</th>
            <th scope="col">First Row of Data</th>
          </tr>
        </thead>
        <tbody>
          <Data
            headers={props.headers}
            data={props.data}
            clickColumnHandler={props.clickColumnHandler}
          />
        </tbody>
      </table>
    </>
  );
};

export default SelectColumns;
