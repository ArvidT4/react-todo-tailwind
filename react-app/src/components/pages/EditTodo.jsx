import React, {useContext, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import testContext from '../textContext';
export default function EditTodo() {
    
    const {todos, setTodos} = useContext(testContext);
    let {id} = useParams();
    const [variable, setVariable] = useState(1)
    const navigate = useNavigate()
    
    let arr = [{"value":1},{"value":2},{"value":3}];
    let todo = {"done":0,"priority":1};
    
    
    function prioFunc(val){
        console.log(val)
        setVariable(val)
    }
    useEffect(()=>{
        
        todo = todos.find(el=>el.id==id)
        console.log("todo", todo)
        document.getElementById("title").value = todo.title
        prioFunc(todo.priority)
        /* document.getElementById("priority").innerText = "Priority " + todo.priority */
    },[])
    function updateTodo(e){
        e.preventDefault();
        
        console.log(e.target.title.value)
          fetch("http://127.0.0.1:8000/api/editTodo/"+id, {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            }, method: "PATCH",	
          
            body: JSON.stringify({
              "title":e.target.title.value,
              "priority":variable
            })
            
      
          }).then(function (response) {
        
            //console.log(response);
            return response.json();
            }).then(function (data) {
            //console.log(data);
          
            setTodos(data.data)
            navigate("/todos")
            //console.log(data.data)
          });
      }
  return (
    
    <div className='grid justify-center text-center'>
        {!todo ? <h1>Loading</h1>:
      <form onSubmit={updateTodo}>
      <div className="block max-w-sm p-6 mt-10  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Update Todo</h5>
          <label htmlFor="title">Title </label>
          <input type="text" id="title" name="title" className='rounded'/>
          
          
            <div class="flex justify-center m-6">
                {arr.map((obj)=>(
                    <div class="flex items-center mr-4" key={obj.value}>
                        <input onClick={()=>prioFunc(obj.value)} id="inline-radio" type="radio" value="1" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="inline-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{obj.value}</label>
                    </div>
                ))}
            </div>


          <button type="submit" className=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update Todo</button>
      </div>
      </form>
      }
    </div>
  )
}
