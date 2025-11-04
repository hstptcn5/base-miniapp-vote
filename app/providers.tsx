'use client'

import { OnchainKitProvider } from '@coinbase/onchainkit'
import { baseSepolia } from 'wagmi/chains'
import { NetworkSwitcher } from './components/NetworkSwitcher'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''}
      chain={baseSepolia}
      config={{
        appearance: {
          name: 'My Mini App',
          logo: '/logo.png',
          mode: 'auto',
        },
        wallet: {
          display: 'modal',
        },
      }}
    >
      <NetworkSwitcher />
      {children}
    </OnchainKitProvider>
  )
}


