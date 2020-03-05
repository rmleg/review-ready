import React from 'react';

const UploadBar = () =>{
    return(
    <>
        <form action="upload.php" method="post" enctype="multipart/form-data">
            <input type="file" name="fileToUpload" id="fileToUpload" />
            <input type="submit" value="Upload File" name="submit" />
        </form>
    </>)
    
}

export default UploadBar;