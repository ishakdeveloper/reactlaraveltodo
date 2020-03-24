import React, { Component } from 'react';
import TodoContextProvider from './contexts/TodoContext';

import TodoTable from './components/TodoTable'
import { CssBaseline } from '@material-ui/core';

import './App.css';

class App extends Component {

  componentDidCatch(error, info) {
    // Do something useful with error like logging to error reporting system
    // then force reload (if that's what you want):
    window.location.reload(false);
  }

  render() {
    return (
      <TodoContextProvider>
        <CssBaseline>
          <TodoTable />
        </CssBaseline>
      </TodoContextProvider>
    );
  }
}

export default App;
