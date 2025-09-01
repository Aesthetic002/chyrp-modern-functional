'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="glass-card sticky top-0 z-50 mx-4 mt-4 rounded-2xl">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              Chyrp Modern
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link href="/create-post" className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-300">
                  Create Post
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-secondary-500 text-sm">
                    Welcome, <span className="font-medium text-secondary-700">{user?.username}</span>
                  </span>
                  <button
                    onClick={logout}
                    className="text-secondary-500 hover:text-red-500 font-medium transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="btn-secondary">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary-200">
            {isAuthenticated ? (
              <div className="space-y-3">
                <Link href="/create-post" className="block py-2 text-secondary-600 hover:text-primary-600 font-medium">
                  Create Post
                </Link>
                <div className="py-2">
                  <span className="text-secondary-500 text-sm">Welcome, {user?.username}</span>
                </div>
                <button onClick={logout} className="block py-2 text-red-500 font-medium">
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/login" className="block btn-secondary text-center">
                  Login
                </Link>
                <Link href="/register" className="block btn-primary text-center">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
