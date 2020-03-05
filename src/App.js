import React from "react";
import FileUpload from "./components/FileUpload";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";



class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      uploadedFile: false
    }
  }

  fileUploadHandler = (file) =>{
    
    this.setState({
      uploadedFile:file
    })
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <FileUpload fileUploadHandler={this.fileUploadHandler}/>
        <Footer />
      </div>
    );
  }
}

export default App;
