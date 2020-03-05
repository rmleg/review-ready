import React from "react";
import { Button } from "reactstrap";

const FileUpload = props => {
  return (
    <form className="row" onSubmit={props.onClickHandler}>
      <div className="form-group">
        <label htmlFor="file">Upload CSV</label>
        <input type="file" id="input" className="form-control-file" />
        <Button color="info" type="submit">
          Upload
        </Button>
      </div>
    </form>
  );
};

export default FileUpload;
