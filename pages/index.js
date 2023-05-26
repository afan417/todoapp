import { useState } from 'react'

import AddTodoForm from '@/components/AddTodoForm'
import Todo from '@/components/Todo'
import Layout from '@/layout/Layout'

import prisma from '../prisma'

export default function Home(props) {
  const [showAddTodo, setShowAddTodo] = useState(false)
  const [todos, setTodos] = useState(props.todos)

  function addTodo(todo) {
    setTodos([...todos, todo])
  }

  async function deleteTodo(id) {
    let response = await fetch('/api/todo/' + id, {
      method: 'DELETE',
    })
    response = await response.json()
    if (response) {
      // remove the todos from the list of todos.
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  return (
    <Layout title="Home">
      <div className="min-h-screen bg-gray-50">
        <div className="container py-10">
          <div className="max-w-xl mx-auto">
            <div className="flex justify-center mb-10">
              <button
                onClick={() => setShowAddTodo(!showAddTodo)}
                className="w-1/2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 "
              >
                {showAddTodo ? 'Back to Todos' : 'Add todo'}
              </button>
            </div>

            {showAddTodo ? (
              <div className="mt-4">
                <AddTodoForm addTodo={addTodo} />
              </div>
            ) : todos.length > 0 ? (
              todos.map((todo) => (
                <div key={todo.id} className="p-6 mb-6 bg-white rounded-md shadow-md">
                  <Todo todo={todo} deleteTodo={deleteTodo} />
                </div>
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <h1 className="text-2xl font-bold text-gray-500">You do not have any todos added.</h1>
  </div>
)

export const getServerSideProps = async () => {
  const todos = await prisma.todo.findMany({
    orderBy: {
      completed: 'asc',
    },
  })

  return {
    props: { todos },
  }
}
