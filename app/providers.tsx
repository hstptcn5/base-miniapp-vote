'use client'

import { OnchainKitProvider } from '@coinbase/onchainkit'
import { baseSepolia } from 'wagmi/chains'
import { NetworkSwitcher } from './components/NetworkSwitcher'
import { ErrorSuppressor } from './components/ErrorSuppressor'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''}
      chain={baseSepolia}
      config={{
        appearance: {
          name: 'Poll App',
          logo: '/logo.svg',
          mode: 'auto',
        },
        wallet: {
          display: 'modal',
        },
      }}
    >
      <ErrorSuppressor />
      <NetworkSwitcher />
      {children}
    </OnchainKitProvider>
  )
}


