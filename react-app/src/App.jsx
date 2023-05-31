import React, { useState } from 'react';
import Test from './components/Test';
import { Routes, Route } from 'react-router-dom';
import testContext from './components/textContext';
import Todos from './components/Todos';
import './index.css';
import Navbar from './components/Navbar';

function App() {
  const [test, setTest] = useState("")
  const [todos, setTodos] = useState([])

  return (
    <testContext.Provider value={{test, setTest, todos, setTodos}}>
    <div className="App">
    <Navbar></Navbar>
      <Routes>
        <Route path="/Todos" element={<Todos/>}/>
      </Routes>

    </div>
    </testContext.Provider>
  );
}

export default App;
