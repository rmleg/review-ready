import React from "react";
import FileUpload from "./components/FileUpload";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <FileUpload />
        <Footer />
      </div>
    );
  }
}

export default App;
