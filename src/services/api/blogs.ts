// Blog service factory - switches between mock and real API
import { blogsService } from './blogs.service';
import { blogsMockService } from './blogs.mock';
import { publicBlogsService } from './blogs/public.service';

// Use mock service in development, real service in production
const USE_MOCK_API = process.env.NODE_ENV === 'development' || process.env.REACT_APP_USE_MOCK === 'true';

export const blogsApi = USE_MOCK_API ? blogsMockService : blogsService;

// Export public blogs service (always real API)
export { publicBlogsService };
export type { PublicBlog, PublicBlogsResponse, PublicBlogsParams } from './blogs/public.service';