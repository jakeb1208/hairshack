import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
  ]

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.logo}>The Hair Shack</a>
      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {links.map(l => (
          <li key={l.label}>
            <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#booking" className={styles.cta} onClick={() => setMenuOpen(false)}>Book Now</a>
        </li>
      </ul>
      <button
        className={`${styles.burger} ${menuOpen ? styles.active : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
