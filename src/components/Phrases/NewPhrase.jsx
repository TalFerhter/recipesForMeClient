import axios from "axios";
import React, { Component } from "react";
import { Alert, Form, Input, Button } from "antd";

const API = "http://127.0.0.1:8080/phrases/addPhrase";

class NewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { phrases: [], value: "", isAdded: false };
  }

  onFinish = (fields) => {
    const formData = new FormData();
    formData.append("text", fields.phrase.phrase);

    axios.post(API, formData).then((res) => {
      if (res.status) {
        console.log(res);
        this.setState({ isAdded: true });
        return res.data;
      } else {
        throw new Error("Something went wrong...");
      }
    });
  };

  onAlertClose = () => {
    this.setState({ alertVisible: false });
  };

  render() {
    return (
      <div>
        <Form name="newPhrase" onFinish={this.onFinish} autoComplete="off">
          {this.state.isAdded ? (
            <Alert
              message="Update completed"
              type="success"
              closable
              afterClose={this.onAlertClose}
            ></Alert>
          ) : null}
          <Form.Item
            name={["phrase", "phrase"]}
            label="Phrase"
            rules={[{ required: true }]}
          >
            <Input onChange={this.onAlertClose} />
          </Form.Item>
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
