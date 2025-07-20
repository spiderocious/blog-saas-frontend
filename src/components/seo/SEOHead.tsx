import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  siteName?: string;
}

export function SEOHead({
  title,
  description,
  image = '/favicon.jpg',
  url = window.location.href,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Feranmi',
  tags = [],
  siteName = 'CrackedChefs By Oluwaferanmi'
}: SEOHeadProps) {
  const fullTitle = `${title} | CrackedChefs By Oluwaferanmi`;
  const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@devferanmi" />
      <meta name="twitter:site" content="@devferanmi" />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
          <meta property="article:section" content="Technology" />
        </>
      )}
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Keywords */}
      {tags.length > 0 && (
        <meta name="keywords" content={tags.join(', ')} />
      )}
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? "Article" : "WebPage",
          "headline": title,
          "description": description,
          "image": fullImageUrl,
          "url": url,
          ...(type === 'article' && {
            "author": {
              "@type": "Person",
              "name": author,
              "url": "https://devferanmi.xyz"
            },
            "publisher": {
              "@type": "Organization",
              "name": siteName,
              "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/favicon.jpg`
              }
            },
            "datePublished": publishedTime,
            "dateModified": modifiedTime || publishedTime,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": url
            }
          })
        })}
      </script>
    </Helmet>
  );
}
