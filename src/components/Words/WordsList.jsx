import React, { Component } from "react";
import makeAnimated from "react-select/animated";
import axios from "axios";
import {
  Table,
  Tag,
  Space,
  Form,
  Input,
  InputNumber,
  Button,
  Modal,
} from "antd";
import { getByText } from "@testing-library/react";
import WordContext from "./WordContext";

const base = "http://127.0.0.1:8080/";
const API = base + "words";
const recipesAPI = base + "recipes";
const contextAPI = API + "/context";
let API_ROUTE = "";
const animatedComponents = makeAnimated();

class WordsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: undefined,
      value: undefined,
      options: "",
      isModalVisible: false,
      row: undefined,
      col: undefined,
      recipe: undefined,
    };

    /*fetch(recipesAPI)
      .then((res) => {
        if (res.ok) {
          console.log(res);
          res.json();
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then((data) => this.state.setState({ options: data }))
      data.map((recipe)=>({
                            label: recipe.recipeName,
                            value: recipe.recipeName}))
                        }))
      .catch((error) => this.setState(error));*/
    this.handleChange = this.handleChange.bind(this);
  }

  columns = [
    {
      title: "Word",
      dataIndex: "word",
      width: 150,
    },
    {
      title: "Recipe",
      dataIndex: "recipeName",
      width: 150,
    },
    {
      title: "Paragraph",
      dataIndex: "paragraph",
      width: 150,
    },
    {
      title: "Row",
      dataIndex: "row",
      width: 150,
      sorter: {
        compare: (a, b) => a.row - b.row,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Col",
      dataIndex: "col",
      width: 150,
      sorter: {
        compare: (a, b) => a.col - b.col,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Context",
      dataIndex: "context",
      width: 100,
      dataIndex: "context",
      render: (recipeId, stateParams) => (
        <span>
          <WordContext wordContext={recipeId} />
        </span>
      ),
    },
  ];

  handleChange(event) {
    this.state.value = event.target.value;
  }

  getWords = () => {
    let params = {
      id: this.state.value,
      recipeName: this.state.recipeName,
      row: this.state.row,
      col: this.state.col,
    };

    axios
      .get(API, { params })
      .then((res) => {
        if (res.status) {
          console.log(res);
          return res.data;
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then((data) => {
        let wordList = [];
        data.map(function (currWord) {
          currWord.positions.map((currPos) => {
            wordList.push({
              word: currWord.word,
              recipeName: currPos.recipe.recipeName,
              recipeId: currPos.recipe.recipeId,
              paragraph: currPos.paragraph.title,
              row: currPos.row,
              col: currPos.col,
              context: currPos.recipe.recipeId,
            });
          });
        });
        this.setState({ words: wordList });
      })
      .catch((error) => this.setState(error));
  };

  render() {
    const { selectOptions } = this.state.options;
    return (
      <div>
        <Space direction="vertical">
          <h4>Words</h4>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.getWords}
          >
            <Form.Item label="Search for: " name="searchWords">
              <Input onChange={this.handleChange} />
            </Form.Item>
            <Form.Item name="RecipeName" label="Recipe Name">
              <Input
                onChange={(value) => {
                  this.setState({ recipeName: value });
                }}
                id="recipeName"
              />
            </Form.Item>
            <Form.Item name="min-yield" label="Row">
              <InputNumber
                onChange={(value) => {
                  this.setState({ row: value });
                }}
                id="yieldMin"
              />
            </Form.Item>
            <Form.Item name="max-column" label="Col">
              <InputNumber
                onChange={(value) => {
                  this.setState({ col: value });
                }}
                id="column"
              />
            </Form.Item>
          </Form>
          <input type="submit" onClick={this.getWords}></input>
          <div>
            <ul>
              <Table
                columns={this.columns}
                dataSource={this.state.words}
                pagination={{ pageSize: 10 }}
                scroll={{ y: 240 }}
              />
            </ul>
          </div>
        </Space>
      </div>
    );
  }
}

export default WordsList;
