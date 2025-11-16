'use client'

import { useState } from 'react'
import { useFarcasterWallet } from '@/app/hooks/useFarcasterWallet'
import { useAccount, useConnect } from 'wagmi'
import { farcasterConnector } from '@/app/lib/farcasterConnector'

export function FarcasterWallet() {
  const { address: farcasterAddress, isAvailable, isLoading } = useFarcasterWallet()
  const { address: connectedAddress, isConnected, connector } = useAccount()
  const { connect, isPending } = useConnect()
  const [isConnecting, setIsConnecting] = useState(false)

  // Don't show if Farcaster wallet is not available
  if (isLoading || !isAvailable) {
    return null
  }

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      
      // Verify Farcaster context is available before creating connector
      if (!farcasterAddress) {
        throw new Error('Farcaster wallet not available')
      }
      
      const connectorInstance = farcasterConnector()
      await connect({ connector: connectorInstance })
    } catch (error) {
      console.error('Error connecting Farcaster wallet:', error)
      // Don't show alert if error is just wallet not available
      if (error instanceof Error && !error.message.includes('not available')) {
        alert('Failed to connect Farcaster wallet. Make sure you\'re running this in a Farcaster miniapp.')
      }
    } finally {
      setIsConnecting(false)
    }
  }

  // Show Farcaster wallet as connected if address matches
  const isFarcasterConnected = 
    farcasterAddress && 
    isConnected && 
    connectedAddress?.toLowerCase() === farcasterAddress.toLowerCase() &&
    connector?.id === 'farcaster'

  if (isFarcasterConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
          </svg>
          Farcaster Wallet
        </div>
      </div>
    )
  }

  // Show connect button if Farcaster wallet is available but not connected
  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting || isPending}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
    >
      {(isConnecting || isPending) ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Connecting...
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
          Connect Farcaster Wallet
        </>
      )}
    </button>
  )
}

