import React from "react";
import {Table} from "reactstrap";

const Applicant = (props) => {
return (
    <Table>
        <thead>
            <tr>
                {props.headers.map(header=>{
                    return(<th>{header}</th>)
                })}
            </tr>
        </thead>
    </Table>
)
};

export default Applicant;
