import { Link } from 'react-router-dom';
import { Eye, Clock, Calendar, TrendingUp, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Blog } from '@/lib/types';
import { cn } from '@/lib/utils';

interface RecentArticlesProps {
  blogs: Blog[];
  isLoading?: boolean;
}

export function RecentArticles({ blogs, isLoading = false }: RecentArticlesProps) {
  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-slate-50/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-slate-900">Recent Articles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl">
              <Skeleton className="w-16 h-16 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const formatViews = (views?: number) => {
    if (!views) return '0';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      frontend: 'bg-blue-100 text-blue-700 border-blue-200',
      backend: 'bg-green-100 text-green-700 border-green-200',
      architecture: 'bg-purple-100 text-purple-700 border-purple-200',
      tutorial: 'bg-orange-100 text-orange-700 border-orange-200',
      career: 'bg-pink-100 text-pink-700 border-pink-200',
      opinion: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      devops: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[category as keyof typeof colors] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-slate-50/50 hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">Recent Articles</CardTitle>
          <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Edit3 className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500 mb-2">No articles yet</p>
            <p className="text-sm text-slate-400">Create your first blog post to get started</p>
          </div>
        ) : (
          blogs.map((blog, index) => (
            <div
              key={blog.id}
              className={cn(
                "group flex items-center gap-4 p-4 rounded-xl hover:bg-white/80 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-slate-100",
                "animate-in slide-in-from-left-5 fade-in-0"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Featured Image */}
              <div className="relative">
                {blog.featuredImage ? (
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <Edit3 className="w-6 h-6 text-slate-400" />
                  </div>
                )}
                
                {/* Status indicator */}
                <div className={cn(
                  "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                  blog.isPublished ? "bg-green-500" : "bg-yellow-500"
                )} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h4>
                
                <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {formatViews(blog.views)}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {blog.readingTime}m
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", getCategoryColor(blog.category))}
                  >
                    {blog.category}
                  </Badge>
                  
                  {blog.views && blog.views > 1000 && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end gap-2">
                <Link 
                  to={`/admin/blogs/edit/${blog.id}`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Button variant="ghost" size="sm" className="h-8 px-3">
                    <Edit3 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </Link>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900">
                    {formatViews(blog.views)}
                  </div>
                  <div className="text-xs text-slate-500">views</div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
