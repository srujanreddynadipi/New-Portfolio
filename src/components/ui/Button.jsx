import { Loader2 } from 'lucide-react'

/**
 * Accessible Button Component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button style variant
 * @param {string} props.type - Button type
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {string} props.ariaLabel - Accessible label
 * @param {boolean} props.pressed - Toggle/pressed state
 * @param {string} props.className - Additional classes
 */
export const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  ariaLabel,
  pressed,
  className = '',
  ...props
}) => {
  const baseStyles =
    'font-medium px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-800'

  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger:
      'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg focus:ring-red-500',
    outline:
      'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
  }

  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading ? 'true' : undefined}
      aria-pressed={pressed !== undefined ? pressed : undefined}
      className={`${baseStyles} ${variants[variant]} ${className} ${loading ? 'relative' : ''}`}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </span>
      )}
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
    </button>
  )
}

export default Button
