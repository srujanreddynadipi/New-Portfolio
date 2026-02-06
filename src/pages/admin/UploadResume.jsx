import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Download } from 'lucide-react'
import { resumeService } from '../../services/resumeService'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const UploadResume = () => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [currentResume, setCurrentResume] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError(null)
    } else {
      setError('Please select a PDF file')
      setFile(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)
    setSuccess(false)

    const { data, error } = await resumeService.uploadResume(file)

    if (error) {
      setError(error)
    } else {
      setSuccess(true)
      setCurrentResume(data)
      setFile(null)
      // Reset file input
      document.getElementById('resume-upload').value = ''
    }

    setUploading(false)
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Resume
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload your resume PDF to Supabase Storage
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card hover={false}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Upload New Resume
          </h2>

          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer text-primary-600 dark:text-primary-400 hover:underline"
              >
                Click to upload
              </label>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                PDF files only (Max 5MB)
              </p>
            </div>

            {file && (
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    {file.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-600 dark:text-green-400">
                  Resume uploaded successfully!
                </p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full"
            >
              {uploading ? 'Uploading...' : 'Upload Resume'}
            </Button>
          </div>
        </Card>

        {/* Current Resume Section */}
        <Card hover={false}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Current Resume
          </h2>

          {currentResume ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Resume URL:
                </p>
                <p className="text-xs text-gray-900 dark:text-white break-all">
                  {currentResume}
                </p>
              </div>

              <a
                href={currentResume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full inline-flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Current Resume
              </a>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No resume uploaded yet
              </p>
            </div>
          )}
        </Card>
      </div>

      <Card hover={false} className="mt-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Instructions
        </h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-primary-500 mr-2">•</span>
            Upload your resume in PDF format
          </li>
          <li className="flex items-start">
            <span className="text-primary-500 mr-2">•</span>
            The resume will be stored in Supabase Storage
          </li>
          <li className="flex items-start">
            <span className="text-primary-500 mr-2">•</span>
            You can download or share the public URL
          </li>
          <li className="flex items-start">
            <span className="text-primary-500 mr-2">•</span>
            Maximum file size: 5MB
          </li>
        </ul>
      </Card>
    </div>
  )
}

export default UploadResume
