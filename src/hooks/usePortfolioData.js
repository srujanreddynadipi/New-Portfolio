import { useState, useEffect } from 'react'
import { portfolioData } from '../data/data'
import { skillsService } from '../services/skillsService'
import { experienceService } from '../services/experienceService'
import { certificationsService } from '../services/certificationsService'
import { achievementsService } from '../services/achievementsService'
import { projectService } from '../services/projectService'
import { blogService } from '../services/blogService'

/**
 * Custom hook for fetching data with Supabase-first, static fallback strategy
 * Includes caching for performance optimization
 * 
 * @param {Function} fetchFunction - Supabase service function to call
 * @param {*} staticData - Fallback static data
 * @param {string} cacheKey - Unique key for localStorage caching
 * @param {number} cacheTime - Cache duration in milliseconds (default: 5 minutes)
 * @returns {Object} { data, loading, error, refetch }
 */
export const useDualModeData = (
  fetchFunction,
  staticData,
  cacheKey,
  cacheTime = 5 * 60 * 1000 // 5 minutes default
) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check cache first
      const cached = getCachedData(cacheKey, cacheTime)
      if (cached) {
        setData(cached)
        setLoading(false)
        return
      }

      // Try fetching from Supabase
      const { data: supabaseData, error: supabaseError } = await fetchFunction()

      if (supabaseError) {
        console.warn(`Supabase fetch failed for ${cacheKey}:`, supabaseError)
        // Fallback to static data
        setData(staticData)
        setLoading(false)
        return
      }

      // Use Supabase data if available and not empty
      if (supabaseData && (Array.isArray(supabaseData) ? supabaseData.length > 0 : Object.keys(supabaseData).length > 0)) {
        setData(supabaseData)
        setCachedData(cacheKey, supabaseData)
      } else {
        // Fallback to static data if Supabase returns empty
        console.info(`Using static data for ${cacheKey} (Supabase returned empty)`)
        setData(staticData)
      }

      setLoading(false)
    } catch (err) {
      console.error(`Error fetching data for ${cacheKey}:`, err)
      setError(err.message)
      // Fallback to static data on error
      setData(staticData)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [cacheKey])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

/**
 * Get cached data from localStorage
 */
const getCachedData = (key, maxAge) => {
  try {
    const cached = localStorage.getItem(`portfolio_cache_${key}`)
    if (!cached) return null

    const { data, timestamp } = JSON.parse(cached)
    const age = Date.now() - timestamp

    if (age > maxAge) {
      localStorage.removeItem(`portfolio_cache_${key}`)
      return null
    }

    return data
  } catch (error) {
    console.error('Cache read error:', error)
    return null
  }
}

/**
 * Set cached data in localStorage
 */
const setCachedData = (key, data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    }
    localStorage.setItem(`portfolio_cache_${key}`, JSON.stringify(cacheData))
  } catch (error) {
    console.error('Cache write error:', error)
  }
}

/**
 * Clear all portfolio cache
 */
export const clearPortfolioCache = () => {
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('portfolio_cache_')) {
        localStorage.removeItem(key)
      }
    })
    console.info('Portfolio cache cleared')
  } catch (error) {
    console.error('Cache clear error:', error)
  }
}

/**
 * Preload all portfolio data
 * Call this on app initialization for better performance
 */
export const preloadPortfolioData = async () => {
  try {
    // Fetch all data in parallel
    const [skills, experience, certifications, achievements, projects, blogs] = await Promise.all([
      skillsService.getAllSkills(),
      experienceService.getAllExperience(),
      certificationsService.getAllCertifications(),
      achievementsService.getAllAchievements(),
      projectService.getAllProjects(),
      blogService.getAllBlogs()
    ])

    // Cache the results
    if (skills.data) setCachedData('skills', skills.data)
    if (experience.data) setCachedData('experience', experience.data)
    if (certifications.data) setCachedData('certifications', certifications.data)
    if (achievements.data) setCachedData('achievements', achievements.data)
    if (projects.data) setCachedData('projects', projects.data)
    if (blogs.data) setCachedData('blogs', blogs.data)

    console.info('Portfolio data preloaded successfully')
  } catch (error) {
    console.error('Preload error:', error)
  }
}

/**
 * Hook specifically for portfolio skills
 */
export const useSkills = () => {
  return useDualModeData(
    skillsService.getAllSkills,
    portfolioData.skills,
    'skills'
  )
}

/**
 * Hook specifically for portfolio experience
 */
export const useExperience = () => {
  return useDualModeData(
    experienceService.getAllExperience,
    portfolioData.experience,
    'experience'
  )
}

/**
 * Hook specifically for portfolio certifications
 */
export const useCertifications = () => {
  return useDualModeData(
    certificationsService.getAllCertifications,
    portfolioData.certifications,
    'certifications'
  )
}

/**
 * Hook specifically for portfolio achievements
 */
export const useAchievements = () => {
  return useDualModeData(
    achievementsService.getAllAchievements,
    portfolioData.achievements,
    'achievements'
  )
}

/**
 * Hook specifically for portfolio projects
 */
export const useProjects = () => {
  return useDualModeData(
    projectService.getAllProjects,
    portfolioData.projects,
    'projects'
  )
}

/**
 * Hook specifically for portfolio blogs
 */
export const useBlogs = () => {
  return useDualModeData(
    blogService.getAllBlogs,
    [],
    'blogs'
  )
}
