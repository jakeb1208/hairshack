import { useState, useEffect, useCallback } from 'react'

export function useContent() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch('/api/content')
      const data = await res.json()
      setContent(data)
    } catch (e) {
      console.error('Failed to load content', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchContent() }, [fetchContent])

  const saveContent = useCallback(async (updates) => {
    await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    setContent(prev => ({ ...prev, ...updates }))
  }, [])

  return { content, loading, saveContent, refetch: fetchContent }
}
