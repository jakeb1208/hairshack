import { useState } from 'react'

const reviews = [
  {
    name: 'Andrew Carter',
    rating: 5,
    text: 'Not only were Duc and Tran incredibly friendly, but their skills as hairstylists were truly exceptional. They listened attentively to my preferences and offered valuable suggestions to enhance my desired look. Their attention to detail and precision in their work were truly remarkable.',
    date: '2 years ago',
  },
  {
    name: 'Mr Sid',
    rating: 5,
    text: "Duc and Tran were the friendliest barbers I've ever met. Not to mention, did awesome on my hair and even my 8yr old daughter got a trim. I was pleasantly surprised.",
    date: '2 years ago',
  },
  {
    name: 'Erica Delacruz',
    rating: 5,
    text: '1st time visit to Hair Shack and we loved it! Duc was so friendly and was so good with my son. We will be back with the rest of clan next time. Highly recommend for boy haircuts.',
    date: '1 year ago',
  },
  {
    name: 'Ariel Gonzalez',
    rating: 5,
    text: "Tran has been cutting my son's hair since he was little and when Tran's not there, Duc does it. They are great!!",
    date: '2 years ago',
  },
  {
    name: 'Laci Matise',
    rating: 5,
    text: "I took my son here for a haircut. First time at this place. I was absolutely amazed. They knew everyone by name and were so friendly. Duc cut my son's hair perfectly and talked to him the whole time. The price was way cheaper than I have ever paid for this quality.",
    date: '4 years ago',
  },
  {
    name: 'Ricky K',
    rating: 5,
    text: 'Duc and Tran are some of the finest neighbors we could have ever asked for and they also cut me, my wife and son\'s hair and we are always happy with their work. Very fine people that believe in earning a living through honesty and a hard day\'s work!',
    date: '3 years ago',
  },
]

function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{
          color: i <= rating ? '#e53935' : '#eceff1',
          fontSize: '1rem',
          textShadow: i <= rating ? '0 0 6px rgba(229,57,53,0.4)' : 'none',
        }}>★</span>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [active, setActive] = useState(0)

  return (
    <section id="reviews" style={{
      padding: '6rem 2rem',
      background: 'linear-gradient(160deg, #fff5f5 0%, var(--off-white) 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(229,57,53,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            display: 'inline-block',
            background: 'var(--red-pale)', color: 'var(--red)',
            borderRadius: 20, padding: '5px 14px',
            fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>Client Love</span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--text-dark)', fontWeight: 700,
            marginBottom: '0.5rem',
          }}>What Our Clients Say</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
            106 Google reviews · 4.9★ average
          </p>
        </div>

        {/* Main review card */}
        <div style={{
          background: '#fff',
          borderRadius: 16, padding: '2.5rem 3rem',
          border: '2px solid rgba(229,57,53,0.12)',
          boxShadow: 'var(--shadow-glow-strong)',
          marginBottom: '2rem',
          transition: 'all 0.3s',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--red), #ff6b6b)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: 'var(--font-serif)',
                fontWeight: 700, fontSize: '1.1rem',
                boxShadow: '0 0 12px rgba(229,57,53,0.3)',
              }}>
                {reviews[active].name[0]}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '1rem' }}>
                  {reviews[active].name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                  {reviews[active].date} · Google Review
                </div>
              </div>
            </div>
            <Stars rating={reviews[active].rating} />
          </div>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem', lineHeight: 1.8,
            color: 'var(--text-mid)', fontStyle: 'italic',
          }}>
            "{reviews[active].text}"
          </p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={() => setActive(a => (a - 1 + reviews.length) % reviews.length)}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '2px solid var(--silver-mid)',
              background: '#fff', color: 'var(--text-mid)',
              fontSize: '1rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--silver-mid)'; e.currentTarget.style.color = 'var(--text-mid)' }}
          >←</button>

          <div style={{ display: 'flex', gap: 6 }}>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 24 : 8, height: 8,
                  borderRadius: 4, border: 'none',
                  background: i === active ? 'var(--red)' : 'var(--silver-mid)',
                  transition: 'all 0.3s',
                  boxShadow: i === active ? '0 0 8px rgba(229,57,53,0.4)' : 'none',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setActive(a => (a + 1) % reviews.length)}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '2px solid var(--silver-mid)',
              background: '#fff', color: 'var(--text-mid)',
              fontSize: '1rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--silver-mid)'; e.currentTarget.style.color = 'var(--text-mid)' }}
          >→</button>
        </div>

        {/* Mini cards row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem', marginTop: '2rem',
        }}>
          {reviews.slice(0, 3).map((r, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? 'var(--red-pale)' : '#fff',
                border: active === i ? '2px solid rgba(229,57,53,0.3)' : '2px solid var(--silver)',
                borderRadius: 10, padding: '1rem',
                textAlign: 'left', cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: active === i ? '0 0 12px rgba(229,57,53,0.12)' : 'none',
              }}
            >
              <Stars rating={r.rating} />
              <div style={{
                fontSize: '0.8rem', color: 'var(--text-light)',
                marginTop: 6, lineHeight: 1.4,
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>"{r.text}"</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-mid)', marginTop: 6 }}>
                — {r.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
