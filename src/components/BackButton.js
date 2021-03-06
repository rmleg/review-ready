import React from "react";
import { Button } from "reactstrap";

const BackButton = props => {
  return (
    <div className="mb-3 col-12 ml-n3">
      <Button color="info" onClick={props.handleBackClick}>
        &larr; Upload a Different File
      </Button>
    </div>
  );
};

export default BackButton;
