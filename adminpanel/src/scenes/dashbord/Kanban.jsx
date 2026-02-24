// Kanban.jsx
import React, { useContext, useState } from 'react'
import { ThemeFunc } from '../assets/CreateApi';

const columnsOrder = ['todo', 'inProgress', 'pending', 'completed']
const columnNames = {
  todo: 'To Do',
  inProgress: 'In Progress',
  pending: 'Pending',
  completed: 'Completed'
}

const Kanban = () => {
  const { Toggle } = useContext(ThemeFunc);

  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    pending: [],
    completed: []
  })
  const [newTask, setNewTask] = useState('')

  const handleAddTask = e => {
    e.preventDefault()
    if (!newTask.trim()) return
    setColumns(prev => ({
      ...prev,
      todo: [...prev.todo, newTask.trim()]
    }))
    setNewTask('')
  }

  const handleDragStart = (e, item, from) => {
    e.dataTransfer.setData('item', item)
    e.dataTransfer.setData('from', from)
    e.target.style.opacity ='100%'
  }

  const handleDrop = (e, to) => {
    e.preventDefault()
    const item = e.dataTransfer.getData('item')
    const from = e.dataTransfer.getData('from')
    if (from === to) return
    setColumns(prev => {
      const fromList = prev[from].filter(i => i !== item)
      const toList = [...prev[to], item]
      return {
        ...prev,
        [from]: fromList,
        [to]: toList
      }
    })
  }

  const allowDrop = e => e.preventDefault()

  return (
    <div className={`min-h-screen  p-4 ${Toggle === "light" ? "bg-white shadow-gray-200" : "bg-gray-900 shadow-gray-800 text-white"}`}>
      <form onSubmit={handleAddTask} className="mb-4 flex space-x-2">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="flex-1 px-3 py-2 border rounded shadow-sm focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columnsOrder.map(col => (
          <div
            key={col}
            className={`${Toggle === "light" ? " shadow-2xs bg-neutral-200 shadow-gray-200" : "bg-gray-700 shadow-gray-800 text-white"}
              rounded p-2`}
            onDragOver={allowDrop}
            onDrop={e => handleDrop(e, col)}
          >
            <h2 className="font-bold text-lg mb-2">{columnNames[col]}</h2>
            {columns[col].map(item => (
              <div
                key={item}
                draggable
                onDragStart={e => handleDragStart(e, item, col)}
                className={` ${Toggle === "light" ? " shadow-2xs bg-neutral-200 shadow-gray-200" : "bg-gray-700 shadow-gray-800 text-white"} mb-2 p-3 rounded shadow cursor-move`}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Kanban
