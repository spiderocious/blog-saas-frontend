import { Link } from 'react-router-dom';
import { LucideIcon, Plus, TrendingUp, Settings, FileText, Users, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LoadingButton } from '@/components/ui/loading-button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface QuickActionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  iconColor: string;
  isComingSoon?: boolean;
}

function QuickActionCard({ title, description, icon: Icon, href, gradient, iconColor, isComingSoon }: QuickActionProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const content = (
    <Card 
      className={cn(
        "group relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-white to-slate-50/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer",
        isComingSoon && "opacity-75 cursor-not-allowed"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br",
        gradient,
        isComingSoon && "group-hover:opacity-5"
      )} />
      
      <div className="relative p-6 text-center">
        <div className={cn(
          "inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300",
          gradient
        )}>
          <Icon className={cn(
            "h-7 w-7 text-white drop-shadow-sm transition-transform duration-300",
            isHovered && !isComingSoon && "scale-110"
          )} />
          
          {/* Pulse animation */}
          <div className={cn(
            "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 group-hover:animate-ping bg-gradient-to-br",
            gradient,
            isComingSoon && "group-hover:opacity-10"
          )} />
        </div>
        
        <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
          {title}
          {isComingSoon && (
            <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              Soon
            </span>
          )}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Subtle shine effect */}
      <div className="absolute top-0 -left-4 w-2 h-full bg-gradient-to-b from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:left-full transition-all duration-700 ease-out" />
      
      {isComingSoon && (
        <div className="absolute inset-0 bg-slate-50/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full shadow-sm">
            Coming Soon
          </span>
        </div>
      )}
    </Card>
  );

  if (isComingSoon) {
    return content;
  }

  return (
    <Link to={href} className="block">
      {content}
    </Link>
  );
}

export function QuickActions() {
  const actions = [
    {
      title: 'Create New Article',
      description: 'Start writing your next blog post with our advanced editor',
      icon: Plus,
      href: '/admin/blogs/create',
      gradient: 'from-blue-500 to-blue-600',
      iconColor: 'text-blue-600'
    },
    {
      title: 'View Analytics',
      description: 'Check detailed performance metrics and engagement stats',
      icon: BarChart3,
      href: '/admin/analytics',
      gradient: 'from-green-500 to-green-600',
      iconColor: 'text-green-600',
      isComingSoon: true
    },
    {
      title: 'Manage Content',
      description: 'Edit, organize, and optimize your existing articles',
      icon: FileText,
      href: '/admin/blogs',
      gradient: 'from-purple-500 to-purple-600',
      iconColor: 'text-purple-600'
    },
    {
      title: 'SEO Optimization',
      description: 'Improve your content visibility and search rankings',
      icon: TrendingUp,
      href: '/admin/seo',
      gradient: 'from-orange-500 to-orange-600',
      iconColor: 'text-orange-600',
      isComingSoon: true
    },
    {
      title: 'Reader Insights',
      description: 'Understand your audience and engagement patterns',
      icon: Users,
      href: '/admin/readers',
      gradient: 'from-pink-500 to-pink-600',
      iconColor: 'text-pink-600',
      isComingSoon: true
    },
    {
      title: 'Settings',
      description: 'Configure your blog settings and preferences',
      icon: Settings,
      href: '/admin/settings',
      gradient: 'from-slate-500 to-slate-600',
      iconColor: 'text-slate-600',
      isComingSoon: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
        <p className="text-sm text-slate-500">Streamline your workflow</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <div
            key={action.title}
            className="animate-in slide-in-from-bottom-5 fade-in-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <QuickActionCard {...action} />
          </div>
        ))}
      </div>
    </div>
  );
}
