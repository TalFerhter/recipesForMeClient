import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const base = 'http://127.0.0.1:8080/';
const API = base + 'words';
const recipesAPI = base + 'recipes';
let API_ROUTE = '';

const animatedComponents = makeAnimated();

class WordsList extends Component {
    constructor(props) {
        super(props);
        this.state = {  words: [], 
                        value: '',
                        options: []
                    };
    
        this.handleChange = this.handleChange.bind(this);
        fetch(recipesAPI)
            .then((res) => {
                if(res.ok){
                    console.log(res)
                    return res.json();
                } else {
                    throw new Error('Something went wrong...');
                }
            })
            .then(data =>
                this.setState.state(data.map((recipe)=>(recipe.recipeName)))
                )
            .catch(error => this.setState(error));
        }
       

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    getWords = () => {
        API_ROUTE = API;
        if (this.state.value !== '') {
            API_ROUTE = API_ROUTE + "?id=" + this.state.value; 
        }
        fetch(API_ROUTE)
            .then((res) => {
                if(res.ok){
                    console.log(res)
                    return res.json();
                } else {
                    throw new Error('Something went wrong...');
                }
            })
            .then(data =>
                this.setState({words: data})
                )
            .catch(error => this.setState(error));
        }
    
     render() { 
        return (
            <div>
                <h4>Search for a word:</h4>
                <span><input type="text" value={this.state.value} onChange={this.handleChange}></input></span>
                <input type="submit" onClick={ this.getWords }></input>
                <div>
                    <ul>
                        {this.state.words.map(word => (
                            <li key={word.word}>{word.word}</li>
                        ))}
                    </ul>
                </div>
                <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={options} />
            </div>
          );
    }
}
 
export default WordsList;