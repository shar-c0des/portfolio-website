import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import matter from 'gray-matter'

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true)
      const baseUrl = import.meta.env.BASE_URL

      try {
        console.log(`Fetching post: ${slug}`)
        const response = await fetch(`${baseUrl}posts/${slug}.md`)
        
        if (!response.ok) {
          console.warn(`Failed to fetch ${slug}.md:`, response.status)
          setPost(null)
          setLoading(false)
          return
        }
        
        const content = await response.text()
        const { data: frontmatter, content: markdownContent } = matter(content)

        setPost({
          title: frontmatter.title ?? 'Untitled',
          date: frontmatter.date ?? '1970-01-01',
          excerpt: frontmatter.excerpt ?? '',
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          readTime: frontmatter.readTime ?? '—',
          content: markdownContent,
        })
      } catch (err) {
        console.error('Failed to load post:', err)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-400">
        Loading article…
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Article not found
      </div>
    )
  }

  const handleShare = async () => {
    if (!post) return
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || `Read "${post.title}" on my blog`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      } catch (err) {
        console.log('Failed to copy link')
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-32 px-6 max-w-3xl mx-auto">
        <Link to="/blog" className="flex items-center text-zinc-400 mb-10">
          <ArrowLeft size={16} className="mr-2" />
          Back to Blog
        </Link>

        <h1 className="text-5xl font-serif italic mb-4">{post.title}</h1>
        <p className="text-zinc-400 mb-6">{post.excerpt}</p>

        <div className="flex items-center justify-between mb-10">
          <div className="flex gap-4 text-xs text-zinc-500">
            <span className="flex items-center">
              <Calendar size={12} className="mr-1" />
              {new Date(post.date).toDateString()}
            </span>
            <span className="flex items-center">
              <Clock size={12} className="mr-1" />
              {post.readTime}
            </span>
          </div>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <Share2 size={12} />
            <span>Share</span>
          </button>
        </div>

        <article className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              code({ inline, className, children }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                  >
                    {String(children)}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-zinc-900 px-1 rounded">{children}</code>
                )
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  )
}

export default BlogPost
