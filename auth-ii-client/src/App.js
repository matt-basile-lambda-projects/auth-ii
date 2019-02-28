import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import List from './components/List/List'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

class App extends Component {
  render() {
    return (
      <>
      <main>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/users" component={List}></Route>
      </main>
      </>
    );
  }
}

export default withRouter(App);
