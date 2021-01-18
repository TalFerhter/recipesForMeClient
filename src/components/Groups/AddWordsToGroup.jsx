import axios from "axios";
import React, { Component } from "react";
import { Select, Form, Button, Space, Checkbox, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import SizeContext from "antd/lib/config-provider/SizeContext";

const APIGroups = "http://127.0.0.1:8080/groups";
const APIWords = "http://127.0.0.1:8080/words/noGroup";
const API = "http://127.0.0.1:8080/";
const AddWordsRoute = "/addWords";
const APIWordsOfGroupRoute = "http://127.0.0.1:8080/words/withGroup";
const { Option } = Select;

class AddWordsToGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      groups: [],
      options: [],
      selectedGroup: "",
      selectedWords: [],
    };

    axios
      .get(APIGroups)
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
          let groupWords = data.map((g) => {
            let gWords = [];
            g.words.map((w) => {
              gWords.push(w.word);
            });
            return { groupName: g.groupName, words: gWords };
          });
          this.setState({ groups: groupWords });
        },
        (error) => {
          console.log(error);
        }
      );

    axios
      .get(APIWords)
      .then((res) => {
        if (res.status) {
          console.log(res);
          return res.data;
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then((data) => {
        this.setState({ words: data });
      })
      .catch((error) => this.setState(error));
  }

  onSelectChange = (value, option, id) => {
    this.setState({ selectedGroup: option.children });
  };

  onCheck = (checkedValues) => {
    this.setState({ selectedWords: checkedValues });
  };

  onFinish = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("groupName", this.state.selectedGroup);
    formData.append("wordList", this.state.selectedWords);

    let APIRoute = APIGroups + AddWordsRoute;

    axios
      .post(APIRoute, formData)
      .then((response) => {
        console.log(response);
      })
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
    this.getWords();
  };

  render() {
    return (
      <div>
        {this.raiseAlert}
        <Space direction="vertical">
          <Form
            name="addWordsToGroup"
            onFinish={this.onFinish}
            autoComplete="off"
          >
            <Form.Item>
              <Select
                placeholder="Select group"
                onChange={(value, option) =>
                  this.onSelectChange(value, option, "group")
                }
              >
                {this.state.groups &&
                  this.state.groups.map((g) => {
                    return <Option value={g.groupName}>{g.groupName}</Option>;
                  })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Checkbox.Group style={{ width: "100%" }} onChange={this.onCheck}>
              <Row>
                {this.state.words &&
                  this.state.words.map(function (w) {
                    return (
                      <Col span={8}>
                        <Checkbox value={w.word}>{w.word}</Checkbox>
                      </Col>
                    );
                  })}
              </Row>
            </Checkbox.Group>
          </Form>
        </Space>
      </div>
    );
  }
}

export default AddWordsToGroup;
