import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>The Hair Shack</h3>
            <p className={styles.tagline}>Where Style Meets Perfection</p>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="TikTok">🎵</a>
            </div>
          </div>
          <div className={styles.col}>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#booking">Book Now</a></li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4>Contact</h4>
            <ul>
              <li>123 Main Street, Your Town</li>
              <li><a href="tel:+15550001234">(555) 000-1234</a></li>
              <li><a href="mailto:hello@thehairshack.com">hello@thehairshack.com</a></li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4>Hours</h4>
            <ul>
              <li>Mon – Fri: 9am – 7pm</li>
              <li>Saturday: 9am – 7pm</li>
              <li>Sunday: 10am – 5pm</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} The Hair Shack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
