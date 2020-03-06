import React from "react";
import FileUpload from "./components/FileUpload";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Papa from "papaparse";
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
    /* console.log(newSet);
    console.log(this.state.selectedColumns);
    console.log(id); */
  };

  downloadFile = (filename, csv) => {
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(csv)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  sorter = (a, b) => {
    if (a < b) return -1; // any negative number works
    if (a > b) return 1; // any positive number works
    return 0; // equal values MUST yield zero
  };

  updateJSON = () => {
    //sort column keys to maintain order of imported data
    const sortedSelectors = Array.from(this.state.selectedColumns).sort(
      this.sorter
    );
    console.log(sortedSelectors);
    //initialize empty array to hold results
    let allEditedData = [];
    //Loop through all file data
    //For each item in the array of arrays, loop through that array
    this.state.data.forEach(innerArray => {
      //initialize empty array to hold edited data
      let newArr = [];
      for (let i = 0; i < sortedSelectors.length; i++) {
        //get thing at each sortedSelectors[i] and add it to newArr
        let index = sortedSelectors[i];
        newArr.push(innerArray[index]);
      }
      //add newArr to edited data
      allEditedData.push(newArr);
    });
    const newCSV = Papa.unparse(allEditedData);
    const newName = `Review_Ready_${this.state.uploadedFile.name}`;
    this.downloadFile(newName, newCSV);
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
              clickExportHandler={this.updateJSON}
            />
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
