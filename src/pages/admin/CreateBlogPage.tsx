import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useToast } from '@/hooks/use-toast';
import { adminBlogsService, type ApiError } from '@/services/api/admin';
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
  Globe
} from 'lucide-react';

// Import styles
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  publishedAt: Date | null;
  status: 'draft' | 'published';
  seoTitle: string;
  seoDescription: string;
  readingTime: number;
  author: string;
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

export default function CreateBlogPage() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    featuredImage: '',
    publishedAt: null,
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    readingTime: 0,
    author: 'Admin' // Default author
  });

  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'published' = 'draft') => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare the blog data according to the API specification
      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        featuredImage: formData.featuredImage || undefined,
        category: formData.category,
        tags: formData.tags,
        author: formData.author,
        isPublished: status === 'published',
        seoTitle: formData.seoTitle || formData.title,
        seoDescription: formData.seoDescription || formData.excerpt,
        publishedAt: formData.publishedAt ? formData.publishedAt.toISOString() : undefined
      };

      // Call the real API
      const createdBlog = await adminBlogsService.createBlog(blogData);
      
      toast({
        title: `Blog ${status === 'published' ? 'published' : 'saved as draft'} successfully`,
        description: `Your blog post "${createdBlog.title}" has been ${status === 'published' ? 'published' : 'saved as a draft'}.`
      });
      
      //navigate('/admin/blogs');
    } catch (error) {
      console.error('Error creating blog:', error);
      
      // Handle API errors with more specific messages
      let errorMessage = 'Please try again later.';
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as ApiError).message || errorMessage;
      }
      
      toast({
        title: 'Error creating blog',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Create New Blog Post</h1>
          <p className="text-muted-foreground mt-2">Share your knowledge with the developer community</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/admin/blogs')}>
            Cancel
          </Button>
          <Button 
            onClick={(e) => handleSubmit(e, 'draft')}
            disabled={isLoading}
            variant="outline"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            onClick={(e) => handleSubmit(e, 'published')}
            disabled={isLoading || !formData.title || !formData.content}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Eye className="h-4 w-4 mr-2" />
            {isLoading ? 'Publishing...' : 'Publish Now'}
          </Button>
        </div>
      </motion.div>

      <form onSubmit={(e) => handleSubmit(e, 'published')} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Write an engaging title..."
                      className="text-lg"
                      required
                    />
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt" className="text-sm font-medium">
                      Excerpt
                    </Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief description of your post..."
                      rows={3}
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Content Editor */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <ReactQuill
                        value={formData.content}
                        onChange={handleContentChange}
                        modules={quillModules}
                        formats={quillFormats}
                        theme="snow"
                        placeholder="Start writing your blog post..."
                        style={{ minHeight: '400px' }}
                      />
                    </div>
                    
                    {formData.content && (
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Estimated reading time: {formData.readingTime} min
                        </div>
                        <div>
                          Word count: {formData.content.trim().split(/\s+/).length}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tags & Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-primary" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Tags */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Tags</Label>
                    
                    {/* Selected Tags */}
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                            onClick={() => removeTag(tag)}
                          >
                            #{tag}
                            <X className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Tag Suggestions */}
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Suggested tags (click to add):</div>
                      <div className="flex flex-wrap gap-2">
                        {TAG_SUGGESTIONS.filter(tag => !formData.tags.includes(tag)).slice(0, 8).map((tag) => (
                          <Badge 
                            key={tag}
                            variant="outline" 
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={() => setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Custom Tag Input */}
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add custom tag..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Featured Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="featuredImage" className="text-sm font-medium">
                      Image URL
                    </Label>
                    <Input
                      id="featuredImage"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  {formData.featuredImage && (
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={formData.featuredImage} 
                        alt="Featured" 
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Publishing Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Publishing Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Publication Date */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Publication Date</Label>
                    <DatePicker
                      selected={formData.publishedAt}
                      onChange={(date: Date | null) => setFormData(prev => ({ ...prev, publishedAt: date }))}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full px-3 py-2 border border-input rounded-md"
                      placeholderText="Select publication date (optional)"
                      isClearable
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* SEO Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    SEO Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-sm font-medium">Advanced SEO</Label>
                    <Switch
                      checked={showAdvanced}
                      onCheckedChange={setShowAdvanced}
                    />
                  </div>

                  {showAdvanced && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="seoTitle" className="text-sm font-medium">
                          SEO Title
                        </Label>
                        <Input
                          id="seoTitle"
                          value={formData.seoTitle}
                          onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                          placeholder="Custom SEO title..."
                          maxLength={60}
                        />
                        <div className="text-xs text-muted-foreground">
                          {formData.seoTitle.length}/60 characters
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="seoDescription" className="text-sm font-medium">
                          SEO Description
                        </Label>
                        <Textarea
                          id="seoDescription"
                          value={formData.seoDescription}
                          onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                          placeholder="Custom SEO description..."
                          rows={3}
                          maxLength={160}
                        />
                        <div className="text-xs text-muted-foreground">
                          {formData.seoDescription.length}/160 characters
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </form>
    </div>
  );
}
