import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Eye, ArrowRight, Bookmark, Share2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Blog } from '@/lib/types';
import { cn } from '@/lib/utils';

interface EnhancedFeaturedArticleProps {
  blog: Blog;
}

export function EnhancedFeaturedArticle({ blog }: EnhancedFeaturedArticleProps) {
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatViews = (views?: number) => {
    if (!views) return '0';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="container mx-auto px-4 py-24 relative overflow-hidden"
    >
      {/* Section header */}
      <div className={cn(
        "text-center mb-16",
        isInView && "animate-in fade-in-0 slide-in-from-top-10"
      )} style={{ animationDelay: '200ms' }}>
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-orange-200/50">
          <TrendingUp className="h-4 w-4" />
          Featured Article
          <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Editor's Pick
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Handpicked content that showcases cutting-edge techniques and insights
        </p>
      </div>

      {/* Featured article card */}
      <div className={cn(
        "max-w-6xl mx-auto",
        isInView && "animate-in fade-in-0 slide-in-from-bottom-10"
      )} style={{ animationDelay: '400ms' }}>
        <article
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)
              `,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-0 relative">
            {/* Image section */}
            <div className="relative h-80 lg:h-full overflow-hidden">
              {blog.featuredImage && (
                <>
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700",
                      isHovered && "scale-110"
                    )}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </>
              )}

              {/* Floating stats */}
              <div className="absolute top-6 left-6 flex gap-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2 shadow-lg">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-900">
                    {formatViews(blog.views)}
                  </span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2 shadow-lg">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-slate-900">
                    {blog.readingTime}m
                  </span>
                </div>
              </div>

              {/* Skills badges */}
              <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                {blog.skills.slice(0, 3).map((skill, index) => (
                  <Badge 
                    key={skill} 
                    className={cn(
                      "bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300",
                      isInView && "animate-in fade-in-0 slide-in-from-left-5"
                    )}
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Content section */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              {/* Category and date */}
              <div className="flex items-center justify-between mb-6">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2 text-sm font-semibold">
                  {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
                </Badge>
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{formatDate(blog.publishedAt)}</span>
                </div>
              </div>

              {/* Title and subtitle */}
              <div className="mb-6">
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                  {blog.title}
                </h3>
                {blog.subtitle && (
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {blog.subtitle}
                  </p>
                )}
              </div>

              {/* Excerpt */}
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {blog.excerpt}
              </p>

              {/* Action buttons */}
              <div className="flex items-center justify-between">
                <Link to={`/blog/${blog.slug}`}>
                  <Button 
                    size="lg"
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Read Article
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-3 hover:bg-slate-100 transition-colors group"
                  >
                    <Bookmark className="h-5 w-5 text-slate-500 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-3 hover:bg-slate-100 transition-colors group"
                  >
                    <Share2 className="h-5 w-5 text-slate-500 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Hover effect border */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500" />
          
          {/* Shine effect */}
          <div className="absolute top-0 -left-4 w-4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:left-full transition-all duration-1000 ease-out" />
        </article>
      </div>
    </section>
  );
}
