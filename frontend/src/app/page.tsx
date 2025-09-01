'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
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

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { token, isAuthenticated } = useAuth()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers['Authorization'] = `Token ${token}`
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, {
        headers,
      })

      if (response.ok) {
        const data = await response.json()
        setPosts(data.results || data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-16 bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-black/5 p-8">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
          Welcome to Chyrp Modern
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Discover amazing stories, share your thoughts, and connect with a community of creators.
        </p>
        {isAuthenticated && (
          <Link href="/create-post" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
            ✨ Create Your First Post
          </Link>
        )}
      </div>

      {/* Call to Action for Guests */}
      {!isAuthenticated && (
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-black/5 p-8 text-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-800">Join Our Creative Community</h3>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Sign up today to share your stories, engage with posts, and connect with fellow creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started Free
              </Link>
              <Link href="/login" className="px-8 py-4 bg-white/50 hover:bg-white/70 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-all duration-300 shadow-lg hover:shadow-xl">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Posts Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold text-slate-800">Latest Stories</h2>
          {posts.length > 0 && (
            <span className="text-slate-500 bg-slate-100 px-4 py-2 rounded-full text-sm font-medium">
              {posts.length} post{posts.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-black/5 p-16 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">No posts yet</h3>
            <p className="text-lg text-slate-600">Be the first to share your story with the community.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <article 
                key={post.id} 
                className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-black/5 p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 group"
              >
                <Link href={`/posts/${post.id}`} className="block space-y-4">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 line-clamp-3 leading-relaxed">
                    {post.content.length > 120 ? post.content.substring(0, 120) + '...' : post.content}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {(post.author?.username || 'A')[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {post.author?.username || 'Anonymous'}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300 text-xl">
                      →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
