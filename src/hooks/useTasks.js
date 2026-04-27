import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

const STORAGE_KEY = 'taskflow_tasks'

const defaultTasks = [
  { id: uuid(), title: 'Estudar React Hooks', priority: 'alta', done: false, createdAt: Date.now() },
  { id: uuid(), title: 'Criar portfólio profissional', priority: 'alta', done: true, createdAt: Date.now() - 1000 },
  { id: uuid(), title: 'Aprender Pandas e análise de dados', priority: 'media', done: false, createdAt: Date.now() - 2000 },
]

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : defaultTasks
    } catch {
      return defaultTasks
    }
  })

  const [filter, setFilter] = useState('todas')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title, priority = 'media') => {
    if (!title.trim()) return
    setTasks(prev => [
      { id: uuid(), title: title.trim(), priority, done: false, createdAt: Date.now() },
      ...prev,
    ])
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const updateTask = (id, title, priority) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, title, priority } : t))
    setEditingId(null)
  }

  const clearDone = () => {
    setTasks(prev => prev.filter(t => !t.done))
  }

  const filtered = tasks.filter(t => {
    if (filter === 'pendentes') return !t.done
    if (filter === 'concluidas') return t.done
    return true
  })

  const counts = {
    todas: tasks.length,
    pendentes: tasks.filter(t => !t.done).length,
    concluidas: tasks.filter(t => t.done).length,
  }

  return {
    tasks: filtered,
    allTasks: tasks,
    filter, setFilter,
    editingId, setEditingId,
    addTask, toggleTask, deleteTask, updateTask, clearDone,
    counts,
  }
}
