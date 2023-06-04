import React, {useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import testContext from '../textContext';

export default function CreateTodo() {
  const navigate = useNavigate();
  const {todos, setTodos} = useContext(testContext);
  const [variable, setVariable] = useState(1)
  
  let arr = [{"value":1},{"value":2},{"value":3}];
  function prioFunc(val){
    //console.log(val)
    setVariable(val)
  }

  let sendTodo = (e) => {
    e.preventDefault();
    
    fetch("http://127.0.0.1:8000/api/createTodo", {
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
      }, method: "POST",	
    
      body: JSON.stringify({
        "title":e.target.title.value,
        "priority":variable
      })
      

    }).then(function (response) {
  
      //console.log(response);
      return response.json();
      }).then(function (data) {
      //console.log(data);
      setTodos(prev=>([...prev, data.data]))
      navigate("/todos");
      });
    };

  
  return (
    
    <div className='grid justify-center text-center'>
      <form onSubmit={sendTodo}>
      <div className="block max-w-sm p-6 mt-10  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create todo</h5>
          <label htmlFor="title">Title </label>
          <input type="text" id="title" name="title" className='rounded'/>
          
          <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-green-500 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm px-4 py-2.5 mt-10 text-center inline-flex items-center dark:bg-green-500 dark:hover:bg-green-300 dark:focus:bg-green-300" type="button">Priority {variable} <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
          <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                
              {arr.map((obj)=>(
                <li>
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={()=>prioFunc(obj.value)}>{obj.value}</p>
                </li>
              ))}
              </ul>
          </div>
          <button type="submit" className="focus:outline-none ml-8 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Todo</button>
      </div>
      </form>
    </div>
  )
}
