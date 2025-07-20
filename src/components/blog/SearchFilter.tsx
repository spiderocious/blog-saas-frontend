import { useState, useEffect } from 'react';
import { Search, Filter, X, Sparkles, TrendingUp, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SearchFilterProps {
  selectedCategory?: string;
  selectedSkills: string[];
  searchQuery: string;
  onCategoryChange: (category: string | undefined) => void;
  onSkillToggle: (skill: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export function SearchFilter({
  selectedCategory,
  selectedSkills,
  searchQuery,
  onCategoryChange,
  onSkillToggle,
  onSearchChange,
  onClearFilters
}: SearchFilterProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { 
      id: 'frontend', 
      label: 'Frontend', 
      icon: Code, 
      color: 'from-blue-500 to-blue-600',
      description: 'React, Vue, Angular'
    },
    { 
      id: 'backend', 
      label: 'Backend', 
      icon: Zap, 
      color: 'from-green-500 to-green-600',
      description: 'Node.js, APIs, Databases'
    },
    { 
      id: 'architecture', 
      label: 'Architecture', 
      icon: TrendingUp, 
      color: 'from-purple-500 to-purple-600',
      description: 'System Design, Patterns'
    },
    { 
      id: 'tutorial', 
      label: 'Tutorials', 
      icon: Sparkles, 
      color: 'from-orange-500 to-orange-600',
      description: 'Step-by-step guides'
    },
    { 
      id: 'career', 
      label: 'Career', 
      icon: TrendingUp, 
      color: 'from-pink-500 to-pink-600',
      description: 'Growth, Interview tips'
    }
  ];

  const popularSkills = [
    'React', 'TypeScript', 'Next.js', 'Node.js', 'JavaScript',
    'Python', 'AWS', 'Docker', 'GraphQL', 'MongoDB',
    'Vue', 'Angular', 'Express', 'PostgreSQL', 'Redis'
  ];

  const activeFiltersCount = (selectedCategory ? 1 : 0) + selectedSkills.length;

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Find Your Next Read
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Explore articles by topic, technology, or search for specific content
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className={cn(
          "relative flex items-center transition-all duration-300",
          isSearchFocused && "scale-105"
        )}>
          <Search className={cn(
            "absolute left-4 h-5 w-5 transition-colors duration-200",
            isSearchFocused ? "text-blue-600" : "text-slate-400"
          )} />
          <Input
            type="text"
            placeholder="Search articles, technologies, concepts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={cn(
              "pl-12 pr-12 py-4 text-lg rounded-2xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm",
              isSearchFocused 
                ? "border-blue-300 shadow-lg shadow-blue-100" 
                : "border-slate-200 hover:border-slate-300"
            )}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange('')}
              className="absolute right-2 rounded-full p-2 hover:bg-slate-100"
            >
              <X className="h-4 w-4 text-slate-400" />
            </Button>
          )}
        </div>

        {/* Search suggestions (when focused and no query) */}
        {isSearchFocused && !searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl z-10 p-4">
            <p className="text-sm text-slate-500 mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {['React Hooks', 'TypeScript Guide', 'System Design', 'Performance'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => onSearchChange(suggestion)}
                  className="text-sm bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 px-3 py-1 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "rounded-full px-6 py-3 transition-all duration-300 hidden",
            showFilters && "bg-blue-50 border-blue-200 text-blue-700"
          )}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 bg-blue-600 text-white">{activeFiltersCount}</Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="text-slate-500 hover:text-red-600 rounded-full px-4 py-2"
          >
            <X className="mr-1 h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filters Section */}
      <div className={cn(
        "transition-all duration-500 overflow-hidden",
        showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {categories.map((category, index) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(isSelected ? undefined : category.id)}
                    className={cn(
                      "group relative p-4 rounded-xl border-2 transition-all duration-300 text-left",
                      "animate-in fade-in-0 slide-in-from-bottom-5",
                      isSelected
                        ? "border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg"
                        : "border-slate-200 hover:border-slate-300 hover:shadow-md bg-white"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg mb-3 flex items-center justify-center transition-all duration-300",
                      isSelected
                        ? `bg-gradient-to-br ${category.color} shadow-lg`
                        : "bg-slate-100 group-hover:bg-slate-200"
                    )}>
                      <Icon className={cn(
                        "h-5 w-5 transition-colors duration-300",
                        isSelected ? "text-white" : "text-slate-600"
                      )} />
                    </div>
                    <div>
                      <h4 className={cn(
                        "font-semibold transition-colors duration-300",
                        isSelected ? "text-blue-700" : "text-slate-900"
                      )}>
                        {category.label}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {category.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularSkills.map((skill, index) => {
                const isSelected = selectedSkills.includes(skill);
                
                return (
                  <button
                    key={skill}
                    onClick={() => onSkillToggle(skill)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      "animate-in fade-in-0 slide-in-from-bottom-3",
                      isSelected
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {selectedCategory && (
            <Badge 
              className="bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-full flex items-center gap-2"
            >
              Category: {categories.find(c => c.id === selectedCategory)?.label}
              <button
                onClick={() => onCategoryChange(undefined)}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedSkills.map((skill) => (
            <Badge 
              key={skill}
              className="bg-purple-100 text-purple-700 border border-purple-200 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => onSkillToggle(skill)}
                className="hover:bg-purple-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
