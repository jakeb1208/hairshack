import { useState } from 'react'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Regular Client',
    quote: 'I\'ve been coming to The Hair Shack for three years and I wouldn\'t go anywhere else. The team just *gets* what I want every single time.',
    stars: 5,
  },
  {
    name: 'James T.',
    role: 'Bridal Client',
    quote: 'They did my entire wedding party\'s hair and every single one of us looked incredible. Couldn\'t have asked for a better experience.',
    stars: 5,
  },
  {
    name: 'Priya K.',
    role: 'Colour Client',
    quote: 'Finally found someone who can do my balayage perfectly. The colour lasts months and the condition of my hair has never been better.',
    stars: 5,
  },
  {
    name: 'Marcus R.',
    role: 'Men\'s Grooming',
    quote: 'Best fade I\'ve ever had. Quick, professional, and the beard trim was immaculate. This is my spot now.',
    stars: 5,
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive(a => (a + 1) % testimonials.length)

  const t = testimonials[active]

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Client Love</p>
        <h2 className={styles.heading}>What Our Clients Say</h2>
        <div className={styles.card}>
          <div className={styles.stars}>{'★'.repeat(t.stars)}</div>
          <blockquote className={styles.quote}>"{t.quote}"</blockquote>
          <div className={styles.author}>
            <div className={styles.avatar}>{t.name[0]}</div>
            <div>
              <p className={styles.name}>{t.name}</p>
              <p className={styles.role}>{t.role}</p>
            </div>
          </div>
        </div>
        <div className={styles.controls}>
          <button onClick={prev} className={styles.btn} aria-label="Previous">←</button>
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.activeDot : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className={styles.btn} aria-label="Next">→</button>
        </div>
      </div>
    </section>
  )
}
