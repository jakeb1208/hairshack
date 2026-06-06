import { useState, useEffect, useRef } from 'react'

export default function Nav({ content, onBannerClick }) {
  const [scrolled, setScrolled] = useState(false)
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
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: scrolled ? 64 : 76,
        transition: 'height 0.3s ease',
      }}>
        <button
          onClick={handleBannerClick}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontFamily: 'var(--font-serif)', fontSize: '1.6rem',
            fontWeight: 700, color: 'var(--red)',
            textShadow: '0 0 20px rgba(229,57,53,0.3)',
            transition: 'text-shadow 0.3s',
            userSelect: 'none',
          }}
          title="Hair Shack"
        >
          {content?.['business.name'] || 'The Hair Shack'}
        </button>
      </div>
    </nav>
  )
}
