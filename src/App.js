import React from "react";
import FileUpload from "./components/FileUpload";
import "./App.scss";

class App extends React.Component{
  render() {
    return(
      <div className="App">
        <FileUpload />
      </div>
    )
    
  }
  ;
}

export default App;
