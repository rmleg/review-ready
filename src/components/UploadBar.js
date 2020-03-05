import React from "react";

const onClickHandler = e => {
  e.preventDefault();
  const uploadedFile = document.getElementById('input').files[0];

  console.log(uploadedFile)
  
};

const UploadBar = () => {
  return (
    <form onSubmit={onClickHandler}>
      <label htmlFor="file">Upload CSV</label>
      <input type="file" id="input" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadBar;
