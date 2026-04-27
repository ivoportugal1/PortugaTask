import { motion } from 'framer-motion'
import { FiTrash2 } from 'react-icons/fi'

const filters = [
  { value: 'todas',     label: 'todas' },
  { value: 'pendentes', label: 'pendentes' },
  { value: 'concluidas',label: 'feitas' },
]

export default function FilterBar({ filter, setFilter, counts, onClearDone }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25 }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}
    >
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: filter === f.value ? 600 : 400,
              fontFamily: 'Inter, sans-serif',
              background: filter === f.value ? '#21262d' : 'transparent',
              color: filter === f.value ? '#e6edf3' : '#484f58',
              transition: 'all 0.15s',
              borderBottom: filter === f.value ? '2px solid #6366f1' : '2px solid transparent',
            }}
          >
            {f.label}
            {' '}
            <span style={{ color: filter === f.value ? '#6366f1' : '#30363d', fontWeight: 700 }}>
              {counts[f.value]}
            </span>
          </button>
        ))}
      </div>

      {counts.concluidas > 0 && (
        <button
          onClick={onClearDone}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'none',
            border: 'none',
            color: '#484f58',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontFamily: 'Inter, sans-serif',
            transition: 'color 0.15s',
            padding: '0.25rem 0',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
          onMouseLeave={e => e.currentTarget.style.color = '#484f58'}
        >
          <FiTrash2 size={13} /> limpar feitas
        </button>
      )}
    </motion.div>
  )
}
