import axios from 'axios';
import React, { Component } from 'react';

const API = 'http://127.0.0.1:8080/uploadFile';
//const myInput = document.getElementById(this.state.value);
let API_ROUTE = '';

class UploadFile extends Component {

    constructor(props) {
        super(props);
        this.state = {  selectedFile: '',
                        answer: '',
                        recipeName: '',
                        siteName: '',
                        authorName: '',
                        path: '',
                        publishDate: '',
                        cookTime: '',
                        prepTime: '',
                        totalTime: '',
                        yieldMin: '',
                        yieldMax: '',
                        category: '',
                        level: ''
                    };
    
        this.onFileChange = this.onFileChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({[name]: value});
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
              <form>
                <label for="recipeName">Recipe name:</label>
                <input name="recipeName" type="text" value={this.state.recipeName} onChange={this.handleInputChange}></input><br></br>
                <label for="siteName">Site name:</label>
                <input name="siteName" type="text" value={this.state.siteName} onChange={this.handleInputChange}></input><br></br>
                <label for="authorName">Author name:</label>
                <input name="authorName" type="text" value={this.state.authorName} onChange={this.handleInputChange}></input><br></br>
                <label for="path">Path Url:</label>
                <input name="path" type="url" value={this.state.path} onChange={this.handleInputChange}></input><br></br>
                <label for="publishDate">Publish date:</label>
                <input name="publishDate" type="date" value={this.state.publishDate} onChange={this.handleInputChange}></input><br></br>
                <label for="cookTime">Cook time:</label>
                <input name="cookTime" type="time" value={this.state.cookTime} onChange={this.handleInputChange}></input><br></br>
                <label for="prepTime">Preperation time:</label>
                <input name="prepTime" type="time" value={this.state.prepTime} onChange={this.handleInputChange}></input><br></br>
                <label for="totalTime">Total time:</label>
                <input name="totalTime" type="time" value={this.state.totalTime} onChange={this.handleInputChange}></input><br></br>
                <label for="yieldMin">Yield(min)</label>
                <input name="yieldMin" type="number" value={this.state.yieldMin} onChange={this.handleInputChange}></input><br></br>
                <label for="yieldMax">Yield(max)</label>
                <input name="yieldMax" type="number" value={this.state.yieldMax} onChange={this.handleInputChange}></input><br></br>
                <label for="category">Category</label>
                <input name="category" type="text" value={this.state.category} onChange={this.handleInputChange}></input><br></br>
                <label for="level">Level</label>
                <input name="level" type="text" value={this.state.level} onChange={this.handleInputChange}></input><br></br>
              </form>
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
                    <label>File: <input type="file" onChange={this.onFileChange}></input> </label>
                </form>
                {this.fileData()}
                <input type="submit" value="Upload" onClick={this.onRecipeUpload}></input>
            </div>
          );
    }
}
 
export default UploadFile;