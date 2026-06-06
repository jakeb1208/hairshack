const icons = ['✂', '👦', '💈', '🧔', '💆', '👴']

export default function Services({ content }) {
  const services = [0,1,2,3,4,5].map(i => ({
    icon: icons[i],
    name: content?.[`services.${i}.name`] || '',
    desc: content?.[`services.${i}.desc`] || '',
    price: content?.[`services.${i}.price`] || '',
  })).filter(s => s.name)

  return (
    <section id="services" style={{
      padding: '6rem 2rem',
      background: 'var(--off-white)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 300,
        background: 'radial-gradient(ellipse, rgba(229,57,53,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            display: 'inline-block',
            background: 'var(--red-pale)', color: 'var(--red)',
            borderRadius: 20, padding: '5px 14px',
            fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>What We Do</span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--text-dark)', fontWeight: 700,
          }}>Our Services</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {services.map((s, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '2rem',
                border: '1.5px solid var(--silver)',
                transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                e.currentTarget.style.borderColor = 'rgba(229,57,53,0.3)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--silver)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: 'var(--red-pale)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', marginBottom: '1rem',
                boxShadow: '0 0 12px rgba(229,57,53,0.1)',
              }}>{s.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.2rem', fontWeight: 700,
                color: 'var(--text-dark)', marginBottom: '0.5rem',
              }}>{s.name}</h3>
              <p style={{
                fontSize: '0.9rem', color: 'var(--text-light)',
                lineHeight: 1.7, marginBottom: '1.25rem',
              }}>{s.desc}</p>
              <div style={{
                fontWeight: 700, color: 'var(--red)',
                fontSize: '1.1rem',
              }}>{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
