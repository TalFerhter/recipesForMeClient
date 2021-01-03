import logo from './logo.svg';
import './App.css';
import RecipesPage from './components/RecipesPage'
import WordsList from './components/WordsList';
import PhrasesList from './components/PhrasesList';
import HomePage from './components/HomePage';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/WordsList">Words</Link>
            </li>
            <li>
              <Link to="/PhrasesList">Phrases</Link>
            </li>
            <li>
              <Link to="/RecipesPage">Recipes</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/WordsList">
            <WordsList />
          </Route>
          <Route path="/PhrasesList">
            <PhrasesList />
          </Route>
          <Route path="/RecipesPage">
            <RecipesPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
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
