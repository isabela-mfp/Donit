import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './components/Home/Home';
import { AuthProvider } from './hooks/useAuth';
import RequireAuth from './components/RequireAuth/RequireAuth';
import TodoList from './components/TodoList/TodoList';

function App() {
  const panel = (
    <RequireAuth><TodoList /></RequireAuth>);
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/panel" element={panel} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
