import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, Plus, AlertCircle, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { adminBlogsService, type AdminBlog, type ApiError } from '@/services/api/admin';

export default function BlogsListPage() {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: blogsResponse, isLoading, error } = useQuery({
    queryKey: ['admin-blogs'],
    queryFn: () => adminBlogsService.getBlogs({ limit: 1000 })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminBlogsService.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
      toast({
        title: 'Blog deleted',
        description: 'The blog post has been successfully deleted.'
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: 'Delete failed',
        description: error.message || 'Failed to delete the blog post.',
        variant: 'destructive'
      });
    },
    onSettled: () => {
      setDeletingId(null);
    }
  });

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    deleteMutation.mutate(id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      technology: 'bg-blue-100 text-blue-800',
      frontend: 'bg-cyan-100 text-cyan-800',
      backend: 'bg-green-100 text-green-800',
      devops: 'bg-red-100 text-red-800',
      tutorial: 'bg-orange-100 text-orange-800',
      opinion: 'bg-yellow-100 text-yellow-800',
      career: 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Skeleton className="w-16 h-16 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    const apiError = error as unknown as ApiError;
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">All Blogs</h1>
            <p className="text-muted-foreground">Manage your blog content</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <div>
                <p className="font-medium">Failed to load blogs</p>
                <p className="text-sm text-muted-foreground">
                  {apiError.message || 'An error occurred while fetching blogs.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const blogs = blogsResponse?.data.blogs || [];
  const pagination = blogsResponse?.data.pagination;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Blogs</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Button asChild>
          <Link to="/admin/blogs/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Blog
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Articles ({blogs.length})</CardTitle>
            {pagination && (
              <div className="text-sm text-muted-foreground">
                Total: {pagination.total} articles
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {blogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No blogs found.</p>
              <Button asChild className="mt-4">
                <Link to="/admin/blogs/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first blog
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog: AdminBlog) => (
                <div key={blog._id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  {blog.featuredImage && (
                    <img 
                      src={blog.featuredImage} 
                      alt={blog.title} 
                      className="w-16 h-16 rounded object-cover flex-shrink-0" 
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge 
                            variant="secondary" 
                            className={getCategoryColor(blog.category)}
                          >
                            {blog.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {blog.readingTime} min read
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            {blog.views} views
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(blog.publishedAt)}
                          </div>
                          {!blog.isPublished && (
                            <Badge variant="outline" className="text-xs">
                              Draft
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/blog/${blog.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/admin/blogs/edit/${blog._id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          disabled={deletingId === blog._id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(blog._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}