import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  PenTool,
  Globe,
  Home,
  Share2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import matter from 'gray-matter';

// Dynamic import all markdown files from posts directory
const postModules = import.meta.glob('../posts/*.md', { as: 'raw', eager: true });

// Function to load post by slug
const loadPostBySlug = async (slug) => {
  console.log('Looking for post with slug:', slug);
  console.log('Available posts:', Object.keys(postModules));
  
  // Find the matching post file
  for (const [path, content] of Object.entries(postModules)) {
    const filename = path.split('/').pop().replace('.md', '');
    console.log(`Checking ${filename} against ${slug}`);
    
    if (filename === slug) {
      console.log('Found matching post!');
      try {
        const { data: frontmatter, content: markdownContent } = matter(content);
        console.log('Frontmatter:', frontmatter);
        console.log('Content length:', markdownContent.length);
        
        return {
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
        };
      } catch (error) {
        console.error(`Error processing post ${slug}:`, error);
      }
    }
  }
  
  console.log('No matching post found');
  return null;
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        const foundPost = await loadPostBySlug(slug);
        setPost(foundPost);
      } catch (error) {
        console.error('Error loading blog post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl font-light text-zinc-400"
        >
          Loading article...
        </motion.div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-zinc-400 mb-8">The article you're looking for doesn't exist.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center space-x-2 text-white hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        .prose-custom {
          color: #e4e4e7;
          line-height: 1.8;
        }
        
        .prose-custom h1,
        .prose-custom h2,
        .prose-custom h3,
        .prose-custom h4,
        .prose-custom h5,
        .prose-custom h6 {
          color: #ffffff;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-family: 'Playfair Display', serif;
        }
        
        .prose-custom h1 { font-size: 2.5rem; line-height: 1.2; }
        .prose-custom h2 { font-size: 2rem; line-height: 1.3; }
        .prose-custom h3 { font-size: 1.75rem; line-height: 1.4; }
        .prose-custom h4 { font-size: 1.5rem; line-height: 1.4; }
        
        .prose-custom p {
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }
        
        .prose-custom a {
          color: #ffffff;
          text-decoration: underline;
          text-decoration-color: rgba(255, 255, 255, 0.3);
          transition: text-decoration-color 0.2s;
        }
        
        .prose-custom a:hover {
          text-decoration-color: #ffffff;
        }
        
        .prose-custom ul,
        .prose-custom ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .prose-custom li {
          margin-bottom: 0.5rem;
        }
        
        .prose-custom code {
          background-color: rgba(255, 255, 255, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.9rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
        
        .prose-custom pre {
          background-color: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
        }
        
        .prose-custom blockquote {
          border-left: 4px solid rgba(255, 255, 255, 0.3);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #d4d4d8;
        }
        
        .prose-custom strong {
          color: #ffffff;
          font-weight: 600;
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
              <Link to="/blog" className="hover:text-white transition-colors duration-300 flex items-center space-x-1">
                <PenTool size={12} />
                <span>Blog</span>
              </Link>
            </div>
          </div>
        </nav>

        <main className="pt-32 px-8 md:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-12"
            >
              <Link 
                to="/blog" 
                className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium tracking-wide">Back to Blog</span>
              </Link>
            </motion.div>

            {/* Article Header */}
            <motion.header 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              {/* Meta Information */}
              <div className="flex items-center space-x-4 text-[10px] font-mono text-zinc-500 mb-8">
                <div className="flex items-center space-x-1">
                  <Calendar size={10} />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
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

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-serif italic tracking-tighter leading-[0.9] mb-8">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-[9px] font-mono tracking-widest text-zinc-500 border border-zinc-800 rounded flex items-center space-x-1">
                    <Tag size={8} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Share Button */}
              <button className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors">
                <Share2 size={16} />
                <span className="text-sm font-medium">Share Article</span>
              </button>
            </motion.header>

            {/* Article Content */}
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose-custom prose-custom-lg mb-20"
            >
              <ReactMarkdown
                components={{
                  img({src, alt, ...props}) {
                    return (
                      <div className="my-8">
                        <img 
                          src={src} 
                          alt={alt} 
                          className="w-full rounded-lg border border-zinc-800 shadow-lg"
                          loading="lazy"
                          {...props}
                        />
                        {alt && (
                          <p className="text-sm text-zinc-500 text-center mt-2 italic">
                            {alt}
                          </p>
                        )}
                      </div>
                    );
                  },
                  code({inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-lg border border-zinc-800"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-zinc-900 px-2 py-1 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {post.content}
              </ReactMarkdown>
            </motion.article>

            {/* Article Footer */}
            <motion.footer 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border-t border-zinc-800 pt-12 pb-20"
            >
              <div className="flex items-center justify-between">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium tracking-wide">Back to Blog</span>
                </Link>
                
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </motion.footer>
          </div>
        </main>
      </div>
    </>
  );
};

export default BlogPost;