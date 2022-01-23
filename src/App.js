import React from 'react';
import './App.css';
import Button from './components/button/Button';
import Home from './pages/homePage/Home';
import Login from './pages/loginPage/Login';
import { Routes, Route, Link } from "react-router-dom";
import Test from './Test';


function App() {
  return (
        <div className="App">
          <Routes>
            <Route path="/" exact={true} element={<Login />} />
            <Route path="/home" exact={true} element={<Home />} />
            <Route path="/test" element={<Test.js />} />
          </Routes>
        </div>
  );
}

export default App;
