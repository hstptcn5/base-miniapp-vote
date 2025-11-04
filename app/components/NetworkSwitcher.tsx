'use client'

import { useEffect } from 'react'
import { useAccount, useSwitchChain, useChainId } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'

export function NetworkSwitcher() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  useEffect(() => {
    if (isConnected && chainId !== baseSepolia.id) {
      // Try to switch to Base Sepolia
      switchChain({ chainId: baseSepolia.id }).catch((error) => {
        console.error('Failed to switch network:', error)
        // User might need to add the network manually
        alert(
          'Please switch to Base Sepolia network manually in your wallet.\n\n' +
          'Network details:\n' +
          'Network Name: Base Sepolia\n' +
          'RPC URL: https://sepolia.base.org\n' +
          'Chain ID: 84532\n' +
          'Currency Symbol: ETH'
        )
      })
    }
  }, [isConnected, chainId, switchChain])

  return null
}

