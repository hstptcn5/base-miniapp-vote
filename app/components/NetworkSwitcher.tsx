'use client'

import { useEffect } from 'react'
import { useAccount, useSwitchChain, useChainId } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'

export function NetworkSwitcher() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain, error } = useSwitchChain()

  useEffect(() => {
    if (isConnected && chainId !== baseSepolia.id) {
      // Try to switch to Base Sepolia
      switchChain({ chainId: baseSepolia.id })
    }
  }, [isConnected, chainId, switchChain])

  // Show error message if switch fails
  useEffect(() => {
    if (error) {
      console.error('Failed to switch network:', error)
    }
  }, [error])

  return null
}

