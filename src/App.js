import React from 'react';
import './App.css';
import Button from './components/button/Button';
import Home from './pages/homePage/Home';
import Login from './pages/loginPage/Login';
import { Routes, Route, Link } from "react-router-dom";


function App() {
  return (
        <div className="App">
          <Routes>
            <Route path="/" exact={true} element={<Login />} />
            <Route path="/home" exact={true} element={<Home />} />
          </Routes>
        </div>
  );
}

export default App;
