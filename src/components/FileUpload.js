import React from "react";

/* class FileUpload extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.onClickHandler}>
        <label htmlFor="file">Upload CSV</label>
        <input type="file" id="input" />
        <button type="submit">Upload</button>
      </form>
    );
  }
} */

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
