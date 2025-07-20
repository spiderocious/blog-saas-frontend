import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { Blog } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  blog: Blog;
  variant?: 'default' | 'featured' | 'compact';
}

export default function BlogCard({ blog, variant = 'default' }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (variant === 'featured') {
    return (
      <article className="card-featured group cursor-pointer">
        <Link to={`/blog/${blog.slug}`} className="block">
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-xl">
            {blog.featuredImage && (
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {blog.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-white/20 text-white border-white/30">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(blog.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {blog.readingTime} min read
              </span>
            </div>
            
            <h2 className="text-hero mb-2 group-hover:text-primary transition-colors">
              {blog.title}
            </h2>
            
            {blog.subtitle && (
              <p className="text-subtitle mb-4">{blog.subtitle}</p>
            )}
            
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {blog.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                Read Article
              </span>
              <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group">
        <Link to={`/blog/${blog.slug}`} className="block">
          <div className="flex gap-4">
            {blog.featuredImage && (
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatDate(blog.publishedAt)}</span>
                <span>·</span>
                <span>{blog.readingTime} min</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="card-elevated group transition-smooth">
      <Link to={`/blog/${blog.slug}`} className="block">
        {blog.featuredImage && (
          <div className="relative h-48 overflow-hidden rounded-t-xl mb-4">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {blog.isPart && (
              <div className="absolute top-3 left-3">
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  Part {blog.partNumber}
                </Badge>
              </div>
            )}
          </div>
        )}
        
        <div className="p-0">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(blog.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {blog.readingTime} min read
            </span>
          </div>
          
          <h3 className="text-title mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h3>
          
          {blog.subtitle && (
            <p className="text-subtitle mb-3 line-clamp-1">{blog.subtitle}</p>
          )}
          
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {blog.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {blog?.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {blog?.tags?.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{blog.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}