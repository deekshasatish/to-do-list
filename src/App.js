import TodoList from "./TodoList";
import React,{useState,useRef,useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE='todosArray'
function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();


  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE));
    console.log("storedTodos===>",storedTodos);
    if(storedTodos) setTodos(storedTodos)}, [])

  useEffect(()=>{
    console.log("todos in useEffetct",todos)
    localStorage.setItem(LOCAL_STORAGE,JSON.stringify(todos))
  },[todos])

  function toggleTodo(id){
    const newTodos=[...todos]
    const todo = newTodos.find(todo=>todo.id === id);
    console.log("todo===>",todo);
    todo.completed = !todo.completed ;
    setTodos(newTodos);
  };


  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name == '') return
    console.log('name',name);
    todoNameRef.current.value=null
    setTodos(prevTodos =>{
      return [...prevTodos, {id:uuidv4(),name:name,completed:false}]
    })
  }

  function handleClear(){
    const newTodos = todos.filter(todo=> !todo.completed)
    setTodos(newTodos);
  }
  return (
    <>
    <TodoList todos={todos} handleCheckBox={toggleTodo} />
    <input ref= {todoNameRef} type='text' />
    <button onClick={handleAddTodo}>
      Add To-do
    </button>
    <button onClick={handleClear}>
      Clear Completed
    </button>
    <div> {todos.filter(todo=> !todo.completed).length} left to-do</div>
    </>
  );
}

export default App;
