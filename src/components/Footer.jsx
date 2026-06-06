export default function Footer({ content }) {
  return (
    <footer style={{
      background: 'var(--text-dark)',
      color: 'rgba(255,255,255,0.7)',
      padding: '3rem 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '3rem', alignItems: 'start',
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
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 320 }}>
              Your trusted neighborhood barber shop in Mandeville, LA. Proudly serving the community for over 20 years.
            </p>
          </div>

          <div>
            <h4 style={{
              color: '#fff', fontSize: '0.8rem',
              fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: '1rem',
            }}>Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li>4061 LA-59, Mandeville, LA 70471</li>
              <li style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', display: 'block' }}>Monday: Closed</span>
                <span style={{ color: 'rgba(255,255,255,0.9)' }}>Tuesday – Saturday: 9am – 6pm</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', display: 'block' }}>Sunday: Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
