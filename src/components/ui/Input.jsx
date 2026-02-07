import { useId } from 'react'
import { AlertCircle } from 'lucide-react'

/**
 * Accessible Input Component
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.error - Error message
 * @param {string} props.hint - Helper text
 * @param {string} props.type - Input type
 * @param {boolean} props.required - Required field
 * @param {string} props.id - Custom ID (auto-generated if not provided)
 * @param {string} props.className - Additional classes
 */
export const Input = ({
  label,
  error,
  hint,
  type = 'text',
  required = false,
  id: customId,
  className = '',
  ...props
}) => {
  const autoId = useId()
  const inputId = customId || autoId
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {hint && !error && (
        <p id={hintId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
