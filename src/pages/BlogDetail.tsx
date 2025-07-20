import BlogCard from "@/components/blog/BlogCard";
import Header from "@/components/layout/Header";
import { SEOHead } from "@/components/seo/SEOHead";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { publicBlogsService, type PublicBlog } from "@/services/api/blogs";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  Maximize,
  Minimize,
  Share2,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
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

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [likesCount, setLikesCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Enhanced reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate reading progress percentage
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setReadingProgress(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const { data: blogResponse, isLoading, error } = useQuery({
    queryKey: ["public-blog", slug],
    queryFn: () => publicBlogsService.getBlogBySlug(slug!),
    enabled: !!slug,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Convert PublicBlog to Blog for compatibility
  const data = useMemo(() => {
    if (!blogResponse) return undefined;
    
    return { 
      blog: mapPublicBlogToBlog(blogResponse.blog),
      recommendations: blogResponse.relatedBlogs.map(mapPublicBlogToBlog)
    };
  }, [blogResponse]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data?.blog) {
      document.title = `${data.blog.title} - Cracked Coconut Blog`;
      setLikesCount(data.blog.likes || 0);
      // Calculate reading time based on content length
      const words = data.blog.content.split(" ").length;
      setReadingTime(Math.ceil(words / 200));
    }
  }, [data]);

  // Fullscreen handlers
  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen toggle failed:", err);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = () => {
    // web share API
    if (navigator.share) {
      navigator
        .share({
          title: data?.blog?.title || "",
          url: window.location.href,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      // Fallback for browsers that don't support the Web Share API
      const copyUrl = window.location.href;
      const copyText = `Check out this blog: ${
        data?.blog?.title || ""
      } at ${copyUrl}`;

      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          toast.success("Link copied to clipboard!");
        })
        .catch((err) => console.error("Copy failed:", err));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <Header />
        {/* Enhanced Reading Progress Bar Skeleton */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"
            style={{ width: "30%" }}
          />
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="animate-pulse space-y-8"
            >
              <div className="h-6 bg-slate-200 rounded w-1/4" />
              <div className="h-16 bg-slate-200 rounded" />
              <div className="flex gap-4">
                <div className="h-4 bg-slate-200 rounded w-20" />
                <div className="h-4 bg-slate-200 rounded w-24" />
                <div className="h-4 bg-slate-200 rounded w-16" />
              </div>
              <div className="h-80 bg-slate-200 rounded-2xl" />
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 bg-slate-200 rounded w-full" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">
                    Unable to load article
                  </h2>
                  <p>
                    {error instanceof Error
                      ? error.message
                      : "There was an error loading this blog post. Please try again later."}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => window.location.reload()}
                      variant="outline"
                      size="sm"
                    >
                      Try Again
                    </Button>
                    <Link to="/">
                      <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Article not found
            </h1>
            <p className="text-slate-600 mb-8">
              The article you're looking for doesn't exist.
            </p>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { blog, recommendations } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <SEOHead
        title={blog.title}
        description={blog.excerpt}
        image={blog.featuredImage || '/og-image.png'}
        url={`${window.location.origin}/blog/${blog.slug}`}
        type="article"
        publishedTime={blog.publishedAt}
        modifiedTime={blog.updatedAt}
        author="Feranmi"
        tags={blog.skills || []}
      />
      <Header />

      {/* Enhanced Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left"
          style={{ scaleX }}
        />
        {/* Progress Percentage Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: readingProgress > 5 ? 1 : 0,
            scale: readingProgress > 5 ? 1 : 0.8,
          }}
          className="absolute top-2 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-slate-700 shadow-lg border border-slate-200"
        >
          {readingProgress}%
        </motion.div>
      </div>

      {/* Floating Fullscreen Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleFullscreen}
        className="fixed bottom-6 right-6 z-40 bg-white/90 backdrop-blur-sm hover:bg-white border border-slate-200 rounded-full p-3 shadow-xl transition-all duration-300 group"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? (
          <Minimize className="h-5 w-5 text-slate-600 group-hover:text-slate-900" />
        ) : (
          <Maximize className="h-5 w-5 text-slate-600 group-hover:text-slate-900" />
        )}
      </motion.button>

      <article className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="items-center gap-2 text-sm text-slate-600 mb-8 hidden md:flex"
          >
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            {blog.category && (
              <>
                <Link
                  to={`../../?category=${blog.category.toLowerCase()}`}
                  className="hover:text-blue-600 transition-colors capitalize"
                >
                  {blog.category}
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            <span className="text-slate-400">{blog.title}</span>
          </motion.nav>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="mb-6">
              {blog.category && (
                <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
                  {blog.category}
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                {blog.title}
              </h1>
              {blog.subtitle && (
                <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-4">
                  {blog.subtitle}
                </h2>
              )}
              <p className="text-xl text-slate-600 leading-relaxed">
                {blog.excerpt}
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(blog.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {blog.views?.toLocaleString() || "0"} views
              </div>
            </div>

            {/* Author & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50">
              <div className="flex items-center gap-4">
                <img
                  src="https://martech3d-customer-portal.s3.eu-west-2.amazonaws.com/images/1752289451_production_Fl6OzdHcHF_20250222-132326-2.jpg"
                  className="w-12 h-12 rounded-full object-cover"
                  alt="Feranmi"
                />
                <div>
                  <p className="font-semibold text-slate-900">Feranmi</p>
                  <p className="text-sm text-slate-600">
                    Senior Software Engineer
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
              
                {/* Share Dropdown */}
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none mb-16"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-200/50 shadow-xl">
              <div
                className="prose-headings:text-slate-900 prose-p:text-slate-700 prose-strong:text-slate-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-slate-100"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </motion.div>

          {/* Skills/Tags */}
          {blog.skills && blog.skills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Technologies & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-sm px-3 py-1"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}

          <Separator className="my-16" />

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      About Feranmi
                    </h3>
                    <p className="text-slate-700 mb-4 leading-relaxed">
                      Senior Software Engineer with 7+ years of experience
                      building scalable web applications. Passionate about
                      React, TypeScript, and sharing knowledge with the
                      developer community.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recommended Articles */}
          {recommendations && recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
                Recommended Reading
              </h3>
              <div className="grid xl:grid-cols-2 gap-6">
                {recommendations.slice(0, 3).map((recommendedBlog, index) => (
                  <motion.div
                    key={recommendedBlog.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  >
                    <BlogCard blog={recommendedBlog} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>
    </div>
  );
}
