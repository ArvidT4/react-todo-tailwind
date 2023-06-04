import React, { useState, useEffect, useReducer } from 'react';
import Test from './components/Test';
import Home from './components/pages/Home';
import { Routes, Route } from 'react-router-dom';
import testContext from './components/textContext';
import Todos from './components/pages/Todos';
import './index.css';
import EditTodo from './components/pages/EditTodo';
import Navbar from './components/Navbar';
import CreateTodo from './components/pages/CreateTodo';


function App() {

  const [test, setTest] = useState("")

  let storedTodos = JSON.parse(localStorage.getItem('todos'))
  const [todos, setTodos] = useState(storedTodos)

  const [doneTodos, setDoneTodos] = useState([])
  const [notDoneTodos, setNotDoneTodos] = useState([])

  useEffect(()=>{

    localStorage.setItem('todos',JSON.stringify(todos))
    JSON.parse(localStorage.getItem('todos'))
  }, [todos])

  return (
    <testContext.Provider value={{test, setTest, todos, setTodos, doneTodos, setDoneTodos, notDoneTodos, setNotDoneTodos}}>
    <div className="App">
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="/Todos" element={<Todos/>}/>
        <Route path="/createTodo" element={<CreateTodo/>}/>
        <Route path="/editTodo/:id" element={<EditTodo/>}/>
      </Routes>

    </div>
    </testContext.Provider>
  );
}

export default App;
