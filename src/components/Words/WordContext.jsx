import React, { Component, useState } from "react";
import axios from "axios";
import { Modal, Button } from "antd";

const contextAPI = "http://127.0.0.1:8080/words/context";

class WordContext extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      value: "",
      options: [],
      visible: false,
      text: "",
    };

    this.getRecipeByLocation = this.getRecipeByLocation.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  showModal() {
    this.state.visible = true;
    this.getRecipeByLocation(this.props.wordContext);
  }

  handleCancel() {
    console.log("Clicked cancel button");
    this.setState({visible: false});
  }

  handleOk() {
    this.setState({visible: false});
  }

  getRecipeByLocation(recipeId) {
    let params = {
      recipeId: recipeId,
    };
    axios
      .get(contextAPI, { params })
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
        console.table(data);

        this.setState({
          text: data.map((word) => {
            return word + " ";
          }),
        });
        //this.setState({ words: wordList });
      })
      .catch((error) => this.setState(error));
  }

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Context
        </Button>
        <Modal
          title="Context"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
          <p>{this.state.text}</p>
        </Modal>
      </>
    );
  }
}

export default WordContext;
