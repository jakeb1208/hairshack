import styles from './Gallery.module.css'

const items = [
  { label: 'Balayage', bg: '#3d2b1f' },
  { label: 'Precision Cut', bg: '#1f2d3d' },
  { label: 'Colour Transform', bg: '#2d1f3d' },
  { label: 'Bridal Updo', bg: '#3d1f1f' },
  { label: 'Men\'s Fade', bg: '#1f3d2b' },
  { label: 'Highlights', bg: '#3d3d1f' },
]

export default function Gallery() {
  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Our Work</p>
        <h2 className={styles.heading}>Recent Transformations</h2>
        <div className={styles.grid}>
          {items.map((item, i) => (
            <div
              key={i}
              className={styles.item}
              style={{ '--item-bg': item.bg }}
            >
              <div className={styles.itemInner}>
                <div className={styles.placeholder}>
                  <span>✂</span>
                </div>
                <div className={styles.overlay}>
                  <span className={styles.itemLabel}>{item.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
