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
      error: false,
      selectedColumns: new Set()
    };
  }

  handleBackClick = () => {
    console.log("clicked");
    this.setState({
      loaded: false,
      uploadedFile: false
    });
  };

  clickColumnHandler = id => {
    let newSet = new Set(this.state.selectedColumns);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      console.log("adding");
      newSet.add(id);
    }
    this.setState({
      selectedColumns: newSet
    });
    console.log(newSet);
    console.log(this.state.selectedColumns);
    console.log(id);
  };

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
      <div className="App container-fluid">
        <Header />
        {this.state.loaded ? null : (
          <FileUpload
            onClickHandler={this.dataHandler}
            fileUploadHandler={this.fileUploadHandler}
            error={this.state.error}
          />
        )}
        <div className="row p-5">
          {this.state.loaded ? (
            <SelectColumns
              name={this.state.uploadedFile.name}
              headers={this.state.headers}
              data={this.state.data[1]}
              handleBackClick={this.handleBackClick}
              clickColumnHandler={this.clickColumnHandler}
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
