'use client'

import { useEffect } from 'react'

/**
 * Suppresses console errors from Chrome extensions
 * These errors don't affect app functionality but can clutter the console
 */
export function ErrorSuppressor() {
  useEffect(() => {
    // Store original error handler
    const originalError = console.error
    const originalWarn = console.warn

    // Override console.error to filter out Chrome extension errors
    console.error = (...args: any[]) => {
      const message = args.join(' ')
      
      // Skip errors from Chrome extensions
      if (
        message.includes('chrome-extension://') ||
        message.includes('Failed to get initial state') ||
        message.includes('Sender: Failed to get initial state')
      ) {
        // Silently ignore extension errors
        return
      }
      
      // Log all other errors normally
      originalError.apply(console, args)
    }

    // Override console.warn for extension warnings too
    console.warn = (...args: any[]) => {
      const message = args.join(' ')
      
      // Skip warnings from Chrome extensions
      if (message.includes('chrome-extension://')) {
        return
      }
      
      // Log all other warnings normally
      originalWarn.apply(console, args)
    }

    // Cleanup on unmount
    return () => {
      console.error = originalError
      console.warn = originalWarn
    }
  }, [])

  // Also handle global error events
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Check if error is from a Chrome extension
      if (
        event.filename?.includes('chrome-extension://') ||
        event.message?.includes('Failed to get initial state')
      ) {
        // Prevent default error handling for extension errors
        event.preventDefault()
        event.stopPropagation()
        return false
      }
    }

    window.addEventListener('error', handleError, true)

    return () => {
      window.removeEventListener('error', handleError, true)
    }
  }, [])

  return null
}

