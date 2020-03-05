import React from "react";
import FileUpload from "./components/FileUpload";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Papa from "papaparse";
import Applicant from "./components/Applicant";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      headers: false,
      loaded: false,
      uploadedFile: false,
      error: false,
    };
  }

  dataHandler = event => {
    event.preventDefault();
    this.onClickHandler().then(file => {
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
    });
  };

  onClickHandler = async () => {
    const uploadedFile = document.getElementById("input").files[0];
    return uploadedFile;
  };

  csvToJSON = () => {
    const config = {
      complete: results => {
        this.setState({headers:results.data[0]})
        let userData = [];
        results.data.forEach(data => {
          userData.push(data)
        });
        this.setState({data:userData, loaded: true})
      },
      header: false
    };
    Papa.parse(this.state.uploadedFile, config);
  };

  render() {
    return (
      <div className="App">
        <Header />
        {this.state.error ? <p>Upload a valid CSV file.</p> : null}
        <FileUpload
          onClickHandler={this.dataHandler}
          fileUploadHandler={this.fileUploadHandler}
        />
        {this.state.loaded? this.state.data.map(data => <Applicant data={data}/>): null}
        <Footer />
      </div>
    );
  }
}

export default App;
