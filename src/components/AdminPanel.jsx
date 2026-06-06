import { useState, useRef } from 'react'

const PHOTO_COUNT = 6

const SECTIONS = [
  {
    id: 'general',
    title: 'General',
    fields: [
      { key: 'business.name', label: 'Business Name', type: 'text' },
    ],
  },
  {
    id: 'hero',
    title: 'Hero Section',
    fields: [
      { key: 'hero.title', label: 'Hero Title', type: 'text' },
      { key: 'hero.subtitle', label: 'Hero Subtitle', type: 'textarea' },
      { key: 'hero.image', label: 'Hero Image URL', type: 'text', placeholder: 'https://...' },
    ],
  },
  {
    id: 'about',
    title: 'About Section',
    fields: [
      { key: 'about.title', label: 'About Title', type: 'text' },
      { key: 'about.body', label: 'About Body', type: 'textarea' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact Info',
    fields: [
      { key: 'contact.address', label: 'Address', type: 'text' },
      { key: 'contact.phone', label: 'Phone', type: 'text' },
      { key: 'contact.hours', label: 'Hours', type: 'text' },
    ],
  },
  {
    id: 'photos',
    title: 'Carousel Photos',
    fields: [],
  },
]

function resizeImage(file, maxWidth = 1200, quality = 0.82) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        let { width, height } = img
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

function PhotoSlot({ index, value, onChange }) {
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      const data = await resizeImage(file)
      onChange(data)
    } finally {
      setLoading(false)
      e.target.value = ''
    }
  }

  const hasPhoto = value && value.startsWith('data:')

  return (
    <div style={{
      border: hasPhoto ? '2px solid rgba(229,57,53,0.25)' : '2px dashed var(--silver-mid)',
      borderRadius: 12, overflow: 'hidden',
      background: hasPhoto ? '#000' : 'var(--off-white)',
      aspectRatio: '4/3',
      position: 'relative',
      transition: 'border-color 0.2s',
    }}>
      {hasPhoto ? (
        <>
          <img
            src={value}
            alt={`Photo ${index + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.92 }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            padding: '0.75rem',
            gap: '0.5rem',
          }}>
            <button
              onClick={() => inputRef.current?.click()}
              style={{
                background: 'rgba(255,255,255,0.9)', color: 'var(--text-dark)',
                border: 'none', borderRadius: 6,
                padding: '5px 10px', fontSize: '0.75rem', fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {loading ? '…' : '↑ Replace'}
            </button>
            <button
              onClick={() => onChange('')}
              style={{
                background: 'rgba(229,57,53,0.85)', color: '#fff',
                border: 'none', borderRadius: 6,
                padding: '5px 10px', fontSize: '0.75rem', fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          style={{
            width: '100%', height: '100%', background: 'none', border: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: '0.5rem', cursor: 'pointer',
            color: 'var(--text-light)',
          }}
        >
          {loading ? (
            <div style={{
              width: 28, height: 28, border: '3px solid var(--silver)',
              borderTopColor: 'var(--red)', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
          ) : (
            <>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'var(--red-pale)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.25rem',
              }}>+</div>
              <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>Photo {index + 1}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--silver-dark)' }}>Click to upload</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </div>
  )
}

export default function AdminPanel({ content, onSave, onClose }) {
  const [form, setForm] = useState({ ...content })
  const [activeSection, setActiveSection] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleChange = (key, value) => setForm(f => ({ ...f, [key]: value }))

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  const section = SECTIONS[activeSection]
  const isPhotos = section.id === 'photos'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
      animation: 'fade-in 0.2s ease',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        width: '100%', maxWidth: 880,
        maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 80px rgba(0,0,0,0.25), 0 0 40px rgba(229,57,53,0.1)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--silver)',
          background: 'linear-gradient(135deg, #fff5f5 0%, #fff 100%)',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--red)',
                boxShadow: '0 0 8px rgba(229,57,53,0.6)',
                animation: 'glow-pulse 2s ease infinite',
              }} />
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'var(--red)',
              }}>Super Admin</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-dark)',
              marginTop: 2,
            }}>Edit Website Content</h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '2px solid var(--silver)',
              background: '#fff', color: 'var(--text-mid)',
              fontSize: '1rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--silver)'; e.currentTarget.style.color = 'var(--text-mid)' }}
          >✕</button>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar */}
          <div style={{
            width: 180, borderRight: '1px solid var(--silver)',
            padding: '1rem 0', overflowY: 'auto', flexShrink: 0,
            background: '#fafafa',
          }}>
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(i)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '0.75rem 1.25rem',
                  background: activeSection === i ? 'var(--red-pale)' : 'none',
                  border: 'none',
                  borderLeft: activeSection === i ? '3px solid var(--red)' : '3px solid transparent',
                  color: activeSection === i ? 'var(--red)' : 'var(--text-mid)',
                  fontSize: '0.875rem', fontWeight: activeSection === i ? 600 : 400,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {s.id === 'photos' ? '🖼 ' : ''}{s.title}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem', fontWeight: 700,
              color: 'var(--text-dark)', marginBottom: '0.4rem',
            }}>{section.title}</h3>

            {isPhotos ? (
              <>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: '1.25rem' }}>
                  Upload up to 6 photos for the carousel. Images are automatically resized and saved to the database.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.9rem',
                }}>
                  {Array.from({ length: PHOTO_COUNT }, (_, i) => (
                    <PhotoSlot
                      key={i}
                      index={i}
                      value={form[`photo.${i}`] || ''}
                      onChange={(val) => handleChange(`photo.${i}`, val)}
                    />
                  ))}
                </div>
                <p style={{
                  marginTop: '1rem', fontSize: '0.75rem', color: 'var(--silver-dark)',
                  textAlign: 'center',
                }}>
                  Recommended: landscape photos, at least 800×600px. JPG/PNG/WebP accepted.
                </p>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginTop: '1.25rem' }}>
                {section.fields.map(field => (
                  <div key={field.key}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.75rem', fontWeight: 600,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: 'var(--text-light)', marginBottom: '0.4rem',
                    }}>{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={form[field.key] || ''}
                        onChange={e => handleChange(field.key, e.target.value)}
                        rows={3}
                        placeholder={field.placeholder || ''}
                        style={{
                          width: '100%', padding: '0.75rem',
                          border: '1.5px solid var(--silver)',
                          borderRadius: 8, fontSize: '0.9rem',
                          color: 'var(--text-dark)',
                          fontFamily: 'var(--font-sans)',
                          resize: 'vertical', lineHeight: 1.6,
                          transition: 'border-color 0.2s',
                          outline: 'none',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(229,57,53,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'var(--silver)'}
                      />
                    ) : (
                      <input
                        type="text"
                        value={form[field.key] || ''}
                        onChange={e => handleChange(field.key, e.target.value)}
                        placeholder={field.placeholder || ''}
                        style={{
                          width: '100%', padding: '0.75rem',
                          border: '1.5px solid var(--silver)',
                          borderRadius: 8, fontSize: '0.9rem',
                          color: 'var(--text-dark)',
                          fontFamily: 'var(--font-sans)',
                          transition: 'border-color 0.2s',
                          outline: 'none',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(229,57,53,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'var(--silver)'}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          gap: '0.75rem', padding: '1rem 1.75rem',
          borderTop: '1px solid var(--silver)',
          background: '#fafafa', flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.65rem 1.5rem', borderRadius: 8,
              border: '1.5px solid var(--silver)',
              background: '#fff', color: 'var(--text-mid)',
              fontSize: '0.875rem', fontWeight: 600,
              transition: 'border-color 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--silver-dark)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--silver)'}
          >Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '0.65rem 1.75rem', borderRadius: 8,
              border: 'none',
              background: saved ? '#4caf50' : 'var(--red)',
              color: '#fff',
              fontSize: '0.875rem', fontWeight: 700,
              boxShadow: saved ? '0 0 16px rgba(76,175,80,0.4)' : 'var(--shadow-glow)',
              transition: 'background 0.3s, box-shadow 0.3s',
              opacity: saving ? 0.7 : 1,
              minWidth: 130, cursor: 'pointer',
            }}
          >
            {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
