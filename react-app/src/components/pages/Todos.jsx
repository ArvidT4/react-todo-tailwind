import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import testContext from '../textContext'
import Todo from '../Todo';

export default function Todos() {
    const {todos, setTodos, setDoneTodos, setNotDoneTodos} = useContext(testContext);
    let obj = {"done":0}
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/todos')
        .then(res=>{
            //console.log(res.data.data)
            setTodos([])
            /* res.data.data.forEach(element => {
                if(element.priority>obj.priority){
                    setTodos(prev=>([element, ...prev]))
                }
                else setTodos(prev=>([...prev,element]))
                obj=element
            }); */
            setTodos(res.data.data)
            sortIfDone(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    //console.log("todo",todos.find(el=>el.id==2))
    function sortIfDone(arr){
        setDoneTodos([])
        setNotDoneTodos([])
        arr.forEach(element => {
          //console.log(element)
          if(element.done){
            //console.log("test")
            
            setDoneTodos(prev=>([...prev, element]))
        
          }
          else setNotDoneTodos(prev=>([...prev, element]))
        });
      }

  return (
    <div>
        <Todo></Todo>
    </div>
  )
}
