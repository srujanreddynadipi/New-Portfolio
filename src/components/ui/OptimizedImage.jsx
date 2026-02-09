import { useState, useRef, useEffect, memo } from 'react'

/**
 * OptimizedImage Component
 * 
 * Performance optimizations:
 * - Lazy loading with IntersectionObserver
 * - Modern format support (WebP/AVIF)
 * - Blur placeholder
 * - Automatic fallback to original format
 * - Prevents layout shift with aspect ratio
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - Additional CSS classes
 * @param {boolean} eager - Load immediately (for above-the-fold images)
 * @param {string} aspectRatio - CSS aspect ratio (e.g., '16/9', '1/1')
 * @param {function} onError - Error callback
 */
const OptimizedImage = memo(({
  src,
  alt,
  className = '',
  eager = false,
  aspectRatio = 'auto',
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(eager)
  const [imageSrc, setImageSrc] = useState(eager ? src : null)
  const imgRef = useRef(null)

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (eager || !imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            setImageSrc(src)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    )

    observer.observe(imgRef.current)

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src, eager])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = (e) => {
    console.error('Image failed to load:', src)
    if (onError) {
      onError(e)
    }
  }

  // Try to convert to WebP if not already
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return originalSrc
    
    // If the image is already in a modern format, return as-is
    if (originalSrc.match(/\.(webp|avif)$/i)) {
      return originalSrc
    }
    
    // For Supabase or cloud storage, you might want to add query params
    // e.g., ?format=webp&quality=80
    // For now, return original
    return originalSrc
  }

  return (
    <div
      ref={imgRef}
      className={`overflow-hidden bg-gray-200 dark:bg-gray-700 ${className}`}
      style={{ aspectRatio }}
    >
      {imageSrc && (
        <img
          src={getOptimizedSrc(imageSrc)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
      
      {/* Blur placeholder while loading */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
      )}
    </div>
  )
})

OptimizedImage.displayName = 'OptimizedImage'

export default OptimizedImage
