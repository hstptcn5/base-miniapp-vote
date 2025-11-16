'use client'

import { useParams, useRouter } from 'next/navigation'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Wallet } from '@coinbase/onchainkit/wallet'
import { ConnectWallet } from '@coinbase/onchainkit/wallet'
import { Avatar, Name } from '@coinbase/onchainkit/identity'
import Link from 'next/link'
import { usePoll, useHasUserVoted } from '@/app/hooks/usePoll'
import { POLL_CONTRACT_ADDRESS, POLL_CONTRACT_ABI } from '@/app/lib/contract'

export default function PollDetail() {
  const params = useParams()
  const router = useRouter()
  const { isConnected, address, connector } = useAccount()
  const pollId = params.id ? Number(params.id) : undefined

  const { poll, votes, isLoading: isLoadingPoll } = usePoll(pollId || 0)
  const { hasVoted, isLoading: isLoadingVoteStatus } = useHasUserVoted(pollId || 0, address)

  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleVote = async (optionIndex: number) => {
    if (!isConnected) {
      alert('Please connect your wallet to vote')
      return
    }

    if (!pollId) {
      alert('Invalid poll ID')
      return
    }

    if (!POLL_CONTRACT_ADDRESS) {
      alert('Contract address not configured')
      return
    }

    if (hasVoted) {
      alert('You have already voted on this poll')
      return
    }

    try {
      writeContract({
        address: POLL_CONTRACT_ADDRESS as `0x${string}`,
        abi: POLL_CONTRACT_ABI,
        functionName: 'vote',
        args: [BigInt(pollId), BigInt(optionIndex)],
      })
    } catch (err) {
      console.error('Error voting:', err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
          <p className="text-gray-600 mb-6">You need to connect your wallet to vote</p>
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
          </Wallet>
        </div>
      </div>
    )
  }

  if (isLoadingPoll || isLoadingVoteStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading poll...</p>
        </div>
      </div>
    )
  }

  if (!poll || !poll.exists) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Poll not found</h2>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Polls
          </Link>
        </div>
      </div>
    )
  }

  const totalVotes = votes ? votes.reduce((a, b) => a + b, 0) : 0
  const isPollEnded = Number(poll.endTime) * 1000 < Date.now()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Polls
          </Link>
        </div>
      </header>

      {/* Poll Detail */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {isPollEnded && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">⚠️ This poll has ended</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">Error: {error.message}</p>
            </div>
          )}

          {isSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">✅ Vote recorded successfully!</p>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-6">{poll.question}</h1>

          {hasVoted && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                ✓ You have already voted on this poll
              </p>
            </div>
          )}

          {votes && (
            <div className="space-y-4 mb-6">
              {poll.options.map((option, index) => {
                const voteCount = votes[index] || 0
                const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0

                return (
                  <div key={index}>
                    <button
                      onClick={() => handleVote(index)}
                      disabled={hasVoted || isPending || isConfirming || isPollEnded}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        hasVoted
                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                          : isPollEnded
                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                          : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                      } ${isPending || isConfirming ? 'opacity-50 cursor-wait' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{option}</span>
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
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>{totalVotes} total votes</span>
              <span>Created by {poll.creator.slice(0, 6)}...{poll.creator.slice(-4)}</span>
            </div>
            <div className="text-sm text-gray-500">
              Ends: {new Date(Number(poll.endTime) * 1000).toLocaleString()}
            </div>
          </div>

          {/* Share Button */}
          <div className="mt-6">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert('Poll link copied to clipboard!')
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Share Poll
            </button>
          </div>

          {hash && (
            <p className="mt-4 text-sm text-gray-500 text-center">
              Transaction: {hash.slice(0, 10)}...{hash.slice(-8)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
