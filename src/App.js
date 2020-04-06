import React, { Component } from 'react';
import TodoContextProvider from './contexts/TodoContext';

import TodoTable from './components/TodoTable';
import AppBar from './components/AppBar';
import './App.css';

class App extends Component {

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
