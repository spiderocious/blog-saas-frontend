/**
 * Utility functions for SEO and Open Graph optimization
 */

export function generateBlogOGImageUrl(blog: {
  title: string;
  featuredImage?: string;
  author?: string;
}): string {
  // If blog has a featured image, use it
  if (blog.featuredImage) {
    return blog.featuredImage;
  }

  // Fallback to default OG image
  return '/og-image.png';
}

export function generateBlogMetaDescription(blog: {
  excerpt: string;
  content?: string;
  skills?: string[];
}): string {
  // Use excerpt if available
  if (blog.excerpt && blog.excerpt.length > 50) {
    return blog.excerpt.length > 155 
      ? `${blog.excerpt.substring(0, 152)}...`
      : blog.excerpt;
  }

  // Fallback to content preview
  if (blog.content) {
    const textContent = blog.content.replace(/<[^>]*>/g, ''); // Strip HTML
    return textContent.length > 155 
      ? `${textContent.substring(0, 152)}...`
      : textContent;
  }

  // Final fallback
  return `Explore this insightful article on software engineering and development practices.`;
}

export function generateStructuredData(blog: {
  title: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt: string;
  updatedAt: string;
  slug: string;
  skills?: string[];
  author?: string;
}) {
  const baseUrl = window.location.origin;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.featuredImage || `${baseUrl}/og-image.png`,
    "url": `${baseUrl}/blog/${blog.slug}`,
    "datePublished": blog.publishedAt,
    "dateModified": blog.updatedAt,
    "author": {
      "@type": "Person",
      "name": blog.author || "Feranmi",
      "url": baseUrl,
      "jobTitle": "Senior Software Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "DevFeranmi",
        "url": baseUrl
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "DevFeranmi",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.jpg`
      },
      "url": baseUrl
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${blog.slug}`
    },
    "keywords": blog.skills?.join(", ") || "software engineering, web development",
    "genre": "Technology",
    "wordCount": blog.excerpt.split(' ').length * 8 // Rough estimate
  };
}
