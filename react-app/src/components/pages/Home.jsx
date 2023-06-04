import React from 'react'
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  function navigateTodo(){
    navigate("/todos")
  }
  return (
    <div className='text-center'>
      <h1 className='m-10'>This is the home page</h1>
      <button onClick={navigateTodo} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Navigate to the todolist</button>
    </div>
  )
}
