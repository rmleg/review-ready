import React from "react";
import FileUpload from "./components/FileUpload";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Papa from "papaparse";
import Applicant from "./components/Applicant";
import Titles from "./components/Titles";
import SelectColumns from "./components/SelectColumns";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTitles: false,
      data: false,
      headers: false,
      loaded: false,
      uploadedFile: false,
      error: false
    };
  }

  changeSelectedTitles = titles => {
    this.setState({
      selectedTitles: titles
    });
  };

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
        this.setState({ headers: results.data[0] });
        let userData = [];
        results.data.forEach(data => {
          userData.push(data);
        });
        this.setState({ data: userData, loaded: true });
      },
      header: false
    };
    Papa.parse(this.state.uploadedFile, config);
  };

  render() {
    return (
      <div className="App container">
        <Header />
        {this.state.error ? (
          <span className="alert-danger">Upload a valid CSV file.</span>
        ) : null}
        <FileUpload
          onClickHandler={this.dataHandler}
          fileUploadHandler={this.fileUploadHandler}
        />
        <div className="row">
          {this.state.loaded ? (
            <SelectColumns
              headers={this.state.headers}
              data={this.state.data[1]}
            />
          ) : null}
        </div>
        <div className="row">
          {this.state.loaded ? (
            <Titles
              data={this.state.headers}
              changeSelectedTitles={() => this.changeSelectedTitles()}
            />
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
