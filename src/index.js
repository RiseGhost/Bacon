import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BoardPage } from './Match/BoardPage';
import { HomePage } from './HomePage';
import { WordsContainer } from './WordRush/WordRush';
import { LoginPage } from './Login/login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/match" element={<BoardPage/>}></Route>
      <Route path='/wordrush' element={<WordsContainer/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
