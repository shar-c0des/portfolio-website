import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Clock, 
  Tag, 
  Calendar, 
  ArrowRight,
  PenTool,
  Globe,
  Home
} from 'lucide-react';
import matter from 'gray-matter';

// Dynamic import all markdown files from posts directory
const postModules = import.meta.glob('../posts/*.md', { as: 'raw', eager: true });

// Function to load all markdown posts automatically
const loadPosts = async () => {
  console.log('Available post files:', Object.keys(postModules));
  
  const posts = [];
  
  // Loop through all dynamically imported markdown files
  for (const [path, content] of Object.entries(postModules)) {
    try {
      // Extract filename from path (e.g., '../posts/my-first-ar-app.md' -> 'my-first-ar-app')
      const filename = path.split('/').pop().replace('.md', '');
      const slug = filename;
      console.log(`Processing post: ${slug}`);
      
      const { data: frontmatter, content: markdownContent } = matter(content);
      
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
      });
    } catch (error) {
      console.error(`Error processing post ${path}:`, error);
    }
  }
  
  console.log('All processed posts:', posts.map(p => ({ slug: p.slug, title: p.title })));
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        console.log('Starting to load blog posts...');
        const loadedPosts = await loadPosts();
        console.log('Posts loaded in useEffect:', loadedPosts);
        setPosts(loadedPosts);
        setFilteredPosts(loadedPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        // Fallback to empty array or error handling
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Extract unique categories and tags
  const categories = ['all', ...new Set(posts.map(post => post.category))];
  const allTags = ['all', ...new Set(posts.flatMap(post => post.tags))];

  // Filter posts based on search term, category, and tag
  useEffect(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (selectedTag !== 'all') {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory, selectedTag]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl font-light text-zinc-400"
        >
          Loading blog...
        </motion.div>
      </div>
    );
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

      <div className="min-h-screen bg-[#000000] text-white antialiased font-sans">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 py-8 bg-transparent border-b border-white/5">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-12 flex justify-between items-center">
            <div className="flex items-center space-x-12">
              <Link to="/" className="text-lg font-semibold tracking-tight uppercase hover:text-zinc-300 transition-colors">
                SHARLEEN NGOMAKAPILE
              </Link>
              <div className="hidden lg:flex items-center space-x-6 border-l border-white/10 pl-12 h-6">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500">
                  <Globe size={12} />
                  <span>CPT, SA</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-10 text-[11px] font-medium tracking-widest text-zinc-400 uppercase">
              <Link to="/" className="hover:text-white transition-colors duration-300 flex items-center space-x-1">
                <Home size={12} />
                <span>Portfolio</span>
              </Link>
              <div className="hover:text-white transition-colors duration-300 flex items-center space-x-1">
                <PenTool size={12} />
                <span>Blog</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-32 px-8 md:px-12">
          <div className="max-w-screen-2xl mx-auto">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-20"
            >
              <div className="flex items-center space-x-3 text-zinc-600 mb-8">
                <PenTool size={14} />
                <span className="text-[10px] font-mono tracking-[0.4em] uppercase">Personal Thoughts & Process</span>
              </div>
              <h1 className="text-[8vw] md:text-[6vw] font-serif italic tracking-tighter leading-[0.9] mb-8">
                Building <br />
                <span className="font-sans not-italic font-bold tracking-tighter text-white">in Public</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl">
                Documenting the journey of learning, building, and growing as a developer. 
                From technical deep-dives to personal insights.
              </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16 space-y-6"
            >
              {/* Search */}
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase rounded-sm transition-all ${
                      selectedCategory === category
                        ? 'bg-white text-black'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Tag Filter */}
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 text-[9px] font-mono tracking-widest uppercase rounded border transition-all flex items-center space-x-1 ${
                      selectedTag === tag
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <Tag size={8} />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Posts Grid */}
            {console.log('Rendering posts:', filteredPosts)}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="space-y-6">
                      {/* Post Header */}
                      <div className="flex items-center space-x-4 text-[10px] font-mono text-zinc-500">
                        <div className="flex items-center space-x-1">
                          <Calendar size={10} />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={10} />
                          <span>{post.readTime}</span>
                        </div>
                        <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[8px] uppercase tracking-widest">
                          {post.category}
                        </span>
                      </div>

                      {/* Post Title */}
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-zinc-300 transition-colors leading-tight">
                        {post.title}
                      </h2>

                      {/* Post Excerpt */}
                      <p className="text-zinc-400 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Post Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-[8px] font-mono tracking-widest text-zinc-500 border border-zinc-800 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <div className="flex items-center space-x-3 text-white group-hover:text-zinc-300 transition-colors">
                        <span className="text-sm font-medium tracking-wide">Read Article</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-xl text-zinc-500 mb-4">No posts found</p>
                <p className="text-zinc-600">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Blog;