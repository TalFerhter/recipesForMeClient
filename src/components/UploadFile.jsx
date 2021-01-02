import React, { Component } from 'react';

class UploadFile extends Component {
     render() { 
        return (
            <div>
                <div>
                    <span><input type="file"></input></span>
                </div>
                <div>
                    <input type="submit"></input>
                    <button>Upload</button>
                </div>
            </div>
          );
    }
}
 
export default UploadFile;