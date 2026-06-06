import { useState } from 'react'

const SECTIONS = [
  {
    title: 'General',
    fields: [
      { key: 'business.name', label: 'Business Name', type: 'text' },
    ],
  },
  {
    title: 'Hero Section',
    fields: [
      { key: 'hero.title', label: 'Hero Title', type: 'text' },
      { key: 'hero.subtitle', label: 'Hero Subtitle', type: 'textarea' },
      { key: 'hero.cta', label: 'Button Text', type: 'text' },
      { key: 'hero.image', label: 'Hero Image URL', type: 'text', placeholder: 'https://...' },
    ],
  },
  {
    title: 'About Section',
    fields: [
      { key: 'about.title', label: 'About Title', type: 'text' },
      { key: 'about.body', label: 'About Body', type: 'textarea' },
    ],
  },
  {
    title: 'Contact Info',
    fields: [
      { key: 'contact.address', label: 'Address', type: 'text' },
      { key: 'contact.phone', label: 'Phone', type: 'text' },
      { key: 'contact.hours', label: 'Hours', type: 'text' },
    ],
  },
  {
    title: 'Services',
    fields: [0,1,2,3,4,5].flatMap(i => [
      { key: `services.${i}.name`, label: `Service ${i+1} Name`, type: 'text' },
      { key: `services.${i}.desc`, label: `Service ${i+1} Description`, type: 'textarea' },
      { key: `services.${i}.price`, label: `Service ${i+1} Price`, type: 'text' },
    ]),
  },
]

export default function AdminPanel({ content, onSave, onClose }) {
  const [form, setForm] = useState({ ...content })
  const [activeSection, setActiveSection] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleChange = (key, value) => {
    setForm(f => ({ ...f, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  const section = SECTIONS[activeSection]

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
        width: '100%', maxWidth: 860,
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
                key={s.title}
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
                {s.title}
              </button>
            ))}
          </div>

          {/* Form area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem', fontWeight: 700,
              color: 'var(--text-dark)', marginBottom: '1.25rem',
            }}>{section.title}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
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
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--silver-dark)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--silver)'}
          >
            Cancel
          </button>
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
              minWidth: 120,
            }}
          >
            {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
