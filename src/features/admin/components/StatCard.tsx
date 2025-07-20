import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  isLoading?: boolean;
  gradient?: string;
  iconColor?: string;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  trendDirection = 'up',
  isLoading = false,
  gradient = 'from-blue-500 to-blue-600',
  iconColor = 'text-blue-600'
}: StatCardProps) {
  if (isLoading) {
    return (
      <Card className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-white to-slate-50/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-12 w-12 rounded-xl" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTrendColor = () => {
    switch (trendDirection) {
      case 'up': return 'text-emerald-600';
      case 'down': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  const getTrendIcon = () => {
    switch (trendDirection) {
      case 'up': return '↗';
      case 'down': return '↙';
      default: return '→';
    }
  };

  return (
    <Card className="group relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-white to-slate-50/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Animated background gradient */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br",
        gradient
      )} />
      
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
              {title}
            </p>
            <p className="text-3xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            <p className="text-sm text-slate-500">
              {description}
            </p>
          </div>
          
          <div className={cn(
            "relative h-14 w-14 rounded-xl bg-gradient-to-br shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
            gradient
          )}>
            <Icon className={cn("h-7 w-7 text-white drop-shadow-sm")} />
            
            {/* Pulse animation */}
            <div className={cn(
              "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 group-hover:animate-ping bg-gradient-to-br",
              gradient
            )} />
          </div>
        </div>
        
        {trend && (
          <div className="mt-4 flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              getTrendColor()
            )}>
              <span className="text-xs">{getTrendIcon()}</span>
              {trend}
            </div>
            <span className="text-sm text-slate-500">vs last month</span>
          </div>
        )}
        
        {/* Subtle shine effect */}
        <div className="absolute top-0 -left-4 w-2 h-full bg-gradient-to-b from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:left-full transition-all duration-700 ease-out" />
      </CardContent>
    </Card>
  );
}
