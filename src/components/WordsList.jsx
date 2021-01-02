import React, { Component } from 'react';
import Navbar from "./Navbar";


const API = 'http://127.0.0.1:8080/words';
const DEFAULT_QUERY = 'redux';

class WordsList extends Component {
    state = {
        words: ["a"],
    };

    getWords = ( ) => {
        // GET request using fetch inside useEffect React hook
        fetch(API)
            .then(res => {
                if(res.ok){
                    res.text();
                    console.log("ok");
                } else {
                    throw new Error('Something went wrong...');
                }
            })
            .then(
                (data) =>// this.setState({words: data.words})
                console.log(data))
            /*.catch(error => this.setState(error));*/
        }
    
    setWords = ( ) => {
        if (this.state.words){
            this.state.words.map(word => (
                <li key={word}>{word}</li>
            ))
        }
    }
    
     render() { 
        return (
            <div>
                <Navbar />
                <span><input type="text"></input></span>
                <input type="submit" onClick={ this.getWords }></input>
                <div>
                    <ul>{}</ul>
                </div>
            </div>
          );
    }
}
 
export default WordsList;