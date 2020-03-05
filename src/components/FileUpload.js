import React from "react";

const FileUpload = props => {
  return (
    <form onSubmit={props.onClickHandler}>
      <label htmlFor="file">Upload CSV</label>
      <input type="file" id="input" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;
