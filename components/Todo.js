import React, { useState } from 'react'

const Todo = (props) => {
  const [todo, setTodo] = useState(props.todo)

  console.log('test')
  const updateTodo = async () => {
    const data = {
      completed: true,
    }

    // Send Request to Update Todo
    let response = await fetch('/api/todo/' + todo.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    // Get the response
    response = await response.json()

    // Response check
    if (response) {
      setTodo({
        ...todo,
        completed: true,
      })
    }
  }

  return (
    <>
      <h4 className="mb-2 text-lg font-bold">{todo.title}</h4>
      <p className="mb-2">
        {todo.completed ? (
          <span className="font-bold text-green-600">Already Completed</span>
        ) : (
          <span className="font-bold text-red-600">Not Completed</span>
        )}
      </p>

      {!todo.completed && (
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => updateTodo()}
        >
          Mark as Completed
        </button>
      )}

      {todo.completed && (
        <button
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          onClick={() => props.deleteTodo(todo.id)}
        >
          Delete Todo
        </button>
      )}
    </>
  )
}

export default Todo
