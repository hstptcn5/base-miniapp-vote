'use client'

import { useState, useEffect } from 'react'
import { getAddress, type Address } from 'viem'

// Dynamically import SDK to avoid errors if not available
async function getSDK() {
  try {
    const { sdk } = await import('@farcaster/miniapp-sdk')
    return sdk
  } catch (error) {
    // SDK not available - this is fine for non-Farcaster environments
    return null
  }
}

export function useFarcasterWallet() {
  const [address, setAddress] = useState<Address | null>(null)
  const [isAvailable, setIsAvailable] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkFarcasterWallet = async () => {
      try {
        setIsLoading(true)
        
        // Dynamically import SDK
        const sdkInstance = await getSDK()
        
        // Skip if SDK is not available
        if (!sdkInstance) {
          setIsAvailable(false)
          return
        }
        
        // Add a small delay to ensure SDK is initialized
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const context = await sdkInstance.context
        // Type assertion for accountAddress which may exist at runtime
        const accountAddress = (context as any)?.accountAddress
        if (accountAddress) {
          const addr = getAddress(accountAddress)
          setAddress(addr)
          setIsAvailable(true)
        } else {
          setIsAvailable(false)
        }
      } catch (error) {
        // Silently handle - Farcaster wallet is optional
        console.log('Farcaster wallet not available (this is normal outside Farcaster context)')
        setIsAvailable(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkFarcasterWallet()
  }, [])

  const connect = async () => {
    try {
      const sdkInstance = await getSDK()
      if (!sdkInstance) {
        throw new Error('Farcaster SDK not available')
      }
      const context = await sdkInstance.context
      const accountAddress = (context as any)?.accountAddress
      if (!accountAddress) {
        throw new Error('Farcaster wallet not available')
      }
      const addr = getAddress(accountAddress)
      setAddress(addr)
      setIsAvailable(true)
      return addr
    } catch (error) {
      console.error('Error connecting Farcaster wallet:', error)
      throw error
    }
  }

  const getSigner = async () => {
    try {
      const sdkInstance = await getSDK()
      if (!sdkInstance) {
        throw new Error('Farcaster SDK not available')
      }
      const context = await sdkInstance.context
      const signer = await (context as any).getSigner()
      return signer
    } catch (error) {
      console.error('Error getting Farcaster signer:', error)
      throw error
    }
  }

  return {
    address,
    isAvailable,
    isLoading,
    connect,
    getSigner,
  }
}

