import React, { Component } from "react";
import { Layout, Menu } from "antd";
import {
  BoldOutlined,
  MessageOutlined,
  ReadOutlined,
  GoogleOutlined,
  HomeFilled
} from "@ant-design/icons";
import UploadFile from "./Recipes/UploadFile";
import WordsList from "./Words/WordsList";
import GroupList from "./Groups/GroupList";
import AddWordsToGroup from "./Groups/AddWordsToGroup";
import NewGroup from "./Groups/NewGroup";
import FindRecipe from "./Recipes/FindRecipe";
import FindPhrase from "./Phrases/FindPhrase";
import NewPhrase from "./Phrases/NewPhrase";
import WordStatistics from "./Words/WordStatistics";
import HomePage from "./HomePage";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class MainMenu extends Component {
  state = { content: (<HomePage />) };

  onSideMenuClick = (event) => {
    // Update the state
    switch (event.key) {
      case "home": {
        this.setState({ content: <HomePage /> });
        break;
      }
      case "searchWord": {
        this.setState({ content: <WordsList /> });
        break;
      }
      case "statistics": {
        this.setState({ content: <WordStatistics />})
        break;
      }
      case "searchPhrase": {
        this.setState({ content: <FindPhrase /> });
        break;
      }
      case "addPhrase": {
        this.setState({ content: <NewPhrase /> });
        break;
      }
      case "listGroup": {
        this.setState({ content: <GroupList /> });
        break;
      }
      case "newGroup": {
        this.setState({ content: <NewGroup /> });
        break;
      }
      case "addWordsToGroup": {
        this.setState({ content: <AddWordsToGroup /> });
        break;
      }
      case "addRecipe": {
        this.setState({ content: <UploadFile /> });
        break;
      }
      case "searchRecipe": {
        this.setState({ content: <FindRecipe /> });
        break;
      }
      default: {
      }
    }
  };

  render() {
    return (
      <div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          onClick={this.onSideMenuClick}
        >
          
            <Menu.Item key="home" icon={<HomeFilled />}></Menu.Item>
       
          
          <SubMenu key="subWords" icon={<BoldOutlined />} title="Words">
            <Menu.Item key="searchWord">Search</Menu.Item>
            <Menu.Item key="statistics">Statistics</Menu.Item>
          </SubMenu>
          <SubMenu key="subGroup" icon={<GoogleOutlined />} title="Groups">
            <Menu.Item key="listGroup">List</Menu.Item>
            <Menu.Item key="newGroup">New Group</Menu.Item>
            <Menu.Item key="addWordsToGroup">Add Words</Menu.Item>
          </SubMenu>
          <SubMenu key="subPhrases" icon={<MessageOutlined />} title="Phrases">
            <Menu.Item key="searchPhrase">Search</Menu.Item>
            <Menu.Item key="addPhrase">Add</Menu.Item>
          </SubMenu>
          <SubMenu key="subRecipes" icon={<ReadOutlined />} title="Recipes">
            <Menu.Item key="searchRecipe">Search</Menu.Item>
            <Menu.Item key="addRecipe">Add</Menu.Item>
          </SubMenu>
        </Menu>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 680,
            }}
          >
            {this.state.content}
          </Content>
        </Layout>
      </div>
    );
  }
}

export default MainMenu;
