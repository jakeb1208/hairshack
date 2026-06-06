import { useState, useEffect, useRef } from 'react'

const placeholders = [
  {
    bg: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
    label: 'Photo 1',
    icon: '✂',
  },
  {
    bg: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
    label: 'Photo 2',
    icon: '💈',
  },
  {
    bg: 'linear-gradient(135deg, #fce4ec 0%, #ef9a9a 100%)',
    label: 'Photo 3',
    icon: '✂',
  },
  {
    bg: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
    label: 'Photo 4',
    icon: '💈',
  },
  {
    bg: 'linear-gradient(135deg, #fbe9e7 0%, #ffccbc 100%)',
    label: 'Photo 5',
    icon: '✂',
  },
  {
    bg: 'linear-gradient(135deg, #fce4ec 0%, #f48fb1 100%)',
    label: 'Photo 6',
    icon: '💈',
  },
]

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const timerRef = useRef(null)

  const total = placeholders.length
  const VISIBLE = 3

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total)
    }, 3500)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const goTo = (i) => {
    setCurrent(i)
    startTimer()
  }

  const prev = () => goTo((current - 1 + total) % total)
  const next = () => goTo((current + 1) % total)

  const onDragStart = (e) => {
    setDragging(true)
    setStartX(e.clientX ?? e.touches?.[0]?.clientX)
  }

  const onDragEnd = (e) => {
    if (!dragging) return
    setDragging(false)
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX
    if (startX - endX > 40) next()
    else if (endX - startX > 40) prev()
  }

  const getSlides = () => {
    const slides = []
    for (let i = 0; i < VISIBLE; i++) {
      slides.push(placeholders[(current + i) % total])
    }
    return slides
  }

  return (
    <section style={{
      padding: '5rem 2rem',
      background: 'var(--off-white)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 300,
        background: 'radial-gradient(ellipse, rgba(229,57,53,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            display: 'inline-block',
            background: 'var(--red-pale)', color: 'var(--red)',
            borderRadius: 20, padding: '5px 14px',
            fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>Our Work</span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: 'var(--text-dark)', fontWeight: 700,
          }}>Fresh Cuts, Every Time</h2>
        </div>

        {/* Carousel track */}
        <div
          style={{ position: 'relative' }}
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onTouchStart={onDragStart}
          onTouchEnd={onDragEnd}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
            userSelect: 'none',
          }}>
            {getSlides().map((slide, i) => (
              <div
                key={`${current}-${i}`}
                style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  background: slide.bg,
                  border: '2px solid rgba(229,57,53,0.12)',
                  boxShadow: i === 1
                    ? 'var(--shadow-glow-strong)'
                    : '0 4px 20px rgba(0,0,0,0.07)',
                  transform: i === 1 ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  cursor: 'grab',
                }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem',
                  boxShadow: '0 0 16px rgba(229,57,53,0.15)',
                }}>
                  {slide.icon}
                </div>
                <span style={{
                  fontSize: '0.8rem', fontWeight: 600,
                  color: 'rgba(100,60,60,0.6)',
                  letterSpacing: '0.08em',
                }}>
                  {slide.label}
                </span>
              </div>
            ))}
          </div>

          {/* Arrow buttons */}
          <button
            onClick={prev}
            style={{
              position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)',
              width: 40, height: 40, borderRadius: '50%',
              background: '#fff', border: '2px solid var(--silver-mid)',
              color: 'var(--text-mid)', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
              transition: 'border-color 0.2s, color 0.2s',
              cursor: 'pointer', zIndex: 2,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--silver-mid)'; e.currentTarget.style.color = 'var(--text-mid)' }}
          >←</button>
          <button
            onClick={next}
            style={{
              position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
              width: 40, height: 40, borderRadius: '50%',
              background: '#fff', border: '2px solid var(--silver-mid)',
              color: 'var(--text-mid)', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
              transition: 'border-color 0.2s, color 0.2s',
              cursor: 'pointer', zIndex: 2,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--silver-mid)'; e.currentTarget.style.color = 'var(--text-mid)' }}
          >→</button>
        </div>

        {/* Dot indicators */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: 6, marginTop: '1.75rem',
        }}>
          {placeholders.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? 22 : 8, height: 8,
                borderRadius: 4, border: 'none',
                background: i === current ? 'var(--red)' : 'var(--silver-mid)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                boxShadow: i === current ? '0 0 8px rgba(229,57,53,0.4)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
