import React from 'react';

const onClickHandler =()=>{
    console.log('Click Handler')
}

const UploadBar = () =>{
    return(
    <>
            <input type="file" name="file"/>
            <button onClick={onClickHandler}>Upload</button>
    </>)
    
}

export default UploadBar;