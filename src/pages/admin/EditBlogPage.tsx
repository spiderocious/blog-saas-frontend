import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import { motion } from 'framer-motion';
import { 
  Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { adminBlogsService, type AdminBlog, type ApiError } from '@/services/api/admin';
import { 
  Calendar, 
  Plus, 
  X, 
  Save, 
  Eye, 
  Upload, 
  Tag, 
  Code, 
  Settings,
  Clock,
  Globe,
  ArrowLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';

// Import styles
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

interface BlogFormData {
  title: string;
  summary: string;
  content: string;
  author: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  featuredImage: string;
  publishedAt: Date | null;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  readingTime: number;
  featured: boolean;
}

const CATEGORIES = [
  'Frontend Development',
  'Backend Development',
  'System Architecture',
  'Career Development',
  'DevOps',
  'Mobile Development',
  'Data Science',
  'AI/ML',
  'Tutorial',
  'Opinion'
];

const SKILL_SUGGESTIONS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java',
  'CSS', 'HTML', 'Vue.js', 'Angular', 'Next.js', 'Express.js',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes',
  'AWS', 'Azure', 'GCP', 'Git', 'GraphQL', 'REST API',
  'Testing', 'CI/CD', 'Microservices', 'System Design'
];

const TAG_SUGGESTIONS = [
  'tutorial', 'beginners', 'advanced', 'productivity', 'performance',
  'best-practices', 'architecture', 'debugging', 'optimization',
  'security', 'scalability', 'design-patterns', 'code-review'
];

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    summary: '',
    content: '',
    author: '',
    tags: [],
    category: '',
    status: 'draft',
    featuredImage: '',
    publishedAt: null,
    slug: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    readingTime: 0,
    featured: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Fetch blog data for editing
  const { data: blog, isLoading: isFetching, error } = useQuery({
    queryKey: ['admin', 'blog', id],
    queryFn: () => adminBlogsService.getBlogById(id!),
    enabled: !!id,
  });

    // Update form data when blog is loaded
  useEffect(() => {
    if (blog && !isDataLoaded) {
      console.log('Blog data loaded:', blog);
      setFormData({
        title: blog.title,
        summary: blog.excerpt, // Map excerpt to summary
        content: blog.content,
        author: blog.author,
        tags: blog.tags,
        category: blog.category,
        status: blog.isPublished ? 'published' : 'draft', // Map isPublished to status
        featuredImage: blog.featuredImage || '',
        publishedAt: blog.publishedAt ? new Date(blog.publishedAt) : null,
        slug: blog.slug,
        metaTitle: blog.seoTitle || blog.title,
        metaDescription: blog.seoDescription || blog.excerpt,
        metaKeywords: blog.tags.join(', '), // Convert tags array to keywords string
        readingTime: blog.readingTime,
        featured: false // Default since not in AdminBlog
      });
      setIsDataLoaded(true);
    }
  }, [blog, isDataLoaded]);

  // Quill editor configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image', 'code-block'],
      [{ color: [] }, { background: [] }],
      ['clean']
    ]
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'align',
    'link', 'image', 'code-block', 'color', 'background'
  ];

  // Calculate reading time based on content
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content,
      readingTime: calculateReadingTime(content)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleNewTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'published' | 'archived' = 'published') => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare the blog data according to the API specification
      const updateData = {
        title: formData.title,
        excerpt: formData.summary, // Map summary back to excerpt for API
        content: formData.content,
        featuredImage: formData.featuredImage || undefined,
        category: formData.category,
        tags: formData.tags,
        author: formData.author,
        isPublished: status === 'published', // Map status to isPublished boolean
        seoTitle: formData.metaTitle || formData.title,
        seoDescription: formData.metaDescription || formData.summary,
        publishedAt: formData.publishedAt ? formData.publishedAt.toISOString() : undefined
      };

      // Call the real API
      const updatedBlog = await adminBlogsService.updateBlog(id!, updateData);
      
      toast({
        title: `Blog ${status === 'published' ? 'updated and published' : status === 'archived' ? 'updated and archived' : 'updated and saved as draft'} successfully`,
        description: `Your blog post "${updatedBlog.title}" has been ${status === 'published' ? 'published' : status === 'archived' ? 'archived' : 'saved as a draft'}.`
      });
      
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error updating blog:', error);
      
      // Handle API errors with more specific messages
      let errorMessage = 'Please try again later.';
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as ApiError).message || errorMessage;
      }
      
      toast({
        title: 'Error updating blog',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle loading and error states
  if (isFetching || !isDataLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center space-x-4">
            <Skeleton className="h-10 w-10" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-64" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Blog</h3>
            <p className="text-gray-600 mb-4">
              {error instanceof Error ? error.message : 'Failed to load blog for editing'}
            </p>
            <Button
              onClick={() => navigate('/admin/blogs')}
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Blog Not Found</h3>
            <p className="text-gray-600 mb-4">
              The blog you're trying to edit could not be found.
            </p>
            <Button
              onClick={() => navigate('/admin/blogs')}
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-red-800 mb-2">Blog Not Found</h2>
                <p className="text-red-600 mb-4">The blog post you're trying to edit could not be found.</p>
                <Button onClick={() => navigate('/admin/blogs')} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blogs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Edit Blog Post</h1>
              <p className="text-slate-600">Update your blog with advanced editing tools</p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin/blogs')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blogs
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e, 'published')} className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Code className="h-5 w-5 text-blue-600" />
                    Blog Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-sm font-semibold text-slate-700 mb-2 block">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter an engaging blog title..."
                      className="text-lg font-medium h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="summary" className="text-sm font-semibold text-slate-700 mb-2 block">
                      Summary/Excerpt *
                    </Label>
                    <Textarea
                      id="summary"
                      value={formData.summary}
                      onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                      placeholder="Write a brief description that will appear in blog previews..."
                      rows={3}
                      className="resize-none"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                      Content *
                    </Label>
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <ReactQuill
                        value={formData.content}
                        onChange={handleContentChange}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Start writing your blog content here..."
                        style={{ height: '400px' }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publishing Options */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Settings className="h-5 w-5 text-green-600" />
                    Publishing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                      Status
                    </Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value: 'draft' | 'published' | 'archived') => 
                        setFormData(prev => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                      Category *
                    </Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(category => (
                          <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Publish Date
                    </Label>
                    <Input
                      type="datetime-local"
                      value={formData.publishedAt ? formData.publishedAt.toISOString().slice(0, 16) : ''}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        setFormData(prev => ({ ...prev, publishedAt: date }));
                      }}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-slate-700">
                      Featured Article
                    </Label>
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <Clock className="h-4 w-4" />
                    <span>Est. reading time: {formData.readingTime} min</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Tag className="h-5 w-5 text-orange-600" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {TAG_SUGGESTIONS.map(tag => (
                      <Badge
                        key={tag}
                        variant={formData.tags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer transition-all text-xs ${
                          formData.tags.includes(tag) 
                            ? 'bg-orange-500 hover:bg-orange-600' 
                            : 'hover:bg-orange-50 hover:border-orange-300'
                        }`}
                        onClick={() => formData.tags.includes(tag) ? removeTag(tag) : setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add custom tag..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={addTag}
                      size="sm"
                      variant="outline"
                      className="px-4"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                      {formData.tags.map(tag => (
                        <Badge key={tag} className="bg-orange-500 hover:bg-orange-600">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 hover:bg-orange-700 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Upload className="h-5 w-5 text-indigo-600" />
                    Featured Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    value={formData.featuredImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="Enter image URL..."
                  />
                  {formData.featuredImage && (
                    <div className="mt-3">
                      <img 
                        src={formData.featuredImage} 
                        alt="Preview" 
                        className="w-full h-32 object-cover rounded-lg border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* SEO Settings (Advanced) */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle 
                    className="flex items-center gap-2 text-lg cursor-pointer"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    <Globe className="h-5 w-5 text-teal-600" />
                    SEO Settings
                    <Badge variant="outline" className="ml-auto">
                      {showAdvanced ? 'Hide' : 'Show'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                {showAdvanced && (
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                        SEO Title
                      </Label>
                      <Input
                        value={formData.metaTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                        placeholder="SEO optimized title..."
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                        SEO Description
                      </Label>
                      <Textarea
                        value={formData.metaDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                        placeholder="SEO meta description..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t bg-white/80 backdrop-blur-sm -mx-6 px-6 pb-6 rounded-b-2xl">
            <div className="flex gap-3">
              <Button 
                type="button"
                variant="outline"
                onClick={(e) => handleSubmit(e, 'draft')}
                disabled={isLoading}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {isLoading ? 'Saving...' : 'Save Draft'}
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            </div>

            <div className="flex gap-3">
              
              <Button 
                type="submit"
                disabled={isLoading || !formData.title || !formData.summary || !formData.content || !formData.category}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2 px-8"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Blog
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}