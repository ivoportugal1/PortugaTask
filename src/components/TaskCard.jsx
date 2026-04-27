import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiTrash2, FiEdit2, FiX, FiSave } from 'react-icons/fi'

const priorityConfig = {
  alta:  { dot: '#ef4444', label: 'urgente' },
  media: { dot: '#f59e0b', label: 'normal'  },
  baixa: { dot: '#22c55e', label: 'quando der' },
}

export default function TaskCard({ task, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editPriority, setEditPriority] = useState(task.priority)
  const [hovered, setHovered] = useState(false)

  const p = priorityConfig[task.priority] || priorityConfig.media

  const saveEdit = () => {
    if (!editTitle.trim()) return
    onUpdate(task.id, editTitle.trim(), editPriority)
    setEditing(false)
  }

  const cancelEdit = () => {
    setEditTitle(task.title)
    setEditPriority(task.priority)
    setEditing(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card"
      style={{
        padding: '0.7rem 1rem',
        opacity: task.done && !editing ? 0.5 : 1,
        transition: 'opacity 0.2s',
      }}
    >
      {editing ? (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') cancelEdit() }}
            autoFocus
            style={{ flex: 1, minWidth: '140px', padding: '0.45rem 0.7rem', fontSize: '0.88rem' }}
          />
          <select
            value={editPriority}
            onChange={e => setEditPriority(e.target.value)}
            style={{ padding: '0.45rem 0.7rem', fontSize: '0.78rem', cursor: 'pointer', color: '#8b949e' }}
          >
            <option value="alta">🔴 urgente</option>
            <option value="media">🟡 normal</option>
            <option value="baixa">🟢 quando der</option>
          </select>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <Btn onClick={saveEdit} color="#6366f1"><FiSave size={14} /></Btn>
            <Btn onClick={cancelEdit} color="#f87171"><FiX size={14} /></Btn>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            style={{
              flexShrink: 0,
              width: '18px', height: '18px',
              borderRadius: '4px',
              border: task.done ? 'none' : '1.5px solid #30363d',
              background: task.done ? '#6366f1' : 'transparent',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
              transition: 'all 0.15s',
            }}
          >
            {task.done && <FiCheck size={11} strokeWidth={3} />}
          </button>

          {/* Título */}
          <span style={{
            flex: 1,
            fontSize: '0.88rem',
            color: task.done ? '#484f58' : '#cdd9e5',
            textDecoration: task.done ? 'line-through' : 'none',
            lineHeight: 1.4,
            wordBreak: 'break-word',
          }}>
            {task.title}
          </span>

          {/* Prioridade — dot + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.dot, display: 'inline-block' }} />
            <span style={{ fontSize: '0.7rem', color: '#484f58' }}>{p.label}</span>
          </div>

          {/* Ações — só aparecem no hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.12 }}
                style={{ display: 'flex', gap: '0.2rem', flexShrink: 0 }}
              >
                <Btn onClick={() => setEditing(true)} color="#8b949e"><FiEdit2 size={13} /></Btn>
                <Btn onClick={() => onDelete(task.id)} color="#f87171"><FiTrash2 size={13} /></Btn>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}

function Btn({ onClick, color, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: '#30363d', padding: '0.2rem', borderRadius: '4px',
        display: 'flex', alignItems: 'center', transition: 'color 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = color}
      onMouseLeave={e => e.currentTarget.style.color = '#30363d'}
    >
      {children}
    </button>
  )
}
