import React from "react";
import FileUpload from "./components/FileUpload";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Papa from "papaparse";
import SelectColumns from "./components/SelectColumns";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import Choices from "./components/Choices";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: false,
      selectedTitles: false,
      data: false,
      headers: false,
      loaded: false,
      uploadedFile: false,
      error: false,
      selectedColumns: new Set(),
      choiceMade: false
    };
  }

  createDoc = applicant => {
    // Create document
    const doc = new Document();
    console.log(applicant);
    let docContents = [];
    // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
    // This simple example will only contain one section
    applicant.forEach((item, index) => {
      console.log(`adding for ${item} at ${index}`);
      let newContents = new Paragraph({
        children: [
          new TextRun({
            text: `${this.state.headers[index]}`,
            bold: true
          })
        ]
      });
      docContents.push(newContents);
      newContents = new Paragraph({
        children: [
          new TextRun({
            text: `${item}`
          })
        ],
        spacing: {
          after: 240
        }
      });
      docContents.push(newContents);
    });
    doc.addSection({
      properties: {},
      children: docContents
    });
    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  };

  handleBackClick = () => {
    console.log("clicked");
    this.setState({
      loaded: false,
      uploadedFile: false
    });
  };

  checkAll = () => {
    const inputs = document.querySelectorAll('.selector-checkbox');
    for (let index = 0; index < inputs.length; index++) {
      inputs[index].checked = true;
    }
  }

  clickColumnHandler = id => {
    let newSet = new Set(this.state.selectedColumns);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    this.setState({
      selectedColumns: newSet
    });
    /* console.log(newSet);
    console.log(this.state.selectedColumns);
    console.log(id); */
  };

  downloadFile = (filename, file) => {
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(file)
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

  choicesClick = choice => {
    this.setState({
      choiceMade: choice
    });
  };

  clickSelectAllHandler = () => {
    const returnSet = new Set();
    if (this.state.selectAll) {
      this.setState({
        selectAll: false
      })
      returnSet.clear();
      this.unCheckAll();
    } else {
      for (let index = 0; index < this.state.headers.length; index++) {
        returnSet.add(index)
      }
      this.setState({
        selectAll: true,
      })

      this.checkAll();
    }
    this.setState({
      selectedColumns: returnSet
    })
  }

  unCheckAll = () => {
    const inputs = document.querySelectorAll('.selector-checkbox');
    for (let index = 0; index < inputs.length; index++) {
      inputs[index].checked = false;
    }
  }

  render() {
    return (
      <div className="App container-fluid">
        <Header />
        {this.state.loaded ? (
          <Choices
            onClick={this.choicesClick}
            onDocsClick={this.createDoc}
            firstCandidateData={this.state.data[1]}
          />
        ) : (
            <FileUpload
              onClickHandler={this.dataHandler}
              fileUploadHandler={this.fileUploadHandler}
              error={this.state.error}
            />
          )}
        <div className="row p-5">
          {this.state.loaded && this.state.choiceMade === "columns" ? (
            <>
              <SelectColumns
                name={this.state.uploadedFile.name}
                headers={this.state.headers}
                data={this.state.data[1]}
                handleBackClick={this.handleBackClick}
                clickColumnHandler={this.clickColumnHandler}
                clickExportHandler={this.updateJSON}
                clickSelectAllHandler={this.clickSelectAllHandler}
                selectAll={this.state.selectAll}
              />
            </>
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
