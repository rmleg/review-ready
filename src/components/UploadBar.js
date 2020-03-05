import React from "react";

const onClickHandler = e => {
  console.log("Click Handler.");
  e.preventDefault();
};

const UploadBar = () => {
  return (
    <form onSubmit={onClickHandler}>
      <label htmlFor="file">Upload CSV</label>
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadBar;
