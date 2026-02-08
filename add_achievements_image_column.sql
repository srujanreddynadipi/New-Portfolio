-- ============================================
-- ADD IMAGE COLUMN TO ACHIEVEMENTS TABLE
-- Run this in your Supabase SQL Editor if your achievements table already exists
-- ============================================

-- Add image column to achievements table
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS image TEXT;

-- Note: This migration is safe to run multiple times
-- The IF NOT EXISTS clause ensures the column is only added if it doesn't exist
