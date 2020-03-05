import React from "react";
import FileUpload from "./components/FileUpload";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Papa from "papaparse";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: false,
      error: false
    };
  }

  onClickHandler = event => {
    event.preventDefault();
    const uploadedFile = document.getElementById("input").files[0];
    this.fileUploadHandler(uploadedFile);
  };

  csvToJSON = () => {
    console.log(this.state.uploadedFile);
    const config = {
      complete: results => console.log(results)
    };
    Papa.parse(this.state.uploadedFile, config);
  };

  fileUploadHandler = file => {
    if (file && file.type === "text/csv") {
      this.setState({
        uploadedFile: file,
        error: false
      });
      this.csvToJSON();
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        {this.state.error ? <p>Upload a valid CSV file.</p> : null}
        <FileUpload
          onClickHandler={this.onClickHandler}
          fileUploadHandler={this.fileUploadHandler}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
