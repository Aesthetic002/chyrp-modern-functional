'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function CreatePostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')
  const { token } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      setMessage('You must be logged in to create a post.')
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, // 👈 Token is required
        },
        body: JSON.stringify({ title, content }),
      })

      if (!res.ok) {
        throw new Error('Failed to create post')
      }

      const data = await res.json()
      setMessage(`✅ Post created with ID: ${data.id}`)
      setTitle('')
      setContent('')
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`)
    }
  }

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded"
          rows={5}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  )
}
