import React, { useState } from 'react';
import Test from './components/Test';
import Home from './components/pages/Home';
import { Routes, Route } from 'react-router-dom';
import testContext from './components/textContext';
import Todos from './components/pages/Todos';
import './index.css';
import Navbar from './components/Navbar';
import CreateTodo from './components/pages/createTodo';

function App() {
  const [test, setTest] = useState("")
  const [todos, setTodos] = useState([])

  return (
    <testContext.Provider value={{test, setTest, todos, setTodos}}>
    <div className="App">
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Todos" element={<Todos/>}/>
        <Route path="/createTodo" element={<CreateTodo/>}/>
      </Routes>

    </div>
    </testContext.Provider>
  );
}

export default App;
