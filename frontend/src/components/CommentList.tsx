'use client'

import { useEffect, useState } from 'react'

interface Comment {
  id: number;
  content: string;
  author: {
    id: number;
    username: string;
  } | null;
  created_at: string;
  status: string;
  post: number;
}

interface CommentListProps {
  postId: number;
}

export default function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/?post=${postId}`)
      
      if (response.ok) {
        const data = await response.json()
        const commentList = Array.isArray(data) ? data : data.results || []
        setComments(commentList)
      } else {
        setError('Failed to load comments')
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
      setError('Network error loading comments')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-gray-500">Loading comments...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">
        Comments ({comments.length})
      </h3>
      
      {comments.length === 0 ? (
        <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 mb-2">{comment.content}</p>
              <div className="text-sm text-gray-500">
                By <span className="font-medium">{comment.author?.username || 'Anonymous'}</span> • {new Date(comment.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
