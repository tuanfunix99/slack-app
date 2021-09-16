import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ChatRoom from "./components/ChatRoom";
import './App.css'

const App = () => {

  return (
    <React.Fragment>
      <Route path="/" exact component={ChatRoom} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </React.Fragment>
  );
};

export default App;
