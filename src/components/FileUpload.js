import React from "react";



class FileUpload extends React.Component{
  constructor(props) {
    super(props);
}

  onClickHandler = event => {
    event.preventDefault();
    const uploadedFile = document.getElementById('input').files[0];
    this.props.fileUploadHandler(uploadedFile)
    console.log(uploadedFile)
  };

  render (){
  return(
    <form onSubmit={this.onClickHandler}>
    <label htmlFor="file">Upload CSV</label>
    <input type="file" id="input" />
    <button type="submit">Upload</button>
  </form>
  )}
    
;
};

export default FileUpload;
