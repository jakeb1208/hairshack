import { useState } from 'react'
import styles from './Booking.module.css'

export default function Booking() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="booking" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textCol}>
          <p className={styles.label}>Ready to Transform?</p>
          <h2 className={styles.heading}>Book Your Appointment</h2>
          <p className={styles.body}>
            Fill in the form and we'll confirm your booking within 24 hours.
            Prefer to call? Reach us at <a href="tel:+15550001234" className={styles.phone}>(555) 000-1234</a>.
          </p>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <p className={styles.infoLabel}>Location</p>
                <p>123 Main Street, Your Town</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🕐</span>
              <div>
                <p className={styles.infoLabel}>Hours</p>
                <p>Mon–Sat: 9am – 7pm</p>
                <p>Sun: 10am – 5pm</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formCol}>
          {submitted ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3>Booking Request Received!</h3>
              <p>Thank you, {form.name}. We'll be in touch within 24 hours to confirm your appointment.</p>
              <button onClick={() => setSubmitted(false)} className={styles.reset}>Book Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name">Full Name *</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Jane Smith" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email *</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="service">Service *</label>
                  <select id="service" name="service" required value={form.service} onChange={handleChange}>
                    <option value="">Select a service</option>
                    <option>Precision Cut</option>
                    <option>Colour & Highlights</option>
                    <option>Blowout & Style</option>
                    <option>Treatment & Repair</option>
                    <option>Bridal Styling</option>
                    <option>Men's Grooming</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="date">Preferred Date *</label>
                <input id="date" name="date" type="date" required value={form.date} onChange={handleChange} />
              </div>
              <div className={styles.field}>
                <label htmlFor="notes">Additional Notes</label>
                <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={handleChange} placeholder="Anything we should know..." />
              </div>
              <button type="submit" className={styles.submit}>Request Appointment</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
