import axios from "axios";
import React, { Component, useState } from "react";
import {
  Form,
  TimePicker,
  Input,
  Select,
  InputNumber,
  Button,
  DatePicker,
  Upload,
  message,
  Alert,
} from "antd";
import "antd/dist/antd.css";
import { IconName } from "react-icons/ai";
import { UploadOutlined } from "@ant-design/icons";

const API = "http://127.0.0.1:8080/uploadFile";

const { Option } = Select;

const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select yield!",
    },
  ],
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const TimeRelatedForm = () => {
  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const rangeValue = fieldsValue["range-picker"];
    const rangeTimeValue = fieldsValue["range-time-picker"];
    const values = {
      ...fieldsValue,
      "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
      "time-picker": fieldsValue["time-picker"].format("HH:mm:ss"),
    };
    console.log("Received values of form: ", values);
  };
};

const validateMessages = {
  required: "${label} is required!",
};

class UploadFile extends Component {
  state = {
    uploading: false,
    selectedFile: null,
    recipeName: null,
    siteName: null,
    authorName: null,
    path: null,
    data: null,
    cookTime: null,
    prepTime: null,
    totalTime: null,
    yieldMin: null,
    yieldMax: null,
    category: null,
    level: null,
    categories: null,
    levels: null,
    children: null,
    alertVisible: false,
  };

  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    const APICategories = "http://127.0.0.1:8080/categories";
    const APILevels = "http://127.0.0.1:8080/levels";

    axios
      .get(APICategories)
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
          this.setState({ categories: data });
        },
        (error) => {
          console.log(error);
        }
      );

    axios
      .get(APILevels)
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
          this.setState({ levels: data });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // On file upload (click the upload button)
  onRecipeUpload = () => {
    if (this.state.selectedFile === "") {
      message.error("Please upload file!");
      return false;
    }

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "file",
      this.state.selectedFile.originFileObj
        ? this.state.selectedFile.originFileObj
        : this.state.selectedFile
    );
    formData.append("recipeName", this.state.recipeName);
    formData.append("siteName", this.state.siteName);
    formData.append("authorName", this.state.authorName);
    formData.append("path", this.state.path);
    formData.append("date", this.state.date);
    formData.append("cookTime", this.state.cookTime);
    formData.append("prepTime", this.state.prepTime);
    formData.append("totalTime", this.state.totalTime);
    formData.append("yieldMin", this.state.yieldMin);
    formData.append("yieldMax", this.state.yieldMax ? this.state.yieldMax : "");
    formData.append("category", this.state.category);
    formData.append("level", this.state.level);

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post(API, formData).then(
      (response) => {
        console.log(response);
        if (response.data == "Upload complete") {
          this.setState({ alertVisible: true });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // On file select (from the pop up)
  onFileChange = (file, filelist, event) => {
    // Update the state
    if (!file.file.error) {
      this.state.selectedFile = file.file;
    } else if (file.file.status == "removed") {
      this.state.selectedFile = "";
    }
    this.setState({ alertVisible: false });
  };

  beforeUpload(file) {
    const isTxt = file.type === "text/plain";
    if (!isTxt) {
      message.error("You can only upload txt file!");
      return false;
    }
    if (this.state.selectedFile) {
      message.error("You can only upload one recipe!");
      return false;
    }
    return true;
  }

  onInputChange = (event) => {
    const target = event.target;
    const name = target.id;
    const value = target.value;
    this.setState({ [name]: value });
    this.setState({ alertVisible: false });
  };

  onPickerChange = (time, timeString, id) => {
    this.setState({ [id]: timeString });
    this.setState({ alertVisible: false });
  };

  onSelectChange = (value, option, id) => {
    this.setState({ [id]: option.children });
    this.setState({ alertVisible: false });
  };

  onAlertClose = () => {
    this.setState({ alertVisible: false });
  };

  render() {
    return (
      <div>
        <Form {...layout} onFinish={this.onRecipeUpload}>
          {this.state.alertVisible ? (
            <Alert
              message="Update completed"
              type="success"
              closable
              afterClose={this.onAlertClose}
            ></Alert>
          ) : null}
          <Upload
            onChange={this.onFileChange}
            beforeUpload={this.beforeUpload}
            listType="text"
            multiple={false}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          <br></br>
          <Form.Item
            name="recipeName"
            label="Recipe Name"
            rules={[{ required: true, message: "Please enter recipe name" }]}
          >
            <Input onChange={this.onInputChange} id="recipeName" />
          </Form.Item>
          <Form.Item
            name="siteName"
            label="Website Name"
            rules={[{ required: true, message: "Please enter site name" }]}
          >
            <Input onChange={this.onInputChange} id="siteName" />
          </Form.Item>
          <Form.Item name="authorName" label="Author">
            <Input onChange={this.onInputChange} id="authorName" />
          </Form.Item>
          <Form.Item
            name="path"
            label="Website Url"
            rules={[{ required: true, message: "Please enter website link" }]}
          >
            <Input onChange={this.onInputChange} id="path" />
          </Form.Item>
          <Form.Item name="date" label="Publish date">
            <DatePicker
              showTime
              format="DD-MM-YYYY"
              onChange={(date, dateString) =>
                this.onPickerChange(date, dateString, "date")
              }
            />
          </Form.Item>
          <Form.Item name="cookTime" label="Cooking time">
            <TimePicker
              onChange={(date, dateString) =>
                this.onPickerChange(date, dateString, "cookTime")
              }
            />
          </Form.Item>
          <Form.Item name="prepTime" label="Preperation time">
            <TimePicker
              onChange={(date, dateString) =>
                this.onPickerChange(date, dateString, "prepTime")
              }
            />
          </Form.Item>
          <Form.Item name="totalTime" label="Total time">
            <TimePicker
              onChange={(date, dateString) =>
                this.onPickerChange(date, dateString, "totalTime")
              }
            />
          </Form.Item>
          <Form.Item name="min-yield" label="Min Yield">
            <InputNumber
              onChange={(value) => {
                this.setState({ yieldMin: value });
              }}
              id="yieldMin"
            />
          </Form.Item>
          <Form.Item name="max-yield" label="Max Yield">
            <InputNumber
              onChange={(value) => {
                this.setState({ yieldMax: value });
              }}
              id="yieldMax"
            />
          </Form.Item>
          <Form.Item
            name={["Category", "category"]}
            wrapperCol={{ span: 6 }}
            //rules={[{ required: true, message: "Category is required" }]}
            label="Category"
          >
            <Select
              placeholder="Select category"
              onChange={(value, option) =>
                this.onSelectChange(value, option, "category")
              }
            >
              {this.state.categories &&
                this.state.categories.map((c) => {
                  return <Option value={c}>{c}</Option>;
                })}
            </Select>
          </Form.Item>
          <Form.Item
            name={["Level", "level"]}
            wrapperCol={{ span: 6 }}
            label="Level"
          >
            <Select
              placeholder="Select level"
              onChange={(value, option) =>
                this.onSelectChange(value, option, "level")
              }
            >
              {this.state.levels &&
                this.state.levels.map((l) => {
                  return <Option value={l}>{l}</Option>;
                })}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default UploadFile;
