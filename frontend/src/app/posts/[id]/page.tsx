'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import CommentList from '@/components/CommentList'
import CommentForm from '@/components/CommentForm'
import Link from 'next/link'

interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    username: string;
  } | null;
  created_at: string;
  status: string;
}

export default function PostDetailPage() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [commentRefresh, setCommentRefresh] = useState(0)

  const postId = params?.id ? parseInt(params.id as string, 10) : null

  useEffect(() => {
    if (!postId) {
      setError('Invalid post ID')
      setLoading(false)
      return
    }

    async function fetchPost() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/`)
        if (response.ok) {
          const data: Post = await response.json()
          setPost(data)
        } else if (response.status === 404) {
          setError('Post not found')
        } else {
          setError('Failed to fetch post')
        }
      } catch (e) {
        setError('Network error')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  const handleCommentAdded = () => {
    setCommentRefresh((prev) => prev + 1)
  }

  if (loading) return <div className="text-center">Loading post...</div>
  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Link href="/" className="text-blue-600 hover:text-blue-800">← Back to Home</Link>
      </div>
    )
  }

  if (!postId) {
    return (
      <div className="text-center">
        <p className="text-red-600 mb-4">Invalid post ID</p>
        <Link href="/" className="text-blue-600 hover:text-blue-800">← Back to Home</Link>
      </div>
    )
  }

  if (!post) {
    return <div className="text-center">Post not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="mb-4">
        <Link href="/" className="text-blue-600 hover:text-blue-800">← Back to Home</Link>
      </nav>

      <article className="bg-white p-6 rounded-lg shadow-md border">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-4">
          By {post.author?.username || 'Anonymous'} • {new Date(post.created_at).toLocaleDateString()}
        </div>
        <div className="text-gray-800 whitespace-pre-wrap">{post.content}</div>
      </article>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md border">
        <CommentList postId={postId} key={commentRefresh} />
        <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
      </div>
    </div>
  )
}
