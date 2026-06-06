export default function Footer({ content }) {
  return (
    <footer style={{
      background: 'var(--text-dark)',
      color: 'rgba(255,255,255,0.7)',
      padding: '3rem 2rem 1.5rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
          gap: '3rem', paddingBottom: '2.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '1.5rem',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem', fontWeight: 700,
              color: 'var(--red-light)', marginBottom: '0.75rem',
              textShadow: '0 0 20px rgba(229,57,53,0.4)',
            }}>
              {content?.['business.name'] || 'The Hair Shack'}
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 280 }}>
              Your trusted neighborhood barber shop in Mandeville, LA. Proudly serving the community for over 20 years.
            </p>
          </div>
          <div>
            <h4 style={{
              color: '#fff', fontSize: '0.8rem',
              fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: '1rem',
            }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[['Services', '#services'], ['About', '#about'], ['Reviews', '#reviews'], ['Contact', '#contact']].map(([l, h]) => (
                <li key={l}><a href={h} style={{
                  fontSize: '0.9rem',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#ff6b6b'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
                >{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{
              color: '#fff', fontSize: '0.8rem',
              fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: '1rem',
            }}>Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li>{content?.['contact.address'] || '4061 LA-59, Mandeville, LA 70471'}</li>
              <li><a href="tel:+1" style={{ transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#ff6b6b'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
              >{content?.['contact.phone'] || '(985) 555-0100'}</a></li>
              <li style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {content?.['contact.hours'] || 'Mon–Sat: 9am – 6pm'}
              </li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
          © {new Date().getFullYear()} {content?.['business.name'] || 'The Hair Shack'}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
