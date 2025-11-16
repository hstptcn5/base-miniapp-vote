'use client'

import { useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'
import { Wallet } from '@coinbase/onchainkit/wallet'
import { ConnectWallet, WalletDropdown } from '@coinbase/onchainkit/wallet'
import { Avatar, Name, Address, EthBalance, Identity } from '@coinbase/onchainkit/identity'
import { WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet'
import Link from 'next/link'
import { useAccount, useChainId } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { usePollCount, usePoll } from '@/app/hooks/usePoll'
import { POLL_CONTRACT_ADDRESS } from '@/app/lib/contract'
import { FarcasterWallet } from '@/app/components/FarcasterWallet'

function PollCard({ pollId }: { pollId: number }) {
  const { poll, votes, isLoading } = usePoll(pollId)

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!poll || !poll.exists) {
    return null
  }

  const totalVotes = votes ? votes.reduce((a, b) => a + b, 0) : 0

  return (
    <Link href={`/poll/${pollId}`}>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-xl font-semibold mb-4">{poll.question}</h3>

        {votes && (
          <div className="space-y-2 mb-4">
            {poll.options.slice(0, 2).map((option, index) => {
              const voteCount = votes[index] || 0
              const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0
              return (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{option}</span>
                    <span className="text-sm text-gray-600">
                      {voteCount} votes ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
            {poll.options.length > 2 && (
              <p className="text-sm text-gray-500 mt-2">
                +{poll.options.length - 2} more options
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{totalVotes} total votes</span>
          <span>Created by {poll.creator.slice(0, 6)}...{poll.creator.slice(-4)}</span>
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  const { isConnected, connector } = useAccount()
  const chainId = useChainId()
  const { pollCount, isLoading: isLoadingCount } = usePollCount()
  
  const isWrongNetwork = isConnected && chainId !== baseSepolia.id

  // Generate array of poll IDs (from 1 to pollCount)
  const pollIds = Array.from({ length: pollCount }, (_, i) => i + 1).reverse()

  // Call sdk.actions.ready() when app is ready to hide splash screen
  useEffect(() => {
    sdk.actions.ready()
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Poll App</h1>

          <div className="flex items-center gap-3">
            <FarcasterWallet />
            {/* Only show OnchainKit Wallet if Farcaster wallet is not connected */}
            {!(isConnected && connector?.id === 'farcaster') && (
              <Wallet>
                <ConnectWallet>
                  <Avatar className="h-6 w-6" />
                  <Name />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Welcome to Poll App</h2>
            <p className="text-gray-600 mb-8">
              Connect your wallet to create and vote on polls!
            </p>
            <div className="flex justify-center gap-4">
              <FarcasterWallet />
            </div>
          </div>
        ) : isWrongNetwork ? (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4 text-yellow-800">Wrong Network</h2>
              <p className="text-yellow-700 mb-4">
                Please switch to <strong>Base Sepolia</strong> network in your wallet.
              </p>
              <p className="text-sm text-yellow-600">
                The app will automatically switch networks when you connect, or you can switch manually in MetaMask.
              </p>
            </div>
          </div>
        ) : (
          <>
            {!POLL_CONTRACT_ADDRESS && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  ⚠️ Contract not deployed. Please deploy the contract first and add the address to .env.local
                </p>
              </div>
            )}

            {/* Create Poll Button */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Active Polls</h2>
              <Link
                href="/create"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Create New Poll
              </Link>
            </div>

            {/* Polls List */}
            {isLoadingCount ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading polls...</p>
              </div>
            ) : pollIds.length > 0 ? (
              <div>
                {pollIds.map((pollId) => (
                  <PollCard key={pollId} pollId={pollId} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600 mb-4">No polls yet. Create the first one!</p>
                <Link
                  href="/create"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                >
                  Create Poll
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
