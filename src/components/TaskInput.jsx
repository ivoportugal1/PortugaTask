import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'

const priorities = [
  { value: 'alta',  label: '🔴 urgente' },
  { value: 'media', label: '🟡 normal' },
  { value: 'baixa', label: '🟢 quando der' },
]

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('media')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title, priority)
    setTitle('')
    setPriority('media')
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      style={{ marginBottom: '1.25rem' }}
    >
      <div className="card" style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="nova tarefa..."
          style={{ flex: 1, minWidth: '180px', padding: '0.6rem 0.85rem' }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem', cursor: 'pointer', color: '#8b949e' }}
        >
          {priorities.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: '#6366f1',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.85rem',
            padding: '0.6rem 1.1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontFamily: 'Inter, sans-serif',
            whiteSpace: 'nowrap',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#4f46e5'}
          onMouseLeave={e => e.currentTarget.style.background = '#6366f1'}
        >
          <FiPlus size={16} /> adicionar
        </motion.button>
      </div>
    </motion.form>
  )
}
