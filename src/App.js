import React, { Component } from 'react';
import TodoContextProvider from './contexts/TodoContext';

import TodoTable from './components/TodoTable';
import AppBar from './components/AppBar';
import './App.css';

class App extends Component {

  componentDidCatch(error, info) {
    // Do something useful with error like logging to error reporting system
    // then force reload (if that's what you want):
    window.location.reload(false);
  }

  render() {
    return (
      <div>
        <TodoContextProvider>
            <AppBar />
            <TodoTable />
        </TodoContextProvider>
    </div>
    );
  }
}

export default App;
