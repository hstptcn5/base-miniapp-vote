'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Wallet } from '@coinbase/onchainkit/wallet'
import { ConnectWallet } from '@coinbase/onchainkit/wallet'
import { Avatar, Name } from '@coinbase/onchainkit/identity'
import Link from 'next/link'
import { POLL_CONTRACT_ADDRESS, POLL_CONTRACT_ABI } from '@/app/lib/contract'
import { parseEther } from 'viem'

export default function CreatePoll() {
  const router = useRouter()
  const { isConnected, address } = useAccount()
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [duration, setDuration] = useState(7) // days

  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ''])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!question.trim() || options.some(opt => !opt.trim())) {
      alert('Please fill in all fields')
      return
    }

    if (!POLL_CONTRACT_ADDRESS) {
      alert('Contract address not configured. Please deploy contract first.')
      return
    }

    // Duration in seconds (convert days to seconds)
    const durationInSeconds = duration * 24 * 60 * 60

    try {
      writeContract({
        address: POLL_CONTRACT_ADDRESS as `0x${string}`,
        abi: POLL_CONTRACT_ABI,
        functionName: 'createPoll',
        args: [question, options.filter(opt => opt.trim()), durationInSeconds],
      })
    } catch (err) {
      console.error('Error creating poll:', err)
    }
  }

  // Redirect after successful creation
  if (isSuccess) {
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
          <p className="text-gray-600 mb-6">You need to connect your wallet to create a poll</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Polls
          </Link>
          <h1 className="text-xl font-bold">Create New Poll</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {!POLL_CONTRACT_ADDRESS && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ Contract not deployed. Please deploy the contract first and add the address to .env.local
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">Error: {error.message}</p>
            </div>
          )}

          {isSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                ✅ Poll created successfully! Redirecting...
              </p>
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
              Poll Question
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What is your favorite programming language?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isPending || isConfirming}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options (2-4 options)
            </label>
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={isPending || isConfirming}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      disabled={isPending || isConfirming}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            {options.length < 4 && (
              <button
                type="button"
                onClick={addOption}
                className="mt-3 text-blue-600 hover:underline text-sm"
                disabled={isPending || isConfirming}
              >
                + Add Option
              </button>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              Duration (days)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
              max="365"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isPending || isConfirming}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isPending || isConfirming}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || isConfirming || !POLL_CONTRACT_ADDRESS}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending || isConfirming
                ? 'Creating...'
                : 'Create Poll'}
            </button>
          </div>

          {hash && (
            <p className="mt-4 text-sm text-gray-500 text-center">
              Transaction: {hash.slice(0, 10)}...{hash.slice(-8)}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
