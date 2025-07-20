# DevFeranmi Blog - Frontend v2

A modern, professional blog platform built with React, TypeScript, and cutting-edge web technologies. Features a sleek admin dashboard for content management and a beautiful public interface for readers.

## ✨ Features

### 🎨 Modern Design
- **Glassmorphism UI** with backdrop blur effects
- **Responsive design** optimized for all devices  
- **Dark/Light mode** support
- **Smooth animations** with Framer Motion
- **Beautiful gradients** and modern typography

### 📝 Content Management
- **Rich text editor** with Quill.js
- **Blog creation & editing** with real-time preview
- **Image upload** and featured image support
- **SEO optimization** with meta tags and Open Graph
- **Category & tag management**
- **Draft and publish workflow**

### 🔍 User Experience
- **Advanced search** and filtering
- **Blog recommendations** based on related content
- **Reading progress** indicator
- **Social sharing** with dynamic previews
- **Reading time estimation**
- **Mobile-optimized** interface

### 🚀 Performance & SEO
- **Dynamic meta tags** for social media sharing
- **Open Graph** and Twitter Card support
- **JSON-LD structured data** for search engines
- **Optimized images** and lazy loading
- **Fast page transitions**

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **TanStack Query** - Server state management

### UI Components
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Beautiful component library
- **Lucide React** - Modern icon library
- **Sonner** - Toast notifications

### State & Data
- **React Helmet Async** - Dynamic head management
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API server running

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-forge-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```bash
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── blog/           # Blog-specific components
│   ├── layout/         # Layout components (Header, etc.)
│   ├── seo/           # SEO and meta tag components
│   └── ui/            # Base UI components (shadcn/ui)
├── features/           # Feature-based modules
│   ├── admin/         # Admin dashboard features
│   └── blog/          # Public blog features
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and types
├── pages/             # Route components
├── services/          # API services and data fetching
│   └── api/          # API client and endpoints
└── types/            # TypeScript type definitions
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run build:dev       # Build for development
npm run preview         # Preview production build
npm run lint            # Run ESLint
```

## 🌟 Key Features Explained

### Admin Dashboard
- **Blog Management**: Create, edit, delete, and manage blog posts
- **Rich Text Editor**: WYSIWYG editor with formatting options
- **Media Management**: Upload and manage featured images
- **SEO Tools**: Meta tags, descriptions, and social media previews
- **Publishing Workflow**: Draft, review, and publish content

### Public Blog Interface  
- **Modern Grid Layout**: Beautiful card-based blog listing
- **Advanced Filtering**: Search by category, tags, and keywords
- **Reading Experience**: Optimized typography and reading flow
- **Social Sharing**: Dynamic previews for Twitter, Facebook, etc.
- **Mobile First**: Responsive design for all screen sizes

### SEO & Performance
- **Dynamic Meta Tags**: Automatic SEO optimization per page
- **Open Graph**: Rich social media previews
- **Structured Data**: JSON-LD for better search indexing
- **Fast Loading**: Optimized images and code splitting

## 🔗 API Integration

The frontend communicates with a REST API for:
- **Authentication**: Admin login and session management
- **Blog Management**: CRUD operations for blog posts
- **Media Upload**: Image upload and management
- **Public API**: Blog listing and individual post retrieval

### API Endpoints
```
GET /api/v1/blogs              # Get public blogs
GET /api/v1/blogs/:slug        # Get single blog post
POST /api/v1/admin/blogs       # Create new blog (admin)
PUT /api/v1/admin/blogs/:id    # Update blog (admin)
DELETE /api/v1/admin/blogs/:id # Delete blog (admin)
```

## 🎨 Styling & Theming

### Design System
- **Color Palette**: Professional blue/slate theme
- **Typography**: Inter font with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable design tokens

### Customization
Modify the design system in:
- `src/index.css` - CSS custom properties
- `tailwind.config.ts` - Tailwind configuration
- `src/components/ui/` - Component styles

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify
```bash
# Build
npm run build

# Deploy dist folder to Netlify
```

## 🔧 Environment Variables

```bash
# API Configuration
VITE_API_BASE_URL=your-api-url

# Optional: Analytics
VITE_GA_TRACKING_ID=your-ga-id

# Optional: Feature Flags
VITE_ENABLE_ANALYTICS=true
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow ESLint configuration
- Use meaningful component and variable names
- Add JSDoc comments for complex functions

### Component Structure
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow React best practices
- Use custom hooks for shared logic

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Type Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

**API Connection Issues**
- Verify `VITE_API_BASE_URL` in `.env.local`
- Check if backend server is running
- Confirm API endpoints are accessible

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Guide](https://www.typescriptlang.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Framer Motion Guide](https://www.framer.com/motion)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Feranmi** - Senior Software Engineer
- Website: [devferanmi.com](https://devferanmi.com)
- Twitter: [@devferanmi](https://twitter.com/devferanmi)
- LinkedIn: [linkedin.com/in/feranmi](https://linkedin.com/in/feranmi)

---

Built with ❤️ by [DevFeranmi](https://devferanmi.com)
