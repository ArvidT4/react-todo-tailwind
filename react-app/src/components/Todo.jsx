import React, {useContext, useEffect} from 'react'
import testContext from './textContext'
import './style.css'

export default function Todo() {
  const {todos, setTodos} = useContext(testContext);

  return (
    <div className='mt-20'>
      <h3 className='font-bold text-center text-4xl'>{todos.length} TODOS TO DO</h3>
      <div className="grid grid-cols-1 place-items-center laptop:grid-cols-2 desktop:grid-cols-3">
    
        {todos.length==0 ? <h1>loading</h1> :todos.map((todo)=>(
          
          <div class="max-w-sm p-6 m-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className='grid grid-cols-4 gap-5'>
                <div class="col-span-3">
                
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{todo.title}</h5>
                    <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Priority: {todo.priority}</h5>
                
                </div>
                <div className='grid place-content-center'>
                  <button className="bg-transparent hover:bg-green-200 text-green-200 font-semibold hover:text-white py-2 px-4 border border-green-200 hover:border-transparent rounded">Mark as finished</button>
                </div>
              </div> 
          </div>
        ))}
      </div>

      
    </div>
  )
}
