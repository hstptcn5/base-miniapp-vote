# Deployment Information

## Contract Details

**Contract Address**: `0xaf8A1d2b0008c861e6Fb338A4556e6A0135914eb`

**Network**: Base Sepolia (Chain ID: 84532)

**Deployment Transaction**: 
- Hash: `0x4e1254b54d1c97251818b06072515bd276f0ae5f07f1ae2343893ac3f1fa58ce`
- Block: 33243172
- Gas Used: 837,142
- Gas Price: 0.001000072 gwei
- Total Cost: 0.000000837202274224 ETH

**Explorer**: https://sepolia.basescan.org/address/0xaf8A1d2b0008c861e6Fb338A4556e6A0135914eb

## Frontend Configuration

Contract address đã được hardcode trong `app/lib/contract.ts` cho Base Sepolia.

Nếu muốn override, thêm vào `.env.local`:

```env
NEXT_PUBLIC_POLL_CONTRACT_ADDRESS=0xaf8A1d2b0008c861e6Fb338A4556e6A0135914eb
```

## Next Steps

1. **Test Frontend**:
   ```bash
   npm run dev
   ```

2. **Create a Poll**: 
   - Connect wallet
   - Go to /create
   - Create a test poll

3. **Vote on Poll**:
   - Go to poll detail page
   - Vote on an option

4. **Verify on Explorer**:
   - Check contract on Basescan
   - View transactions

## Contract Functions

- `createPoll(string question, string[] options, uint256 duration)` - Create new poll
- `vote(uint256 pollId, uint256 optionIndex)` - Vote on poll
- `getPoll(uint256 pollId)` - Get poll details
- `getAllVoteCounts(uint256 pollId)` - Get vote counts
- `hasUserVoted(uint256 pollId, address voter)` - Check if user voted

## Notes

- Contract deployed on Base Sepolia testnet
- Gas fees are very low (~0.0000008 ETH)
- Contract is ready for testing
- Remember to update contract address if deploying to mainnet

