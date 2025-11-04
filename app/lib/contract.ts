// Contract configuration
// Base Sepolia: 0xaf8A1d2b0008c861e6Fb338A4556e6A0135914eb
export const POLL_CONTRACT_ADDRESS = 
  (process.env.NEXT_PUBLIC_POLL_CONTRACT_ADDRESS as `0x${string}`) || 
  '0xaf8A1d2b0008c861e6Fb338A4556e6A0135914eb' as `0x${string}`

// Contract ABI - will be generated after deployment
// For now, using minimal ABI for testing
export const POLL_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: 'string', name: '_question', type: 'string' },
      { internalType: 'string[]', name: '_options', type: 'string[]' },
      { internalType: 'uint256', name: '_duration', type: 'uint256' },
    ],
    name: 'createPoll',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_pollId', type: 'uint256' },
      { internalType: 'uint256', name: '_optionIndex', type: 'uint256' },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_pollId', type: 'uint256' }],
    name: 'getPoll',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'address', name: 'creator', type: 'address' },
      { internalType: 'string', name: 'question', type: 'string' },
      { internalType: 'string[]', name: 'options', type: 'string[]' },
      { internalType: 'uint256', name: 'endTime', type: 'uint256' },
      { internalType: 'uint256', name: 'totalVotes', type: 'uint256' },
      { internalType: 'bool', name: 'exists', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_pollId', type: 'uint256' }],
    name: 'getAllVoteCounts',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_pollId', type: 'uint256' },
      { internalType: 'address', name: '_voter', type: 'address' },
    ],
    name: 'hasUserVoted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPollCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'pollId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'creator', type: 'address' },
      { internalType: 'string', name: 'question', type: 'string' },
      { internalType: 'string[]', name: 'options', type: 'string[]' },
      { internalType: 'uint256', name: 'endTime', type: 'uint256' },
    ],
    name: 'PollCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'pollId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'voter', type: 'address' },
      { internalType: 'uint256', name: 'optionIndex', type: 'uint256' },
    ],
    name: 'VoteCast',
    type: 'event',
  },
] as const

