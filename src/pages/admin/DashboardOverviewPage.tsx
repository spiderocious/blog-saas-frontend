import { useQuery } from '@tanstack/react-query';
import { FileText, Eye, TrendingUp, Users, Clock, BookOpen } from 'lucide-react';
import { StatCard } from '../../features/admin/components/StatCard';
import { RecentArticles } from '../../features/admin/components/RecentArticles';
import { QuickActions } from '../../features/admin/components/QuickActions';
import { blogsApi } from '@/services/api/blogs';

export default function DashboardOverviewPage() {
  const { data: blogsData, isLoading, error } = useQuery({
    queryKey: ['admin-blogs'],
    queryFn: () => blogsApi.getBlogs({ limit: 100 })
  });

  const totalBlogs = blogsData?.total || 0;
  const totalViews = blogsData?.blogs?.reduce((sum, blog) => sum + (blog.views || 0), 0) || 0;
  const publishedBlogs = blogsData?.blogs?.filter(blog => blog.isPublished).length || 0;
  const draftBlogs = totalBlogs - publishedBlogs;
  const averageReadTime = Math.round(
    (blogsData?.blogs?.reduce((sum, blog) => sum + blog.readingTime, 0) || 0) / Math.max(totalBlogs, 1)
  );

  // Calculate engagement metrics
  const averageViews = Math.round(totalViews / Math.max(publishedBlogs, 1));
  const totalReadingTime = blogsData?.blogs?.reduce((sum, blog) => sum + blog.readingTime, 0) || 0;

  const stats = [
    {
      title: 'Total Articles',
      value: totalBlogs,
      description: `${publishedBlogs} published, ${draftBlogs} drafts`,
      icon: FileText,
      trend: '+12%',
      trendDirection: 'up' as const,
      gradient: 'from-blue-500 to-blue-600',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      description: 'Across all articles',
      icon: Eye,
      trend: '+25%',
      trendDirection: 'up' as const,
      gradient: 'from-green-500 to-green-600',
      iconColor: 'text-green-600'
    },
    {
      title: 'Avg. Views',
      value: averageViews.toLocaleString(),
      description: 'Per published article',
      icon: TrendingUp,
      trend: '+8%',
      trendDirection: 'up' as const,
      gradient: 'from-purple-500 to-purple-600',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Reading Time',
      value: `${totalReadingTime}min`,
      description: `Avg. ${averageReadTime}min per article`,
      icon: Clock,
      trend: 'Stable',
      trendDirection: 'neutral' as const,
      gradient: 'from-orange-500 to-orange-600',
      iconColor: 'text-orange-600'
    }
  ];

  const recentBlogs = blogsData?.blogs?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50">
      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <p className="text-slate-600 ml-7">
            Welcome back! Here's your blog performance overview.
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className="animate-in slide-in-from-bottom-5 fade-in-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <StatCard
                {...stat}
                isLoading={isLoading}
              />
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Articles - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RecentArticles blogs={recentBlogs} isLoading={isLoading} />
          </div>

          {/* Quick Stats Sidebar */}
          <div className="space-y-6">
            {/* Content Overview */}
            <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-6 border-0 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Content Overview</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Published</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000"
                        style={{ width: `${totalBlogs > 0 ? (publishedBlogs / totalBlogs) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-900">{publishedBlogs}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Drafts</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full transition-all duration-1000"
                        style={{ width: `${totalBlogs > 0 ? (draftBlogs / totalBlogs) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-900">{draftBlogs}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-6 border-0 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Popular Categories</h3>
              
              <div className="space-y-3">
                {['Frontend', 'Architecture', 'Tutorial'].map((category, index) => (
                  <div key={category} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      index === 0 ? 'bg-blue-500' : 
                      index === 1 ? 'bg-purple-500' : 'bg-orange-500'
                    }`} />
                    <span className="text-sm text-slate-600 flex-1">{category}</span>
                    <span className="text-sm font-medium text-slate-900">
                      {Math.floor(Math.random() * 20) + 10}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
}