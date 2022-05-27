import { Card, CardHeader, CardContent } from '@material-ui/core';
import React from 'react';
import './App.css';

import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <div className="App">
      <Card>
        <CardHeader title="Donit" />
        <CardContent>
          <TodoList />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
