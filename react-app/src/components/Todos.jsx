import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import testContext from './textContext'
import Todo from './Todo';

export default function Todos() {
    const {todos, setTodos} = useContext(testContext);
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/todos')
        .then(res=>{
            //console.log(res.data.data)
            setTodos(res.data.data)
            
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    console.log("todo",todos.find(el=>el.id==2))

  return (
    <div>
        <Todo></Todo>
    </div>
  )
}
