'use client'

import { createConnector, normalizeChainId } from '@wagmi/core'
import { getAddress, type Address, type Chain } from 'viem'
import { baseSepolia } from 'wagmi/chains'

// Dynamically import SDK to avoid errors if not available
async function getSDK() {
  try {
    const module = await import('@farcaster/miniapp-sdk')
    return module.sdk
  } catch (error) {
    // SDK not available - this is fine for non-Farcaster environments
    return null
  }
}

export function farcasterConnector() {
  return createConnector((config) => ({
    id: 'farcaster',
    name: 'Farcaster Wallet',
    type: 'injected',
    
    async connect(parameters) {
      const chainId = parameters?.chainId ?? config.chains[0].id
      const accounts = await this.getAccounts()
      
      return {
        accounts,
        chainId,
      }
    },

    async disconnect() {
      // Farcaster wallet doesn't need explicit disconnect
    },

    async getAccounts() {
      try {
        const sdkInstance = await getSDK()
        if (!sdkInstance) {
          throw new Error('Farcaster SDK not available')
        }
        const context = await sdkInstance.context
        if (!context?.accountAddress) {
          throw new Error('Farcaster wallet not available')
        }
        return [getAddress(context.accountAddress) as Address]
      } catch (error) {
        throw new Error('Failed to get Farcaster wallet address')
      }
    },

    async getChainId() {
      try {
        const sdkInstance = await getSDK()
        if (!sdkInstance) {
          return config.chains[0].id
        }
        const context = await sdkInstance.context
        // Farcaster wallet should be on Base, default to Base Sepolia
        return baseSepolia.id
      } catch (error) {
        return config.chains[0].id
      }
    },

    async isAuthorized() {
      try {
        const accounts = await this.getAccounts()
        return accounts.length > 0
      } catch {
        return false
      }
    },

    async switchChain({ chainId }) {
      const chain = config.chains.find((c) => c.id === chainId)
      if (!chain) {
        throw new Error(`Chain ${chainId} not found`)
      }
      // Farcaster wallet switching is handled by the SDK
      return chain
    },

    onAccountsChanged(accounts) {
      if (accounts.length === 0) {
        config.emitter.emit('disconnect')
      } else {
        config.emitter.emit('change', { accounts: accounts.map(getAddress) })
      }
    },

    onChainChanged(chainId) {
      const id = normalizeChainId(chainId)
      config.emitter.emit('change', { chainId: id })
    },

    async getProvider() {
      try {
        const sdkInstance = await getSDK()
        if (!sdkInstance) {
          throw new Error('Farcaster SDK not available')
        }
        
        const context = await sdkInstance.context
        if (!context) {
          throw new Error('Farcaster context not available')
        }
        
        const signer = await context.getSigner()
        if (!signer) {
          throw new Error('Farcaster signer not available')
        }

        // Create a provider-like object that implements EIP-1193
        const provider = {
          request: async ({ method, params }: any) => {
            try {
              if (method === 'eth_requestAccounts') {
                return await this.getAccounts()
              }
              if (method === 'eth_accounts') {
                return await this.getAccounts()
              }
              if (method === 'eth_sendTransaction' && params) {
                const tx = params[0]
                return await signer.sendTransaction(tx)
              }
              if (method === 'eth_signTransaction' && params) {
                const tx = params[0]
                return await signer.signTransaction(tx)
              }
              if (method === 'personal_sign' && params) {
                const message = params[0]
                return await signer.signMessage({ message: { raw: message as `0x${string}` } })
              }
              if (method === 'eth_sign' && params) {
                const message = params[1]
                return await signer.signMessage({ message: { raw: message as `0x${string}` } })
              }
              if (method === 'eth_signTypedData_v4' && params) {
                const typedData = JSON.parse(params[1] as string)
                return await signer.signTypedData(typedData)
              }
              if (method === 'eth_chainId') {
                return `0x${(await this.getChainId()).toString(16)}`
              }
              throw new Error(`Method ${method} not supported`)
            } catch (error) {
              console.error(`Error in provider request (${method}):`, error)
              throw error
            }
          },
        }
        return provider
      } catch (error) {
        console.error('Error getting Farcaster provider:', error)
        throw new Error('Farcaster provider not available')
      }
    },
  }))
}

