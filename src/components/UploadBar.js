import React from "react";

const onSubmitHandler = e => {
  console.log("Click Handler");
  e.preventDefault();
};

const UploadBar = () => {
  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="file">Upload CSV</label>
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadBar;
