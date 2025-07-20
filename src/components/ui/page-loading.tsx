import { Loader2, FileText, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageLoadingProps {
  type?: 'dashboard' | 'blogs' | 'analytics' | 'settings' | 'default';
  message?: string;
}

export function PageLoading({ type = 'default', message }: PageLoadingProps) {
  const getConfig = () => {
    switch (type) {
      case 'dashboard':
        return {
          icon: BarChart3,
          defaultMessage: 'Loading dashboard...',
          gradient: 'from-blue-500 to-blue-600'
        };
      case 'blogs':
        return {
          icon: FileText,
          defaultMessage: 'Loading articles...',
          gradient: 'from-purple-500 to-purple-600'
        };
      case 'analytics':
        return {
          icon: BarChart3,
          defaultMessage: 'Loading analytics...',
          gradient: 'from-green-500 to-green-600'
        };
      case 'settings':
        return {
          icon: Settings,
          defaultMessage: 'Loading settings...',
          gradient: 'from-slate-500 to-slate-600'
        };
      default:
        return {
          icon: Loader2,
          defaultMessage: 'Loading...',
          gradient: 'from-blue-500 to-blue-600'
        };
    }
  };

  const { icon: Icon, defaultMessage, gradient } = getConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Animated icon */}
        <div className="relative">
          <div className={cn(
            "w-20 h-20 rounded-2xl bg-gradient-to-br shadow-lg flex items-center justify-center mx-auto",
            gradient
          )}>
            <Icon className="w-10 h-10 text-white animate-spin" />
          </div>
          
          {/* Pulse rings */}
          <div className={cn(
            "absolute inset-0 rounded-2xl opacity-20 animate-ping bg-gradient-to-br",
            gradient
          )} />
          <div className={cn(
            "absolute inset-2 rounded-xl opacity-30 animate-ping bg-gradient-to-br",
            gradient
          )} 
          style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            {message || defaultMessage}
          </h3>
          <p className="text-sm text-slate-500">
            Please wait while we prepare your content
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex items-center justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
