import { Button } from '@/components/ui/button';
import { Blog } from '@/lib/types';
import { Calendar, Clock, Eye, Heart, Star, TrendingUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface BlogGridProps {
  blogs: Blog[];
  isLoading?: boolean;
}

interface BlogCardProps {
  blog: Blog;
  index: number;
  inView: boolean;
}

function BlogCard({ blog, index = 0, inView = true }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryConfig = (category) => {
    const configs = {
      frontend: { 
        gradient: 'from-cyan-500 via-blue-500 to-purple-600',
        icon: '⚛️',
        glow: 'shadow-cyan-500/25'
      },
      backend: { 
        gradient: 'from-emerald-500 via-green-500 to-teal-600',
        icon: '⚙️',
        glow: 'shadow-green-500/25'
      },
      architecture: { 
        gradient: 'from-violet-500 via-purple-500 to-indigo-600',
        icon: '🏗️',
        glow: 'shadow-purple-500/25'
      },
      tutorial: { 
        gradient: 'from-orange-500 via-amber-500 to-yellow-600',
        icon: '📚',
        glow: 'shadow-orange-500/25'
      },
      career: { 
        gradient: 'from-pink-500 via-rose-500 to-red-600',
        icon: '🚀',
        glow: 'shadow-pink-500/25'
      },
      opinion: { 
        gradient: 'from-yellow-500 via-amber-500 to-orange-600',
        icon: '💭',
        glow: 'shadow-yellow-500/25'
      },
      devops: { 
        gradient: 'from-red-500 via-rose-500 to-pink-600',
        icon: '🔧',
        glow: 'shadow-red-500/25'
      }
    };
    return configs[category] || { 
      gradient: 'from-slate-500 to-slate-600', 
      icon: '📝',
      glow: 'shadow-slate-500/25'
    };
  };

  const categoryConfig = getCategoryConfig(blog.category);
  const isPopular = blog.views && blog.views > 10000;
  const isTrending = blog.views && blog.views > 5000 && new Date(blog.publishedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const readArticle = () => {
    // Navigate to the blog detail page
    navigate(`/blog/${blog.slug}`);
  }

  return (
    <div className="w-full max-w-md mx-auto h-[450px] cursor-pointer" onClick={readArticle}>
      <article
        className={`
          group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl
          border border-white/20 shadow-2xl hover:shadow-4xl
          transition-all duration-700 ease-out transform-gpu
          hover:-translate-y-6 hover:rotate-1 h-full flex flex-col
          ${inView ? 'animate-in fade-in-0 slide-in-from-bottom-10 duration-1000' : ''}
          ${isHovered ? `${categoryConfig.glow} shadow-2xl` : ''}
          before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:rounded-3xl
        `}
        style={{ 
          animationDelay: `${index * 150}ms`,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* Enhanced Image Section - Fixed Height */}
        <div className="relative h-48 overflow-hidden rounded-t-3xl flex-shrink-0">
          {blog.featuredImage ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60 z-10" />
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className={`
                  w-full h-full object-cover object-center transition-all duration-1000 ease-out
                  ${isHovered ? 'scale-125 rotate-2' : 'scale-100'}
                  filter ${isHovered ? 'brightness-110 contrast-110' : ''}
                `}
              />
              <div className={`
                absolute inset-0 bg-gradient-to-br opacity-0 transition-all duration-700 z-10
                ${categoryConfig.gradient}
                ${isHovered ? 'opacity-30' : ''}
              `} />
            </>
          ) : (
            <div className={`
              w-full h-full bg-gradient-to-br flex items-center justify-center relative
              ${categoryConfig.gradient}
            `}>
              <div className="text-white text-8xl opacity-30 transform transition-transform duration-500 group-hover:scale-110">
                {categoryConfig.icon}
              </div>
            </div>
          )}

          {/* Enhanced Floating Stats */}
          <div className="absolute bottom-4 left-4 flex gap-2 z-20">
            <div className="bg-black/30 backdrop-blur-md text-white rounded-2xl px-3 py-2 text-xs flex items-center gap-2 border border-white/20 shadow-lg">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-semibold">{blog.readingTime || 0}m read</span>
            </div>
            <div className="bg-black/30 backdrop-blur-md text-white rounded-2xl px-3 py-2 text-xs flex items-center gap-2 border border-white/20 shadow-lg">
              <Eye className="h-3.5 w-3.5" />
              <span className="font-semibold">{formatViews(blog.views)}</span>
            </div>
          </div>

          {/* Enhanced Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className={`
              bg-gradient-to-r text-white border border-white/30 rounded-2xl px-4 py-2 
              text-sm font-bold flex items-center gap-2 shadow-lg backdrop-blur-sm
              ${categoryConfig.gradient}
              transform transition-all duration-300 hover:scale-105
            `}>
              <span>{categoryConfig.icon}</span>
              {blog.category ? blog.category.charAt(0).toUpperCase() + blog.category.slice(1) : 'Article'}
            </div>
          </div>

        </div>

        {/* Enhanced Content Section - Flexible Height with Fixed Structure */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Date and Author - Fixed Height */}
          <div className="flex items-center justify-between text-slate-500 text-sm mb-3 h-5">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {blog.publishedAt ? formatDate(blog.publishedAt) : 'No date'}
            </div>
            {blog.author && (
              <span className="font-medium text-slate-600">by {blog.author}</span>
            )}
          </div>

          {/* Enhanced Title - Fixed Height */}
          <div className="h-12 mb-3">
            <h3 className="text-xl font-bold text-slate-900 leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
              {blog.title || 'Untitled Article'}
            </h3>
          </div>

          {/* Enhanced Excerpt - Fixed Height */}
          <div className="h-16 mb-4">
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 transition-colors duration-300 group-hover:text-slate-700">
              {blog.excerpt || 'No description available for this article.'}
            </p>
          </div>

          {/* Enhanced Skills Tags - Fixed Height */}
          <div className="h-8 mb-4">
            <div className="flex flex-wrap gap-2">
              {blog.skills && blog.skills.length > 0 && (
                <>
                  {blog.skills.slice(0, 2).map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className={`
                        text-xs px-3 py-1.5 rounded-xl font-medium transition-all duration-300
                        bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700
                        hover:from-blue-100 hover:to-purple-100 hover:text-blue-800
                        transform hover:scale-105 hover:-translate-y-0.5 cursor-pointer
                        shadow-sm hover:shadow-md
                      `}
                      style={{ animationDelay: `${skillIndex * 100}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                  {blog.skills.length > 2 && (
                    <span className="text-xs text-slate-500 font-medium px-2 py-1">
                      +{blog.skills.length - 2} more
                    </span>
                  )}
                </>
              )} 
            </div>
          </div>
        </div>
        
        {/* Enhanced Shine Effects */}
        <div className="absolute top-0 -left-4 w-2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 group-hover:left-full transition-all duration-1000 ease-out" />
        
        {/* Magical Particles Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100
                transition-all duration-1000 delay-${i * 100}
                ${isHovered ? 'animate-ping' : ''}
              `}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
                animationDelay: `${i * 200}ms`
              }}
            />
          ))}
        </div>
      </article>
    </div>
  );
}

export function BlogGrid({ blogs, isLoading = false }: BlogGridProps) {
  const [inView, setInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-slate-200" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/4" />
              <div className="h-6 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="flex gap-2">
                <div className="h-6 bg-slate-200 rounded-full w-16" />
                <div className="h-6 bg-slate-200 rounded-full w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <TrendingUp className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
        <p className="text-slate-600 mb-6">Try adjusting your filters or search terms</p>
        <Button variant="outline" className="rounded-full">
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog, index) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          index={index}
          inView={inView}
        />
      ))}
    </div>
  );
}
