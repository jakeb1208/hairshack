export default function About({ content }) {
  return (
    <section id="about" style={{
      padding: '6rem 2rem',
      background: '#fff',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: -200, top: '50%', transform: 'translateY(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(229,57,53,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '5rem', alignItems: 'center',
      }}>
        <div>
          <div style={{
            background: 'linear-gradient(135deg, var(--red-pale) 0%, #fff0f0 100%)',
            borderRadius: 20, padding: '3rem',
            border: '2px solid rgba(229,57,53,0.12)',
            boxShadow: 'var(--shadow-glow)',
            textAlign: 'center',
            animation: 'glow-pulse 4s ease infinite',
          }}>
            <div style={{
              fontSize: '6rem', lineHeight: 1, marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 12px rgba(229,57,53,0.3))',
            }}>✂</div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.4rem', fontWeight: 700,
              color: 'var(--red)', marginBottom: '0.5rem',
            }}>Duc & Tran</div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
              Master Barbers · Mandeville, LA
            </div>
            <div style={{
              marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem',
            }}>
              {[['20+', 'Years'], ['5,000+', 'Clients'], ['4.9★', 'Rating']].map(([n, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1.5rem',
                    fontWeight: 700, color: 'var(--red)',
                  }}>{n}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <span style={{
            display: 'inline-block',
            background: 'var(--red-pale)', color: 'var(--red)',
            borderRadius: 20, padding: '5px 14px',
            fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>Our Story</span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 700, color: 'var(--text-dark)',
            lineHeight: 1.2, marginBottom: '1.25rem',
          }}>
            {content?.['about.title'] || 'Your Neighborhood Barbers'}
          </h2>
          <p style={{
            color: 'var(--text-mid)', lineHeight: 1.85,
            fontSize: '1.05rem', marginBottom: '1rem',
          }}>
            {content?.['about.body'] || 'Duc and Tran have been serving the Mandeville community for over 20 years. Known for their skill, warmth, and attention to detail, they make every client feel right at home — and leave looking their best.'}
          </p>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.8, fontSize: '0.95rem' }}>
            They know your name, remember your style, and always take the time to listen. That's the Hair Shack difference.
          </p>

          <div style={{
            marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
          }}>
            {['Precision Cuts', 'Kid Friendly', 'Walk-ins Welcome', 'Fair Prices'].map(tag => (
              <span key={tag} style={{
                background: 'var(--silver)',
                color: 'var(--text-mid)',
                padding: '6px 14px', borderRadius: 20,
                fontSize: '0.8rem', fontWeight: 500,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}
