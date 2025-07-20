/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from 'react-router-dom';
import { Code, Menu, X, Search, ChevronDown, Home, User, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


interface NavItem {
  name: string;
  to: string;
  icon: React.ComponentType<any>;
  description?: string;
  hasDropdown?: boolean;
  items?: NavItem[];
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation: NavItem[] = [
    { 
      name: 'Home', 
      to: '/', 
      icon: Home,
      description: 'Latest articles and featured content'
    },
    { 
      name: 'About', 
      to: 'https://devferanmi.xyz', 
      icon: User,
      description: 'Learn more about me and my journey'
    },
    { 
      name: 'Contact', 
      to: 'https://devferanmi.xyz/contact', 
      icon: Mail,
      description: 'Get in touch for collaborations'
    }
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-lg" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={cn(
              "relative p-2 rounded-xl transition-all duration-300",
              isScrolled 
                ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg" 
                : "bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500 group-hover:to-purple-600"
            )}>
              <Code className={cn(
                "h-6 w-6 transition-colors duration-300",
                isScrolled ? "text-white" : "text-blue-600 group-hover:text-white"
              )} />
              
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 group-hover:animate-ping" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                DevFeranmi
              </span>
              <span className="text-xs text-slate-500 -mt-1">Software Engineer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative group",
                      activeDropdown === item.name
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}>
                      <item.icon className="h-4 w-4" />
                      {item.name}
                      <ChevronDown className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        activeDropdown === item.name && "rotate-180"
                      )} />
                      
                      {/* Active indicator */}
                      <span className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300",
                        activeDropdown === item.name && "w-3/4"
                      )} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in-0 slide-in-from-top-5">
                        <div className="p-2">
                          {item.items?.map((subItem, index) => (
                            <Link
                              key={subItem.name}
                              to={subItem.to}
                              className={cn(
                                "block p-4 rounded-xl hover:bg-slate-50 transition-colors group",
                                "animate-in fade-in-0 slide-in-from-left-5"
                              )}
                              style={{ animationDelay: `${index * 50}ms` }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                                {subItem.name}
                              </div>
                              <div className="text-sm text-slate-500 mt-1">
                                {subItem.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative group",
                      isActivePath(item.to)
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                    
                    {/* Active indicator */}
                    <span className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300",
                      isActivePath(item.to) && "w-3/4"
                    )} />
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Search & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden rounded-full p-3"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 
                <X className="h-5 w-5 text-slate-600" /> : 
                <Menu className="h-5 w-5 text-slate-600" />
              }
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 border-t border-slate-200/50 bg-white/95 backdrop-blur-xl rounded-b-2xl shadow-2xl">
              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-slate-500 px-3 py-2">
                          {item.name}
                        </div>
                        {item.items?.map((subItem, subIndex) => (
                          <Link
                            key={subItem.name}
                            to={subItem.to}
                            className={cn(
                              "block px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                              "animate-in fade-in-0 slide-in-from-left-5",
                              isActivePath(subItem.to)
                                ? "text-blue-600 bg-blue-50"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            )}
                            style={{ animationDelay: `${(index + subIndex) * 100}ms` }}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        to={item.to}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                          "animate-in fade-in-0 slide-in-from-left-5",
                          isActivePath(item.to)
                            ? "text-blue-600 bg-blue-50"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}