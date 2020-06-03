import React from "react";
import { Button } from "reactstrap";

const FileUpload = props => {
  return (
    <div className="row p-5">
      <div className="col-md-6 col-12">
        <h1>Welcome to Review Ready</h1>
        <p className="h3">Upload a CSV to Begin</p>
      </div>

      <div className="col-md-6 col-12">
        <form onSubmit={props.onClickHandler}>
          <div className="form-group mt-3">
            <label htmlFor="input" className="sr-only">
              Upload CSV
            </label>
            {props.error ? (
              <div>
                <span className="alert-danger">
                  Please upload a valid CSV file.
                </span>
              </div>
            ) : null}
            <input type="file" id="input" className="form-control-file" />
            <Button className="mt-3" color="info" type="submit">
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
