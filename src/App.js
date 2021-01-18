import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainMenu from "./components/MainMenu";

function App() {
  return (
    <div>
      <MainMenu />
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Words() {
  return <h2>Words</h2>;
}

function Phrases() {
  return <h2>Phrases</h2>;
}

function Recipes() {
  return <h2>Recipes</h2>;
}

export default App;
