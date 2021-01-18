import React, { Component } from "react";
import { Empty } from "antd";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Empty
    image="https://cdn.iconscout.com/icon/premium/png-256-thumb/pepper-1696945-1438237.png"
    imageStyle={{
      height: 360,
    }}
    description={
      <h2>
        RECIPES FOR ME 
      </h2>
    }
  >
  </Empty>
      </div>
    );
  }
}

export default HomePage;
