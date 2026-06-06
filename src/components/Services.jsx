import styles from './Services.module.css'

const services = [
  {
    icon: '✂️',
    name: 'Precision Cut',
    desc: 'A bespoke cut tailored to your face shape, lifestyle, and personal style.',
    price: 'From $65',
  },
  {
    icon: '🎨',
    name: 'Colour & Highlights',
    desc: 'Full colour, balayage, ombre, and foil highlights using premium products.',
    price: 'From $120',
  },
  {
    icon: '✨',
    name: 'Blowout & Style',
    desc: 'A luxurious blowout that leaves your hair smooth, voluminous, and glossy.',
    price: 'From $55',
  },
  {
    icon: '💆',
    name: 'Treatment & Repair',
    desc: 'Deep conditioning and Olaplex treatments that restore strength and shine.',
    price: 'From $45',
  },
  {
    icon: '👰',
    name: 'Bridal Styling',
    desc: 'Complete bridal packages including trials, updos, and on-the-day styling.',
    price: 'From $200',
  },
  {
    icon: '🧔',
    name: 'Men\'s Grooming',
    desc: 'Classic cuts, fades, beard trims, and hot-towel shaves for the modern man.',
    price: 'From $45',
  },
]

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>What We Offer</p>
        <h2 className={styles.heading}>Our Services</h2>
        <div className={styles.grid}>
          {services.map(s => (
            <div key={s.name} className={styles.card}>
              <div className={styles.icon}>{s.icon}</div>
              <h3 className={styles.name}>{s.name}</h3>
              <p className={styles.desc}>{s.desc}</p>
              <p className={styles.price}>{s.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
