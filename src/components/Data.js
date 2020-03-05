import React from "react";
import DataRow from "./DataRow";

const Data = props => {
  let dataArray = [];
  if (props.headers.length === props.data.length) {
    for (let i = 0; i < props.headers.length; i++) {
      let obj = {};
      obj[props.headers[i]] = props.data[i];
      dataArray.push(obj);
    }
  }

  let returnData = dataArray.map((obj, index) => {
    let key = Object.keys(obj)[0];
    return <DataRow header={key} data={obj[key]} id={index} />;
  });
  return returnData;
};

export default Data;
