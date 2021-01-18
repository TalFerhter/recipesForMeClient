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

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const API = "http://127.0.0.1:8080/groups/newGroup";

class NewGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      groupName: "",
    };
  }

  onFinish = (fields) => {
    this.state.words = [];
    fields.words.map((word) => {
      this.state.words.push(word.word);
    });

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("groupName", fields.groupName.name);
    formData.append("wordList", this.state.words);

    axios
      .post(API, formData)
      .then((response) => {
        console.log(response);
      })
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Form name="newGroup" onFinish={this.onFinish} autoComplete="off">
          <Form.Item
            name={["groupName", "name"]}
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.List name="words">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "word"]}
                      fieldKey={[field.fieldKey, "word"]}
                      rules={[{ required: true, message: "Missing word" }]}
                    >
                      <Input placeholder="Word" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    span={10}
                  >
                    Add word
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default NewGroup;
