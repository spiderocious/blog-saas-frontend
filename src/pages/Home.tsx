import { HeroSection } from "@/components/blog/HeroSection";
import { BlogGrid } from "@/features/blog";
import { SearchFilter } from "@/components/blog/SearchFilter";
import { SEOHead } from "@/components/seo/SEOHead";
import { useQuery } from "@tanstack/react-query";
import { publicBlogsService, type PublicBlog } from "@/services/api/blogs";
import { useState } from "react";
import { type Blog } from "@/lib/types";

// Helper function to convert PublicBlog to Blog
const mapPublicBlogToBlog = (publicBlog: PublicBlog): Blog => ({
  id: publicBlog._id,
  title: publicBlog.title,
  slug: publicBlog.slug,
  content: publicBlog.content,
  excerpt: publicBlog.excerpt,
  metaTitle: publicBlog.seoTitle,
  metaDescription: publicBlog.seoDescription,
  metaKeywords: publicBlog.tags,
  skills: publicBlog.skills,
  category: mapCategory(publicBlog.category),
  isPart: false, // Default since not in API response
  featuredImage: publicBlog.featuredImage,
  publishedAt: publicBlog.publishedAt,
  createdAt: publicBlog.createdAt,
  updatedAt: publicBlog.updatedAt,
  isPublished: publicBlog.isPublished,
  readingTime: publicBlog.readingTime,
  views: publicBlog.views,
  likes: publicBlog.likes,
  author: publicBlog.author,
});

// Helper to map API category to Blog category
const mapCategory = (apiCategory: string): Blog['category'] => {
  const categoryMap: Record<string, Blog['category']> = {
    'frontend development': 'frontend',
    'backend development': 'backend',
    'system architecture': 'architecture',
    'devops': 'devops',
    'tutorial': 'tutorial',
    'opinion': 'opinion',
    'career development': 'career',
    'technology': 'tutorial', // Default mapping
  };
  
  return categoryMap[apiCategory.toLowerCase()] || 'tutorial';
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const {
    data: blogsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "public-blogs",
      {
        page,
        category: selectedCategory,
        tags: selectedSkills,
        search: searchQuery,
      },
    ],
    queryFn: () =>
      publicBlogsService.getBlogs({
        page,
        limit: 1000, // Default pagination limit
        category: selectedCategory,
        tags: selectedSkills.length > 0 ? selectedSkills : undefined,
        search: searchQuery || undefined,
      }),
  });

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
    setPage(1);
  };

  const handleCategoryChange = (category: string | undefined) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(undefined);
    setSelectedSkills([]);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <SEOHead
        title="DevFeranmi - Software Engineering Blog"
        description="Explore advanced software engineering concepts, React patterns, system architecture, and full-stack development insights from a Senior Software Engineer."
        image="/placeholder.svg"
        url={window.location.origin}
        type="website"
        tags={["React", "TypeScript", "Software Engineering", "System Architecture", "Full Stack Development"]}
      />
      {/* Hero Section */}
      <HeroSection />
      {/* Enhanced Search & Filter */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <SearchFilter
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedSkills={selectedSkills}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onSkillToggle={handleSkillToggle}
            onClearFilters={handleClearFilters}
          />
        </div>
      </section>

      {/* Enhanced Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <BlogGrid
            blogs={blogsResponse?.data.blogs.map(mapPublicBlogToBlog) || []}
            isLoading={isLoading}
          />
        </div>
      </section>
    </div>
  );
}
