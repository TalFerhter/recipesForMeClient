import axios from 'axios';
import React, { Component } from 'react';

const API = 'http://127.0.0.1:8080/uploadFile';
//const myInput = document.getElementById(this.state.value);
let API_ROUTE = '';

class UploadFile extends Component {

    constructor(props) {
        super(props);
        this.state = {  selectedFile: '',
                        answer: ''
                    };
    
        this.onFileChange = this.onFileChange.bind(this);
      }    

    // On file select (from the pop up) 
    onFileChange = event => { 
     
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] }); 
       
    };  

    // On file upload (click the upload button) 
    onRecipeUpload = () => {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append("file",
                        this.state.selectedFile,
                        this.state.selectedFile.name
                        );
        
        // Details of the uploaded file 
        console.log(this.state.selectedFile);
        
        // Request made to the backend api 
        // Send formData object 
        axios.post(API, formData);
    };
    
         // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
     
        if (this.state.selectedFile) { 
            
          return ( 
            <div> 
              <h2>File Details:</h2> 
              <p>File Name: {this.state.selectedFile.name}</p> 
              <p>File Type: {this.state.selectedFile.type}</p> 
              <p> 
                Last Modified:{" "} 
                {this.state.selectedFile.lastModifiedDate.toDateString()} 
              </p> 
            </div> 
          ); 
        } else { 
          return ( 
            <div> 
              <br /> 
              <h4>Choose before Pressing the Upload button</h4> 
            </div> 
          ); 
        } 
      }; 

     render() { 
        return (
            <div>
                <form>
                    <label>File:<input type="file" onChange={this.onFileChange}></input> </label>
                    <input type="submit" value="Submit" onClick={this.onRecipeUpload}></input>
                </form>
                {this.fileData()}
            </div>
          );
    }
}
 
export default UploadFile;