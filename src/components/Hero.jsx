import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.tagline}>Premium Hair Studio</p>
        <h1 className={styles.title}>Where Style<br />Meets Perfection</h1>
        <p className={styles.sub}>
          Expert cuts, colour, and styling in a relaxed, boutique environment.<br />
          Walk in looking good — walk out feeling extraordinary.
        </p>
        <div className={styles.actions}>
          <a href="#booking" className={styles.btnPrimary}>Book Your Appointment</a>
          <a href="#services" className={styles.btnSecondary}>Our Services</a>
        </div>
      </div>
      <div className={styles.scroll}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
