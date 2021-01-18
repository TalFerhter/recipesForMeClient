import React, { Component } from "react";
import { Statistic, Row, Col, Button } from 'antd';
import axios from "axios";

class WordStatistics extends Component {

    constructor(props){
        super(props);

        this.state = {
            maxRowLength: null,
            avgRowLength: null,
            maxColLength: null, 
            avgColLength: null,
            maxWordLength: null,
            avgWordLength: null,
            countRecipes: null,
            countWords: null,
            countPositions: null
        };

        const API = "http://127.0.0.1:8080/words/statistics";

        axios
      .get(API)
      .then((res) => {
        if (res.status) {
          console.log(res);
          return res.data;
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then((data) => {
        this.setState({maxRowLength: data.maxRowLength,
            avgRowLength: data.averageRowLength,
            maxColLength: data.maxColLength, 
            avgColLength: data.averageColLength,
            maxWordLength: data.maxWordLength,
            avgWordLength: data.averageWordLength,
            countRecipes: data.countRecipes,
            countWords: data.countWords, 
            countPositions: data.countPositions});
        console.log(data);
        console.table(data);

        /*this.setState({
          text: data.map((word) => {
            return word + " ";
          }),
        });*/
      })
      .catch((error) => this.setState(error));
    }

  render() {
    return (
      <div>
        <Row gutter={16}>
    <Col span={8}>
      <Statistic title="Words" value={this.state.countWords} />
    </Col>
    <Col span={8}>
      <Statistic title="Average word length" value={this.state.avgWordLength} precision={2} />
    </Col>
    <Col span={8}>
      <Statistic title="Longest word length" value={this.state.maxWordLength} precision={2} />
    </Col>
    </Row>
    <br/>
    <Row>
    <Col span={8}>
      <Statistic title="Recipes" value={this.state.countRecipes}/>
    </Col>
    <Col span={8}>
      <Statistic title="Average recipes length (in characters)" value={this.state.avgRowLength * this.state.avgColLength * this.state.avgWordLength} precision={2} />
    </Col>
    <Col span={8}>
      <Statistic title="Average recipes length (in words)" value={this.state.avgRowLength * this.state.avgColLength} precision={2} />
    </Col>
  </Row>
  <br/>
  <Row>
    <Col span={8}>
      <Statistic title="Positions amount" value={this.state.countPositions}/>
    </Col>
    </Row>
    <br/>
    <Row>
    <Col span={5}>
      <Statistic title="Average row length" value={this.state.avgRowLength} precision={2} />
    </Col>
    <Col span={5}>
      <Statistic title="Maximum row length" value={this.state.maxRowLength} precision={2} />
    </Col>
    <Col span={5}>
      <Statistic title="Average column length" value={this.state.avgColLength} precision={2} />
    </Col>
    <Col span={5}>
      <Statistic title="Maximum column length" value={this.state.maxColLength} precision={2} />
    </Col>
  </Row>,
      </div>
    );
  }
}

export default WordStatistics;
