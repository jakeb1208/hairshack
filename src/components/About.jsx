import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageCol}>
          <div className={styles.imageBg}>
            <div className={styles.imageInner}>
              <div className={styles.imagePlaceholder}>
                <span>✂</span>
              </div>
            </div>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeNum}>10+</span>
            <span className={styles.badgeText}>Years of Excellence</span>
          </div>
        </div>
        <div className={styles.textCol}>
          <p className={styles.label}>Our Story</p>
          <h2 className={styles.heading}>Passion for Hair,<br />Dedication to You</h2>
          <p className={styles.body}>
            Founded in 2014, The Hair Shack was born out of a simple belief: everyone deserves
            to feel their absolute best. Nestled in the heart of the community, our boutique
            studio blends the warmth of a neighbourhood salon with the artistry of a high-end
            hair house.
          </p>
          <p className={styles.body}>
            Our team of certified stylists brings years of training and genuine passion to every
            appointment. We stay ahead of the latest trends while honouring the timeless
            techniques that make great hair last.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>5,000+</span>
              <span className={styles.statLabel}>Happy Clients</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>8</span>
              <span className={styles.statLabel}>Expert Stylists</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>4.9★</span>
              <span className={styles.statLabel}>Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
