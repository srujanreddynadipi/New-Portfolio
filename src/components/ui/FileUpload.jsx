import { useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import Button from './Button'

const FileUpload = ({ 
  label, 
  accept = "image/*", 
  currentFile, 
  onFileSelect, 
  onRemove,
  preview = true,
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const isImage = currentFile && (
    typeof currentFile === 'string' 
      ? currentFile.match(/\.(jpg|jpeg|png|gif|webp)$/i)
      : currentFile.type?.startsWith('image/')
  )

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
            : 'border-gray-300 dark:border-gray-600'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {currentFile ? (
          <div className="space-y-3">
            {/* Preview */}
            {preview && isImage && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={typeof currentFile === 'string' ? currentFile : URL.createObjectURL(currentFile)}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* File Info */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <ImageIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {typeof currentFile === 'string' 
                    ? currentFile.split('/').pop() 
                    : currentFile.name
                  }
                </span>
              </div>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={onRemove}
                className="flex-shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <label
              htmlFor={`file-upload-${label}`}
              className="cursor-pointer text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              Click to upload
            </label>
            <span className="text-gray-500 dark:text-gray-400"> or drag and drop</span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {accept === 'image/*' 
                ? 'PNG, JPG, GIF, WEBP up to 5MB' 
                : accept === '.pdf'
                ? 'PDF files only up to 5MB'
                : 'Files up to 5MB'
              }
            </p>
          </div>
        )}

        <input
          id={`file-upload-${label}`}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  )
}

export default FileUpload
