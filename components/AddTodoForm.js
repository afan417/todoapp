import { useState } from 'react'

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    console.log('test')

    e.preventDefault()
    if (!title) {
      setError('Title is required')
      setMessage('')
      return
    } else {
      setError('')
    }

    const data = {
      title,
    }

    // sending a request to the backend.
    fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // reset all fields.
        setTitle('')
        setError('')
        setMessage('Todo added successfully')

        // add the todo.
        addTodo(data)
      })
  }

  return (
    <div className="p-6 bg-white border rounded-md shadow-lg">
      <form onSubmit={handleSubmit}>
        {error && <div className="p-3 mb-4 text-red-500 bg-red-100 rounded-md">{error}</div>}
        {message && <div className="mb-4 text-green-500">{message}</div>}

        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-bold text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title of Todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default AddTodo
