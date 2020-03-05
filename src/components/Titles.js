import React from "react";

const selectedTitles = new Set();

const clickHandler = (index) => {
    console.log(index)
    if(selectedTitles.has(index)){
        selectedTitles.delete(index)
    }else{
        selectedTitles.add(index)
    }

    console.log(selectedTitles)
}

const Title = (props) =>{
    return(
        <>
            <li><input type="checkbox" onClick={()=>clickHandler(props.info.key)}/> {props.info.header}</li>
        </>
    )
}

const Titles = (props) => {
const data=[]
const keys =[];

for (let index = 0; index < props.data.length; index++) {
    const headerValue = props.data[index];
    data.push({
        key: index,
        header: headerValue
    })
    
}

let output = data.map(info=>{
    return <Title key={info.key} info={info}/>
    //return <li key={info.key}><input type="checkbox" /> {info.header}</li>
})

return <div className="col-6"><ul>{output}</ul></div>
};

export default Titles;
