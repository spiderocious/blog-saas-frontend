import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SKILL_CATEGORIES, BLOG_CATEGORIES } from '@/lib/types';

interface BlogFilterProps {
  selectedCategory?: string;
  selectedSkills: string[];
  searchQuery: string;
  onCategoryChange: (category: string | undefined) => void;
  onSkillToggle: (skill: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export default function BlogFilter({
  selectedCategory,
  selectedSkills,
  searchQuery,
  onCategoryChange,
  onSkillToggle,
  onSearchChange,
  onClearFilters
}: BlogFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  
  const allSkills = Object.values(SKILL_CATEGORIES).flat();
  const hasActiveFilters = selectedCategory || selectedSkills.length > 0 || searchQuery;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filter Toggle & Clear */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {(selectedCategory ? 1 : 0) + selectedSkills.length}
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <Badge variant="default" className="flex items-center gap-1">
              {BLOG_CATEGORIES.find(cat => cat.value === selectedCategory)?.label}
              <button
                onClick={() => onCategoryChange(undefined)}
                className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
              {skill}
              <button
                onClick={() => onSkillToggle(skill)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Expandable Filters */}
      {showFilters && (
        <div className="space-y-6 p-4 border border-border rounded-lg bg-card">
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCategoryChange(
                    selectedCategory === category.value ? undefined : category.value
                  )}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Skills by Category */}
          {Object.entries(SKILL_CATEGORIES).map(([categoryName, skills]) => (
            <div key={categoryName}>
              <h3 className="font-semibold mb-3 capitalize">{categoryName}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Button
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    size="sm"
                    onClick={() => onSkillToggle(skill)}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}