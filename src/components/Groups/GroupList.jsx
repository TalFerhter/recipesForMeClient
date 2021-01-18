import axios from "axios";
import React, { Component } from "react";
import {
  Collapse,
  Table,
  Select,
  Form,
  Input,
  Button,
  Space,
  Tag,
  Checkbox,
  Row,
  Col,
} from "antd";
const { Option } = Select;

const APIGroups = "http://127.0.0.1:8080/groups";
const APIWords = "http://127.0.0.1:8080/words/noGroup";
const API = "http://127.0.0.1:8080/";
const AddWordsRoute = "/addWords";
const APIWordsOfGroupRoute = "http://127.0.0.1:8080/words/withGroup";

const columns = [
  {
    title: "Group",
    dataIndex: "groupName",
    width: 150,
  },
  {
    title: "Words",
    key: "words",
    dataIndex: "words",
    render: (words) => (
      <span>
        {words.map((word) => {
          return (
            <Tag color="blue" key={word}>
              {word}
            </Tag>
          );
        })}
      </span>
    ),
  },
];

class GroupList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      groups: [],
      options: [],
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

    let temp = this.state.groups.map((group) => {
      return {
        groupName: group.groupName,
        groupWords: this.getGroupWords(group.groupName),
      };
    });
  }

  getGroupWords(groupName) {
    let API = APIWordsOfGroupRoute + "?groupName=" + groupName;
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
        return data;
      })
      .catch((error) => this.setState(error));
  }

  render() {
    return (
      <div>
        <h4>Groups</h4>
        <Table
          columns={columns}
          dataSource={this.state.groups}
          pagination={{ pageSize: 4 }}
        />
      </div>
    );
  }
}

export default GroupList;
