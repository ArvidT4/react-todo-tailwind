import React, {useContext, useState, useEffect} from 'react'
import testContext from './textContext'
import axios from 'axios'
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import './style.css'

export default function Todo() {
  const navigate = useNavigate();
  
  const {todos, setTodos, doneTodos, setDoneTodos, notDoneTodos, setNotDoneTodos} = useContext(testContext);
  const [matches, setMatches] = useState(todos)
  let doneBool = true;
  
  

  function finishTodo(todo){
    //console.log(todo)
      if(todo.done){
        doneBool=false;
      }
      else doneBool=true
      fetch("http://127.0.0.1:8000/api/editTodo/"+todo.id, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        }, method: "PATCH",	
      
        body: JSON.stringify({
          "done":doneBool
        })
        
  
      }).then(function (response) {
    
        //console.log(response);
        return response.json();
        }).then(function (data) {
        //console.log(data);
      
        setTodos(data.data)
        
        sortIfDone(data.data)
        //console.log(data.data)
      });
  }
  function sortIfDone(arr){
    setDoneTodos([])
    setNotDoneTodos([])
    arr.forEach(element => {
      //console.log(element)
      if(element.done){
        setDoneTodos(prev=>([...prev, element]))
      }
      else setNotDoneTodos(prev=>([...prev, element]))
    });
  }
  function destroyTodo(todo){

    console.log(todo)
    axios.delete('http://127.0.0.1:8000/api/deleteTodo/'+todo.id)
    .then(() => console.log("deleted"));
    setTodos(old=>old.filter(el=>el.id!=todo.id)) 
    if(todo.done){
      setDoneTodos(old=>old.filter(el=>el.id!=todo.id)) 
    }
    setNotDoneTodos(old=>old.filter(el=>el.id!=todo.id)) 
  }
  function sendToEdit(todo){
    navigate("/editTodo/"+todo.id)
  }
 
  useEffect(() => {
    document.getElementById('default-search').addEventListener('keyup', e => {
      let val = e.target.value.toLowerCase();
      setMatches(notDoneTodos.filter(v => v.title.toLowerCase().includes(val)))
      //console.log(matches);
    }); 
  },[])
  

  return (
    <div className='mt-20'>
      <div>
        <div>
          <h3 className='font-bold text-center text-4xl'>{notDoneTodos.length} TODOS TO DO</h3>
        </div>
        <div className='test'>
          <form>   
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input name="searchBar" type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for a todo" required/>
              </div>
          </form>
        </div>

      </div>
      

      <div name="test" className="grid grid-cols-1 mb-12 place-items-center laptop:grid-cols-2 desktop:grid-cols-3">
        {todos.length==0 ? <h1>loading</h1> :matches.sort((a,b)=> a.priority > b.priority ? -1 : 1 ).map(todo=>{
          if(!todo.done)
          return <div className="max-w-sm p-6 m-5 bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={todo.id}>
              <div className='grid grid-cols-4 gap-5'>
                <div className="col-span-3">
                  
                  <h5 className="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">
                        <button className='hover:line-through hover:text-red-600' onClick={()=>destroyTodo(todo)}>{todo.title}</button>
                  </h5>
                  
                  <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                    <div className='grid grid-cols-3'>
                      <div className=''>Priority: {todo.priority}</div> 
                      <div><button onClick={()=>sendToEdit(todo)}><PencilSquareIcon className="h-6 w-6 text-black-500 hover:text-green-400"/></button></div>
                    </div>
                  </h5>
                </div>
                <div className='grid place-content-center'>
                  <button onClick={()=>finishTodo(todo)} className="bg-transparent  hover:bg-green-200 text-black font-semibold py-2 px-4 border border-black hover:border-transparent rounded">Mark as finished</button>
                </div>
              </div> 
          </div>
        })}
      </div>

      <h3 className='font-bold text-center text-4xl'>{doneTodos.length} FINSIHED TODOS</h3>
      <div className="grid grid-cols-1   place-items-center laptop:grid-cols-2 desktop:grid-cols-3">
        {todos.length==0 ? <h1>loading</h1> :todos.map(todo=>{
          if(todo.done)
          
          return <div key={todo.id} className="max-w-sm p-6 m-5 bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className='grid grid-cols-4 gap-5'>
                <div className="col-span-3">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><button className='hover:line-through hover:text-red-600' onClick={()=>destroyTodo(todo)}>{todo.title}</button></h5>
                  <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                    <div className='grid grid-cols-3'>
                      <div className=''>Priority: {todo.priority}</div> 
                      <div><button onClick={()=>sendToEdit(todo)}><PencilSquareIcon className="h-6 w-6 text-black-500 hover:text-green-400"/></button></div>
                    </div>
                  </h5>
                </div>
                <div className='grid place-content-center'>
                  <button onClick={()=>finishTodo(todo)} className="bg-transparent  hover:bg-green-200 text-black font-semibold py-2 px-4 border border-black hover:border-transparent rounded">Unfinish todo</button>
                </div>
              </div>
          </div>
        })}
      </div>
    </div>
  )
}
