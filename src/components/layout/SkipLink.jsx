/**
 * Skip to Main Content Link
 * Provides keyboard users a way to skip navigation and jump to main content
 */
export const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-primary-500 focus:text-white focus:rounded-lg focus:shadow-xl focus:ring-2 focus:ring-primary-300 focus:outline-none transition-all"
    >
      Skip to main content
    </a>
  )
}

export default SkipLink
