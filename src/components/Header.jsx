import { motion } from 'framer-motion'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia 👋'
  if (h < 18) return 'Boa tarde 👋'
  return 'Boa noite 👋'
}

export default function Header({ counts }) {
  const pct = counts.todas === 0 ? 0 : Math.round((counts.concluidas / counts.todas) * 100)
  const allDone = counts.todas > 0 && counts.pendentes === 0

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ marginBottom: '2rem' }}
    >
      {/* Topo */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 800, color: '#e6edf3', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: '0.4rem' }}>
          Portuga<span style={{ color: '#6366f1' }}>Task</span>
        </h1>
        <p style={{ color: '#484f58', fontSize: '0.82rem' }}>
          anota, organiza e risca da lista.
        </p>
      </div>

      {/* Stats em linha */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {[
          { label: 'tarefas', value: counts.todas },
          { label: 'pendentes', value: counts.pendentes, highlight: counts.pendentes > 0 },
          { label: 'feitas', value: counts.concluidas },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: s.highlight ? '#f59e0b' : '#6366f1' }}>
              {s.value}
            </span>
            <span style={{ fontSize: '0.78rem', color: '#484f58', fontWeight: 500 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Progresso */}
      {counts.todas > 0 && (
        <div>
          <div style={{ background: '#21262d', borderRadius: '999px', height: '4px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: allDone ? '#22c55e' : '#6366f1',
                borderRadius: '999px',
              }}
            />
          </div>
          <p style={{ fontSize: '0.72rem', color: '#484f58', marginTop: '0.4rem' }}>
            {allDone ? '🎉 tudo feito!' : `${pct}% concluído`}
          </p>
        </div>
      )}
    </motion.header>
  )
}
