import { useState, useEffect, useRef } from 'react'

export default function Nav({ content, onBannerClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const clickCount = useRef(0)
  const clickTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleBannerClick = () => {
    clickCount.current += 1
    if (clickTimer.current) clearTimeout(clickTimer.current)
    if (clickCount.current >= 5) {
      clickCount.current = 0
      onBannerClick()
    } else {
      clickTimer.current = setTimeout(() => { clickCount.current = 0 }, 1500)
    }
  }

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      boxShadow: scrolled ? '0 2px 24px rgba(229,57,53,0.08), 0 1px 0 #eceff1' : 'none',
      transition: 'all 0.35s ease',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: scrolled ? 64 : 76,
        transition: 'height 0.3s ease',
      }}>
        <button
          onClick={handleBannerClick}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontFamily: 'var(--font-serif)', fontSize: '1.5rem',
            fontWeight: 700, color: 'var(--red)',
            textShadow: '0 0 20px rgba(229,57,53,0.3)',
            transition: 'text-shadow 0.3s',
            userSelect: 'none',
          }}
          title="Hair Shack"
        >
          {content?.['business.name'] || 'The Hair Shack'}
        </button>

        <ul style={{
          display: 'flex', alignItems: 'center', gap: '2rem',
          listStyle: 'none',
          ...(menuOpen ? {} : {}),
        }} className="nav-links">
          {links.map(l => (
            <li key={l.label} style={{ display: window.innerWidth < 768 ? 'none' : 'block' }}>
              <a
                href={l.href}
                style={{
                  fontSize: '0.875rem', fontWeight: 500,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: 'var(--text-mid)',
                  transition: 'color 0.2s',
                  padding: '4px 0',
                  borderBottom: '2px solid transparent',
                }}
                onMouseEnter={e => {
                  e.target.style.color = 'var(--red)'
                  e.target.style.borderBottomColor = 'var(--red)'
                }}
                onMouseLeave={e => {
                  e.target.style.color = 'var(--text-mid)'
                  e.target.style.borderBottomColor = 'transparent'
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li style={{ display: window.innerWidth < 768 ? 'none' : 'block' }}>
            <a
              href="#contact"
              style={{
                background: 'var(--red)', color: '#fff',
                padding: '0.55rem 1.3rem',
                borderRadius: 6,
                fontSize: '0.875rem', fontWeight: 600,
                boxShadow: '0 0 16px rgba(229,57,53,0.3)',
                transition: 'box-shadow 0.3s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.target.style.boxShadow = '0 0 28px rgba(229,57,53,0.5)'
                e.target.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.target.style.boxShadow = '0 0 16px rgba(229,57,53,0.3)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              Book Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
