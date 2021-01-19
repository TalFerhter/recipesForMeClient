import React, { Component } from "react";
import makeAnimated from "react-select/animated";
import axios from "axios";
import qs from "qs";
import {
  Button,
  Card,
  InputNumber,
  TimePicker,
  Select,
  DatePicker,
  Row,
  Col,
  Space,
  Form,
  Input,
  Alert,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const base = "http://127.0.0.1:8080/";
const API = base + "words";
const recipesAPI = base + "getRecipes";
let API_ROUTE = "";
const { Option } = Select;

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

const animatedComponents = makeAnimated();

class FindRecipe extends Component {
  constructor(props) {
    super(props);
    const APICategories = "http://127.0.0.1:8080/categories";
    const APILevels = "http://127.0.0.1:8080/levels";

    this.state = {
      recipeName: undefined,
      siteName: undefined,
      authorName: undefined,
      path: undefined,
      data: undefined,
      cookTime: undefined,
      prepTime: undefined,
      totalTime: undefined,
      yieldMin: undefined,
      yieldMax: undefined,
      category: undefined,
      level: undefined,
      categories: undefined,
      levels: undefined,
      children: undefined,
      recipes: undefined,
      words: undefined,
      alertVisible: false,
    };

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

  getRecipe = (values) => {
    let words = [];
    values.searchWords && values.searchWords.map((word) => {
      words.push(word.word);
    });
    let params = {
      recipeName: this.state.recipeName,
      siteName: this.state.siteName,
      authorName: this.state.authorName,
      path:this.state.path,
      yieldMin: this.state.yieldMin,
      yieldMax: this.state.yieldMax,
      category: this.state.category,
      level: this.state.level,
      words: words + ''
    };

    axios
      .get(recipesAPI, {
        params,
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      })
      .then((res) => {
        if (res.status) {
          console.log(res);
          return res.data;
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then((data) => {
        console.log(data);
        let recTemp = [];
        data.map((o) => {
          recTemp.push({
            recipeName: o[0],
            authorName: o[1],
            path: o[2],
            date: o[3],
            cookTime: o[4],
            prepTime: o[5],
            totalTime: o[6],
            minYield: o[7],
            siteName: o[8],
            maxYield: o[9],
            level: o[10],
            category: o[11],
          });
        });
        this.setState({ recipes: recTemp });
      })
      .catch((error) => this.setState(error));
  };

  onInputChange = (event) => {
    const target = event.target;
    const name = target.id;
    const value = target.value;
    if (value == ''){
      this.setState({ [name]: undefined });
    } else {
    this.setState({ [name]: value });
    }
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

  render() {
    return (
      <div>
        {this.state.alertVisible ? (
          <Alert
            message="No recipe found"
            type="error"
            closable
            afterClose={this.onAlertClose}
          ></Alert>
        ) : null}
        <Space direction="vertical">
          <h4>Recipes Search</h4>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.getRecipe}
          >
            <Form.Item name="recipeName" label="Recipe Name">
              <Input onChange={this.onInputChange} id="recipeName" />
            </Form.Item>
            <Form.Item name="siteName" label="Website Name">
              <Input onChange={this.onInputChange} id="siteName" />
            </Form.Item>
            <Form.Item name="authorName" label="Author">
              <Input onChange={this.onInputChange} id="authorName" />
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
              wrapperCol={{ span: 15 }}
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
              wrapperCol={{ span: 15 }}
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
            <Form.List name="searchWords">
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
                    >
                      Add word
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Row gutter={16}>
            {this.state.recipes &&
              this.state.recipes.map((recipe) => (
                <Col span={8}>
                  <Card title={recipe.recipeName} style={{ width: 300 }}>
                    <p>Category: {recipe.category}</p>
                    <p>Level: {recipe.level}</p>
                    <p>Author: {recipe.authorName}</p>
                    <p>Publish date: {recipe.date}</p>
                    <p>Preperation time: {recipe.prepTime}</p>
                    <p>Cooking time: {recipe.cookTime}</p>
                    <p>Total time: {recipe.totalTime}</p>
                    <p>
                      Yield: {recipe.minYield}
                      {recipe.maxYield != 0 ? "-" + recipe.maxYield : ""}
                    </p>
                    <p>Site: {recipe.siteName}</p>
                    <p>
                      Path:{" "}
                      <a href={recipe.path} target="_blank">
                        Go to
                      </a>
                    </p>
                  </Card>
                </Col>
              ))}
          </Row>
        </Space>
      </div>
    );
  }
}

export default FindRecipe;
