import React from "react";

const Titles = props => {
  let output = props.data.map(title => {
    return <li>{title}</li>;
  });

  return (
    <div className="col-6">
      <h2>Choose Columns for Export</h2>
      <ul>{output}</ul>
    </div>
  );
};

export default Titles;
