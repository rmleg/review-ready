import React from "react";
import { Button } from "reactstrap";

const FileUpload = props => {
  return (
    <form className="row" onSubmit={props.onClickHandler}>
      <label htmlFor="file">Upload CSV</label>
      <input type="file" id="input" />
      <Button color="info" type="submit">
        Upload
      </Button>
    </form>
  );
};

export default FileUpload;
