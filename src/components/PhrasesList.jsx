import React, { Component } from 'react';

const API = 'http://127.0.0.1:8080/phrases/findPhrase';
let API_ROUTE = '';

class PhrasesList extends Component {
    constructor(props) {
        super(props);
        this.state = {  phrases: [], 
                        value: ''
                    };
    
        this.handleChange = this.handleChange.bind(this);
      }    

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    getPhrases = () => {
        API_ROUTE = API;
        if (this.state.value !== '') {
            API_ROUTE = API_ROUTE + "?text=" + this.state.value; 
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
                this.setState({phrases: data})
                )
            .catch(error => this.setState(error));
        }
    
     render() { 
        return (
            <div>
                <h4>Search for a phrase:</h4>
                <span><input type="text" value={this.state.value} onChange={this.handleChange}></input></span>
                <input type="submit" onClick={ this.getPhrases }></input>
                <div>
                    <ul>
                        {this.state.phrases.map(phrase => (
                            phrase.positions.map(pos => 
                                <li key={pos.pos_id}>({pos.row},{pos.col}) - {pos.recipe.recipeName}</li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
          );
    }
}
 
export default PhrasesList;