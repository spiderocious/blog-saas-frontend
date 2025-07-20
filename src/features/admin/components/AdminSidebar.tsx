import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut,
  Plus,
  BarChart3,
  Code,
  Menu,
  X,
  Home,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = [
    // { 
    //   name: 'Dashboard', 
    //   href: '/admin/dashboard', 
    //   icon: LayoutDashboard,
    //   gradient: 'from-blue-500 to-blue-600',
    //   description: 'Overview & Stats'
    // },
    { 
      name: 'All Blogs', 
      href: '/admin/blogs', 
      icon: FileText,
      gradient: 'from-purple-500 to-purple-600',
      description: 'Manage Articles'
    },
    { 
      name: 'Create Blog', 
      href: '/admin/blogs/create', 
      icon: Plus,
      gradient: 'from-green-500 to-green-600',
      description: 'Write New Post'
    },
    { 
      name: 'Analytics', 
      href: '/admin/analytics', 
      icon: BarChart3,
      gradient: 'from-orange-500 to-orange-600',
      description: 'Performance',
      isComingSoon: true
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: Settings,
      gradient: 'from-slate-500 to-slate-600',
      description: 'Configuration',
      isComingSoon: true
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return location.pathname === '/admin/dashboard' || location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <>
      {/* Enhanced Logo */}
      <div className="p-6 border-b border-slate-200/50">
        <Link to="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 group-hover:animate-ping" />
          </div>
          <div>
            <h2 className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              DevFeranmi
            </h2>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Enhanced Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <div
                key={item.name}
                className="animate-in slide-in-from-left-5 fade-in-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.isComingSoon ? (
                  <div className={cn(
                    "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-not-allowed opacity-60",
                    "text-slate-500 hover:bg-slate-50"
                  )}>
                    <div className="relative">
                      <div className={cn(
                        "p-2 rounded-lg bg-gradient-to-br shadow-sm",
                        item.gradient
                      )}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {item.name}
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                          Soon
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                      active
                        ? "bg-gradient-to-r from-blue-50 to-blue-50/50 text-blue-700 shadow-sm border border-blue-100"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <div className="relative">
                      <div className={cn(
                        "p-2 rounded-lg transition-all duration-200",
                        active 
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm" 
                          : "bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-slate-200 group-hover:to-slate-300"
                      )}>
                        <Icon className={cn(
                          "h-4 w-4 transition-colors duration-200",
                          active ? "text-white" : "text-slate-600 group-hover:text-slate-700"
                        )} />
                      </div>
                      
                      {active && (
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 opacity-20 animate-pulse" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        {item.name}
                        {active && (
                          <ChevronRight className="h-3 w-3 text-blue-600" />
                        )}
                      </div>
                      <p className={cn(
                        "text-xs mt-0.5 transition-colors duration-200",
                        active ? "text-blue-600/70" : "text-slate-400"
                      )}>
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Active indicator */}
                    {active && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full" />
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Enhanced Footer */}
      <div className="p-4 border-t border-slate-200/50 space-y-3">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group"
        >
          <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-red-100 transition-colors duration-200 mr-3">
            <LogOut className="h-3.5 w-3.5" />
          </div>
          Logout
        </Button>
        
        <div className="pt-3 border-t border-slate-200/50">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors group"
          >
            <Home className="h-3 w-3" />
            <span>Back to Blog</span>
            <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Enhanced Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isMobileOpen ? (
            <X className="h-4 w-4 text-slate-600" />
          ) : (
            <Menu className="h-4 w-4 text-slate-600" />
          )}
        </Button>
      </div>

      {/* Enhanced Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in-0 duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-72 bg-white/95 backdrop-blur-xl border-r border-slate-200/50 z-50 shadow-2xl transform transition-all duration-300 ease-out",
        "lg:translate-x-0 lg:static lg:z-auto lg:shadow-none lg:bg-white lg:backdrop-blur-none",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
      </aside>
    </>
  );
}