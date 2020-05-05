/* eslint-disable no-unused-vars */
// @flow
import React, { Component, useContext } from 'react';
import { hot } from "react-hot-loader";
import Home from "../Home/Home.js";
import UserProvider from "../../providers/UserProvider.jsx";
import { UserContext } from "../../providers/UserProvider.jsx";
import LoginRoute from "../FirebaseLogin/LoginRoute.js";

import './App.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
   
    return (  
      <UserProvider>
       <LoginRoute />
      </UserProvider>  
    );
  }

}

export default hot(module)(App);
