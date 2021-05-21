import React from 'react'
import "./app.css"
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import LobbyPage from "./components/lobby/LobbyPage";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/lobby" component={LobbyPage} />
    </Switch>
  )
}

export default App
