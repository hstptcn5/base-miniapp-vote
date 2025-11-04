import { useReadContract, useReadContracts } from 'wagmi'
import { POLL_CONTRACT_ADDRESS, POLL_CONTRACT_ABI } from '@/app/lib/contract'

export interface Poll {
  id: bigint
  creator: string
  question: string
  options: string[]
  endTime: bigint
  totalVotes: bigint
  exists: boolean
}

export function usePoll(pollId: number | bigint) {
  const {
    data: pollData,
    isLoading,
    error,
  } = useReadContract({
    address: POLL_CONTRACT_ADDRESS as `0x${string}`,
    abi: POLL_CONTRACT_ABI,
    functionName: 'getPoll',
    args: [BigInt(pollId)],
    query: {
      enabled: !!POLL_CONTRACT_ADDRESS && pollId !== undefined,
    },
  })

  const {
    data: voteCountsData,
    isLoading: isLoadingVotes,
  } = useReadContract({
    address: POLL_CONTRACT_ADDRESS as `0x${string}`,
    abi: POLL_CONTRACT_ABI,
    functionName: 'getAllVoteCounts',
    args: [BigInt(pollId)],
    query: {
      enabled: !!POLL_CONTRACT_ADDRESS && pollId !== undefined,
      refetchInterval: 5000, // Refresh every 5 seconds
    },
  })

  if (!pollData) {
    return {
      poll: null,
      votes: null,
      isLoading: isLoading || isLoadingVotes,
      error,
    }
  }

  const [id, creator, question, options, endTime, totalVotes, exists] = pollData as [
    bigint,
    string,
    string,
    string[],
    bigint,
    bigint,
    boolean,
  ]

  const poll: Poll = {
    id,
    creator,
    question,
    options,
    endTime,
    totalVotes,
    exists,
  }

  const votes = voteCountsData ? (voteCountsData as bigint[]).map(v => Number(v)) : null

  return {
    poll,
    votes,
    isLoading: isLoading || isLoadingVotes,
    error,
  }
}

export function useHasUserVoted(pollId: number | bigint, userAddress: string | undefined) {
  const { data, isLoading } = useReadContract({
    address: POLL_CONTRACT_ADDRESS as `0x${string}`,
    abi: POLL_CONTRACT_ABI,
    functionName: 'hasUserVoted',
    args: [BigInt(pollId), userAddress as `0x${string}`],
    query: {
      enabled: !!POLL_CONTRACT_ADDRESS && !!userAddress && pollId !== undefined,
    },
  })

  return {
    hasVoted: data as boolean | undefined,
    isLoading,
  }
}

export function usePollCount() {
  const { data, isLoading } = useReadContract({
    address: POLL_CONTRACT_ADDRESS as `0x${string}`,
    abi: POLL_CONTRACT_ABI,
    functionName: 'getPollCount',
    query: {
      enabled: !!POLL_CONTRACT_ADDRESS,
      refetchInterval: 10000, // Refresh every 10 seconds
    },
  })

  return {
    pollCount: data ? Number(data as bigint) : 0,
    isLoading,
  }
}

