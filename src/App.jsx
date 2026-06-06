import { useState, useCallback } from 'react'
import { useContent } from './hooks/useContent'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import PhotoCarousel from './components/PhotoCarousel'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'

export default function App() {
  const { content, loading, saveContent } = useContent()
  const [adminOpen, setAdminOpen] = useState(false)

  const handleBannerClick = useCallback(() => {
    setAdminOpen(true)
  }, [])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#fafafa'
      }}>
        <div style={{
          width: 40, height: 40, border: '3px solid #ffebee',
          borderTopColor: '#e53935', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </div>
    )
  }

  return (
    <>
      <Nav content={content} onBannerClick={handleBannerClick} />
      <main>
        <Hero content={content} />
        <About content={content} />
        <PhotoCarousel photos={content} />
        <Reviews />
        <Contact content={content} />
      </main>
      <Footer content={content} />
      {adminOpen && (
        <AdminPanel
          content={content}
          onSave={saveContent}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </>
  )
}
