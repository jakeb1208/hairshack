export default function Contact({ content }) {
  return (
    <section id="contact" style={{
      padding: '6rem 2rem',
      background: '#fff',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            display: 'inline-block',
            background: 'var(--red-pale)', color: 'var(--red)',
            borderRadius: 20, padding: '5px 14px',
            fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>Find Us</span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--text-dark)', fontWeight: 700,
          }}>Visit The Hair Shack</h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '2.5rem', alignItems: 'start',
        }}>
          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                icon: '📍',
                label: 'Address',
                value: content?.['contact.address'] || '4061 LA-59, Mandeville, LA 70471',
              },
              {
                icon: '🕐',
                label: 'Hours',
                value: (
                  <div>
                    <div style={{ color: 'var(--text-light)', marginBottom: '0.15rem' }}>Monday: Closed</div>
                    <div>Tuesday – Saturday: 9am – 6pm</div>
                    <div style={{ color: 'var(--text-light)', marginTop: '0.15rem' }}>Sunday: Closed</div>
                  </div>
                ),
              },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                background: 'var(--off-white)',
                borderRadius: 12, padding: '1.5rem',
                border: '1.5px solid var(--silver)',
                transition: 'box-shadow 0.3s, border-color 0.3s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                  e.currentTarget.style.borderColor = 'rgba(229,57,53,0.25)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'var(--silver)'
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'var(--red-pale)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', flexShrink: 0,
                }}>{item.icon}</div>
                <div>
                  <div style={{
                    fontSize: '0.75rem', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--red)', marginBottom: '0.25rem',
                  }}>{item.label}</div>
                  <div style={{ color: 'var(--text-mid)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            <div style={{
              background: 'linear-gradient(135deg, var(--red) 0%, #ff6b6b 100%)',
              borderRadius: 12, padding: '1.5rem',
              boxShadow: 'var(--shadow-glow-strong)',
              animation: 'glow-pulse 3s ease infinite',
            }}>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                Walk-ins Welcome · No Appointment Needed
              </div>
              <div style={{
                fontFamily: 'var(--font-serif)',
                color: '#fff', fontSize: '1.2rem', fontWeight: 700,
              }}>
                Come in and see Duc or Tran today!
              </div>
            </div>
          </div>

          {/* Map embed */}
          <div style={{
            borderRadius: 16, overflow: 'hidden',
            border: '2px solid var(--silver)',
            boxShadow: 'var(--shadow-glow)',
            height: 400,
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.6!2d-90.079!3d30.413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x862a9b!2sHair+Shack!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hair Shack Location"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
