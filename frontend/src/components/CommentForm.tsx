'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

interface CommentFormProps {
  postId: number;
  onCommentAdded: () => void;
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { token, isAuthenticated } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) {
      setError('Please enter a comment')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
          content: content.trim(),
          post: postId,
        }),
      })

      if (response.ok) {
        setContent('')
        onCommentAdded()
      } else {
        const data = await response.json()
        setError(data.detail || 'Failed to post comment')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-700">
          Please <Link href="/login" className="underline hover:text-blue-900">login</Link> to post a comment.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Add a Comment</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-vertical"
          rows={4}
          required
        />
        <div className="mt-3">
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>
    </div>
  )
}
