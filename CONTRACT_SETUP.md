# Smart Contract Setup Guide

## 🚀 Quick Start

### 1. Install Foundry

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 2. Setup Environment Variables

Tạo file `.env` trong thư mục `contracts/`:

```bash
cd contracts
cp .env.example .env
```

Edit `.env` và thêm:
- `PRIVATE_KEY`: Private key của wallet để deploy (có Base Sepolia ETH)
- `BASE_SEPOLIA_RPC_URL`: https://sepolia.base.org hoặc Alchemy/Infura URL
- `BASESCAN_API_KEY`: (Optional) Để verify contract

### 3. Get Testnet ETH

Nếu chưa có Base Sepolia ETH:
- Faucet: https://docs.base.org/base-chain/tools/network-faucets
- Hoặc dùng Base Sepolia Faucet

### 4. Build Contract

```bash
cd contracts
forge build
```

### 5. Test Contract

```bash
forge test
forge test -vvv  # verbose output
```

### 6. Deploy to Base Sepolia

```bash
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --broadcast \
  --verify \
  -E BASESCAN_API_KEY
```

Hoặc không verify:

```bash
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --broadcast
```

### 7. Save Contract Address

Sau khi deploy, copy contract address và thêm vào `.env.local` của frontend:

```env
NEXT_PUBLIC_POLL_CONTRACT_ADDRESS=0x...
```

### 8. Test Frontend

```bash
cd ..
npm run dev
```

## 📝 Contract Functions

### Create Poll
```solidity
createPoll(
    string memory _question,
    string[] memory _options,
    uint256 _duration  // in seconds
) returns (uint256 pollId)
```

### Vote
```solidity
vote(
    uint256 _pollId,
    uint256 _optionIndex
)
```

### Get Poll
```solidity
getPoll(uint256 _pollId) returns (
    uint256 id,
    address creator,
    string question,
    string[] options,
    uint256 endTime,
    uint256 totalVotes,
    bool exists
)
```

### Get Vote Counts
```solidity
getAllVoteCounts(uint256 _pollId) returns (uint256[] memory)
```

## 🔍 Verify Contract (Optional)

Sau khi deploy, verify contract trên Basescan:

```bash
forge verify-contract <CONTRACT_ADDRESS> \
  PollContract \
  --chain-id 84532 \
  --etherscan-api-key $BASESCAN_API_KEY
```

## ⚠️ Important Notes

1. **Private Key Security**: Never commit `.env` file với private key
2. **Testnet First**: Luôn test trên Base Sepolia trước
3. **Gas Costs**: Mỗi transaction cần gas, đảm bảo có đủ ETH
4. **Contract Address**: Update `.env.local` sau khi deploy

## 🐛 Troubleshooting

### Issue: "Insufficient funds"
- Check bạn có Base Sepolia ETH
- Get từ faucet: https://docs.base.org/base-chain/tools/network-faucets

### Issue: "Contract not deployed"
- Check `NEXT_PUBLIC_POLL_CONTRACT_ADDRESS` trong `.env.local`
- Verify contract address đúng

### Issue: "Transaction failed"
- Check RPC URL đúng
- Check private key có quyền deploy
- Check gas limit đủ

## 📚 Next Steps

Sau khi contract deployed:
1. Test create poll từ frontend
2. Test vote từ frontend
3. Add gasless transactions (Paymaster)
4. Deploy to Base Mainnet (khi ready)

