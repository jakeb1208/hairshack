export default function Hero({ content }) {
  const hasImage = content?.['hero.image'] && content['hero.image'] !== ''

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #fff 0%, #fff5f5 50%, #fafafa 100%)',
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '10%', right: '5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(229,57,53,0.07) 0%, transparent 70%)',
        animation: 'float 6s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '0%',
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(229,57,53,0.05) 0%, transparent 70%)',
        animation: 'float 8s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '8rem 2rem 5rem',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: hasImage ? '1fr 1fr' : '1fr',
        gap: '4rem', alignItems: 'center',
      }}>
        <div style={{ animation: 'fade-up 0.8s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--red-pale)', color: 'var(--red)',
            borderRadius: 20, padding: '6px 16px',
            fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '1.5rem',
            boxShadow: '0 0 12px rgba(229,57,53,0.12)',
          }}>
            ✂ Mandeville, LA
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            lineHeight: 1.1, fontWeight: 700,
            color: 'var(--text-dark)',
            marginBottom: '1.5rem',
          }}>
            {content?.['hero.title'] || 'The Hair Shack'}
            <span style={{
              display: 'block', color: 'var(--red)',
              fontSize: '0.6em',
              background: 'linear-gradient(90deg, var(--red), #ff6b6b, var(--red))',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'shimmer 3s linear infinite',
            }}>Where Barbers Care.</span>
          </h1>

          <p style={{
            fontSize: '1.1rem', color: 'var(--text-mid)',
            lineHeight: 1.8, maxWidth: 520, marginBottom: '2.5rem',
          }}>
            {content?.['hero.subtitle'] || 'Expert cuts & styles in Mandeville, LA — where great hair meets friendly faces.'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              style={{
                background: 'var(--red)', color: '#fff',
                padding: '0.9rem 2rem', borderRadius: 8,
                fontSize: '1rem', fontWeight: 700,
                boxShadow: 'var(--shadow-glow)',
                animation: 'glow-pulse 3s ease infinite',
                transition: 'transform 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
            >
              {content?.['hero.cta'] || 'Book Your Cut'}
            </a>
            <a
              href="#reviews"
              style={{
                border: '2px solid var(--silver-mid)',
                color: 'var(--text-mid)',
                padding: '0.9rem 2rem', borderRadius: 8,
                fontSize: '1rem', fontWeight: 600,
                transition: 'border-color 0.2s, color 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = 'var(--red)'
                e.target.style.color = 'var(--red)'
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = 'var(--silver-mid)'
                e.target.style.color = 'var(--text-mid)'
              }}
            >
              See Reviews ★ 4.9
            </a>
          </div>

          <div style={{
            marginTop: '3rem', display: 'flex', gap: '2.5rem',
          }}>
            {[['20+', 'Years Open'], ['4.9★', 'Rating']].map(([num, label]) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: '2rem',
                  fontWeight: 700, color: 'var(--red)',
                  textShadow: '0 0 12px rgba(229,57,53,0.2)',
                }}>{num}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', letterSpacing: '0.08em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {hasImage && (
          <div style={{
            display: 'flex', justifyContent: 'center',
            animation: 'fade-up 0.8s 0.2s ease both',
          }}>
            <div style={{
              borderRadius: 16, overflow: 'hidden',
              boxShadow: 'var(--shadow-glow-strong)',
              border: '3px solid var(--red-pale)',
              maxWidth: 480, width: '100%',
            }}>
              <img src={content['hero.image']} alt="Hair Shack" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
