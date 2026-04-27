import './index.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useTasks } from './hooks/useTasks'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import FilterBar from './components/FilterBar'
import TaskCard from './components/TaskCard'

const emptyMessages = {
  todas:      { icon: '📋', text: 'nenhuma tarefa ainda.' },
  pendentes:  { icon: '✌️', text: 'nada pendente. aproveita.' },
  concluidas: { icon: '🎯', text: 'nenhuma tarefa concluída ainda.' },
}

function App() {
  const { tasks, filter, setFilter, counts, addTask, toggleTask, deleteTask, updateTask, clearDone } = useTasks()
  const empty = emptyMessages[filter]

  return (
    <div style={{ minHeight: '100vh', padding: '3rem 1rem 4rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Header counts={counts} />
        <TaskInput onAdd={addTask} />
        <FilterBar filter={filter} setFilter={setFilter} counts={counts} onClearDone={clearDone} />

        {/* Separador */}
        <div style={{ height: '1px', background: '#21262d', marginBottom: '1rem' }} />

        {/* Lista */}
        <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          <AnimatePresence mode="popLayout">
            {tasks.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ padding: '2.5rem 1rem', textAlign: 'center', color: '#30363d' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{empty.icon}</div>
                <p style={{ fontSize: '0.82rem' }}>{empty.text}</p>
              </motion.div>
            ) : (
              tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer mínimo */}
        <p style={{ textAlign: 'center', marginTop: '3rem', color: '#21262d', fontSize: '0.72rem' }}>
          PortugaTask · por{' '}
          <a href="https://github.com/ivoportugal1" target="_blank" rel="noopener noreferrer"
            style={{ color: '#30363d', textDecoration: 'none' }}
            onMouseEnter={e => e.target.style.color = '#6366f1'}
            onMouseLeave={e => e.target.style.color = '#30363d'}
          >
            ivo portugal
          </a>
        </p>
      </div>
    </div>
  )
}

export default App
