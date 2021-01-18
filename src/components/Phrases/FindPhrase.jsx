import React, { Component } from "react";
import axios from "axios";
import { Table, Tag, Space, Form, Input, Select, Button } from "antd";

const { Option } = Select;
const API = "http://127.0.0.1:8080/phrases/findPhrase";
const APISearch = "http://127.0.0.1:8080/phrases/";

class FindPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrases: [],
      value: "",
      searchPhrase: [],
      existingPhrases: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.phraseMap = this.phraseMap.bind(this);

    axios
      .get(APISearch)
      .then((res) => {
        if (res.status) {
          console.log(res);
          return res.data;
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then(
        (data) => {
          this.setState({ existingPhrases: this.phraseMap(data) });
          this.setState({ searchPhrase: data });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  columns = [
    {
      title: "Phrase",
      dataIndex: "phrase",
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
  ];

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  onInputChange = (event) => {
    const target = event.target;
    const name = target.id;
    const value = target.value;
    this.setState({ [name]: value });
  };

  onSelectChange = (value, option, id) => {
    this.setState({ phrases: [] });
    let phrasePositions = [];
    this.state.existingPhrases.map((phrase) => {
      if (phrase.phrase == value) {
        phrasePositions.push(phrase);
      }
    });
    this.setState({ phrases: phrasePositions });
  };

  getPhrases = () => {
    let params = { text: this.state.searchPhrase };

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
        this.setState({ phrases: this.phraseMap(data) });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  phraseMap(data) {
    let phraseList = [];
    data.map(function (currPhrase) {
      currPhrase.positions.map((currPos) => {
        phraseList.push({
          phrase: currPhrase.text,
          recipeName: currPos.recipe.recipeName,
          paragraph: currPos.paragraph.title,
          row: currPos.row,
          col: currPos.col,
        });
      });
    });
    phraseList.push({
      phrase: "",
      recipeName: "",
      paragraph: "",
      row: "",
      col: "",
    });
    return phraseList;
  }

  render() {
    return (
      <div>
        <h4>Search for a phrase:</h4>
        <span>
          <Form onFinish={this.getPhrases}>
            <Form.Item
              name={["Phrase", "selectedPhrase"]}
              wrapperCol={{ span: 6 }}
              label="Phrase"
            >
              <Select
                placeholder="Select phrase"
                onChange={(value, option) =>
                  this.onSelectChange(value, option, "phrase")
                }
              >
                {this.state.searchPhrase &&
                  this.state.searchPhrase.map((phrase) => {
                    return <Option value={phrase.text}>{phrase.text}</Option>;
                  })}
                <Option></Option>;
              </Select>
            </Form.Item>
            <Form.Item name="searchPhrase" label="Search Phrase">
              <Input onChange={this.onInputChange} id="searchPhrase" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </span>
        <div>
          <ul>
            <Table
              columns={this.columns}
              dataSource={this.state.phrases}
              pagination={{ pageSize: 10 }}
              scroll={{ y: 240 }}
            />
          </ul>
        </div>
      </div>
    );
  }
}

export default FindPhrase;
