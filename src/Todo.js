import React from 'react'

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick(){
        console.log(todo.id)
        toggleTodo(todo.id);
    }

    return (
        <div>
            <label>
            <input type='checkbox' checked={todo.completed} onChange={handleTodoClick} />
            {todo.name}
            </label>
        </div>
    )
}
