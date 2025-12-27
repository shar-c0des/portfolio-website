import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  Clock,
  Tag,
  Calendar,
  ArrowRight,
  Globe,
  PenTool,
} from 'lucide-react'
import matter from 'gray-matter'

// --- FETCH-BASED MARKDOWN LOADING (WORKS ON GITHUB PAGES) ---
const loadPosts = async () => {
  const posts = []
  const baseUrl = import.meta.env.BASE_URL
  
  // List of markdown files to load
  const postFiles = [
    'building-in-public.md',
    'design-systems.md',
    'learning-fastapi.md',
    'my-first-ar-app.md',
    'react-hooks-deep-dive.md'
  ]
  
  console.log('Loading posts from:', `${baseUrl}posts/`)
  
  // Load each markdown file via fetch
  for (const filename of postFiles) {
    try {
      const slug = filename.replace('.md', '')
      console.log(`Fetching post: ${slug}`)
      
      const response = await fetch(`${baseUrl}posts/${filename}`)
      if (!response.ok) {
        console.warn(`Failed to fetch ${filename}:`, response.status)
        continue
      }
      
      const content = await response.text()
      const { data: frontmatter, content: markdownContent } = matter(content)
      
      posts.push({
        slug,
        content: markdownContent,
        title: frontmatter.title ?? 'Untitled',
        date: frontmatter.date ?? '1970-01-01',
        excerpt: frontmatter.excerpt ?? '',
        category: frontmatter.category ?? 'general',
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        readTime: frontmatter.readTime ?? '—',
        featured: frontmatter.featured ?? false,
        image: frontmatter.image ?? '/assets/blog/default-cover.jpg'
      })
    } catch (error) {
      console.error(`Error processing post ${filename}:`, error)
    }
  }
  
  console.log('All processed posts:', posts.map(p => ({ slug: p.slug, title: p.title })))
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const loaded = await loadPosts()
      setPosts(loaded)
      setFilteredPosts(loaded)
      setLoading(false)
    }

    init()
  }, [])

  const categories = ['all', ...new Set(posts.map((p) => p.category))]
  const allTags = ['all', ...new Set(posts.flatMap((p) => p.tags))]

  useEffect(() => {
    let result = posts

    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (selectedTag !== 'all') {
      result = result.filter((p) => p.tags.includes(selectedTag))
    }

    setFilteredPosts(result)
  }, [posts, searchTerm, selectedCategory, selectedTag])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-zinc-400 text-xl"
        >
          Loading blog…
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white font-sans">
        {/* NAV */}
        <nav className="fixed top-0 w-full z-50 py-8 border-b border-white/5 bg-black">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-12 flex justify-between items-center">
            <div className="flex items-center space-x-12">
              <Link
                to="/"
                className="uppercase tracking-tight font-semibold hover:text-zinc-300"
              >
                SHARLEEN NGOMAKAPILE
              </Link>
              <div className="hidden lg:flex items-center space-x-2 text-[10px] font-mono text-zinc-500 border-l border-white/10 pl-6">
                <Globe size={12} />
                <span>CPT, SA</span>
              </div>
            </div>

            <div className="flex space-x-10 text-[11px] tracking-widest text-zinc-400">
              <Link to="/" className="hover:text-white">Portfolio</Link>
              <span className="text-white">Blog</span>
            </div>
          </div>
        </nav>

        <main className="pt-32 px-8 md:px-12">
          <div className="max-w-screen-2xl mx-auto">
            {/* HEADER */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
              <div className="flex items-center space-x-3 text-zinc-600 mb-8">
                <PenTool size={14} />
                <span className="text-[10px] font-mono tracking-[0.4em] uppercase">
                  Personal Thoughts & Process
                </span>
              </div>

              <h1 className="text-[8vw] md:text-[6vw] font-serif italic leading-[0.9] mb-8">
                Building <br />
                <span className="font-sans not-italic font-bold">in Public</span>
              </h1>

              <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl">
                Documenting the journey of learning, building, and growing as a developer.
              </p>
            </motion.div>

            {/* SEARCH */}
            <div className="mb-12 max-w-md">
              <Search size={16} className="absolute mt-3 ml-4 text-zinc-500" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>

            {/* POSTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={`/blog/${post.slug}`} className="space-y-5 block">
                    <div className="flex items-center space-x-4 text-[10px] font-mono text-zinc-500">
                      <Calendar size={10} />
                      <span>{new Date(post.date).toDateString()}</span>
                      <Clock size={10} />
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                      {post.title}
                    </h2>

                    <p className="text-zinc-400 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center space-x-2 text-sm">
                      <span>Read article</span>
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Blog
