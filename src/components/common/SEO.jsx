/**
 * SEO Component using react-helmet-async
 * Manages document head meta tags for SEO optimization
 */
import { Helmet } from 'react-helmet-async'

/**
 * @typedef {Object} SEOProps
 * @property {string} title - Page title
 * @property {string} description - Page description
 * @property {string} [image] - OG image URL
 * @property {string} [url] - Canonical URL
 * @property {string} [type] - OG type (website, article, etc.)
 * @property {string[]} [keywords] - Meta keywords
 * @property {string} [author] - Content author
 */

/**
 * SEO Component for meta tags management
 * @param {SEOProps} props
 */
const SEO = ({
  title,
  description,
  image = '/og-image.jpg',
  url,
  type = 'website',
  keywords = [],
  author = 'Your Name',
}) => {
  const appName = import.meta.env.VITE_APP_NAME || 'Portfolio'
  const appUrl = import.meta.env.VITE_APP_URL || 'https://yourportfolio.com'
  const fullTitle = `${title} | ${appName}`
  const canonicalUrl = url || appUrl
  const imageUrl = image.startsWith('http') ? image : `${appUrl}${image}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content={author} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={appName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  )
}

export default SEO
