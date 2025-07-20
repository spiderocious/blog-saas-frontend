import { 
  AdminSidebar,
  BlogsListPage,
  CreateBlogPage,
  EditBlogPage
} from '@/features/admin';
import { useToast } from '@/hooks/use-toast';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { adminAuthService } from '@/services/api/admin';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check authentication
  const isAuthenticated = adminAuthService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    adminAuthService.logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out'
    });
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar onLogout={handleLogout} />

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<BlogsListPage />} />
            <Route path="blogs" element={<BlogsListPage />} />
            <Route path="blogs/create" element={<CreateBlogPage />} />
            <Route path="blogs/edit/:id" element={<EditBlogPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}