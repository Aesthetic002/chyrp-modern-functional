'use client'

import { useEffect, useState } from 'react'

export default function TestPage() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...')

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`)
      .then(res => {
        if (res.ok) {
          setApiStatus('✅ Connected to API successfully!')
        } else {
          setApiStatus('❌ API connection failed: ' + res.status)
        }
      })
      .catch(error => {
        setApiStatus('❌ API connection error: ' + error.message)
      })
  }, [])

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      <div className="p-4 rounded bg-gray-800 text-white">
        {apiStatus}
      </div>
    </main>
  )
}
