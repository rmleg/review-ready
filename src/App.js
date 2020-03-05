import React from "react";
import FileUpload from "./components/FileUpload";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: false,
      error: false
    };
  }

  fileUploadHandler = file => {
    if (file && file.type === "text/csv") {
      this.setState({
        uploadedFile: file,
        error: false
      });
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
        <FileUpload fileUploadHandler={this.fileUploadHandler} />
        <Footer />
      </div>
    );
  }
}

export default App;
