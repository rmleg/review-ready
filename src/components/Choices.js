import React from "react";
import { Button } from "reactstrap";

const Choices = (props) => {
  return (
    <div className="col-md-6 mx-auto text-center">
      <Button
        className="m-3"
        color="info"
        onClick={() => props.onClick("columns")}
      >
        Edit Columns
      </Button>
      <Button
        className="m-3"
        onClick={() => props.onDocsClick(props.candidateData)}
      >
        Download Candidate Documents (with all columns)
      </Button>
    </div>
  );
};

export default Choices;
