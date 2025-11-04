# Logic của Mini App - Poll/Voting App

## 🎯 Mục tiêu
Xây dựng một Mini App cho phép người dùng tạo và tham gia polls/votes onchain, với khả năng share qua social feed trong Base App.

## 📋 Logic Flow

### 1. User Flow Cơ bản

```
User mở Mini App trong Base App
    ↓
Auto-connect với Base Account (không cần manual connect)
    ↓
Trang chủ hiển thị:
    - Danh sách polls phổ biến
    - Polls từ friends
    - Nút "Create New Poll"
    ↓
User có thể:
    - View polls (xem kết quả real-time)
    - Vote trên polls (gasless transaction)
    - Tạo poll mới
    - Share poll qua Base App feed
```

### 2. Core Features

#### Feature 1: Create Poll
- User nhập:
  - Question (câu hỏi)
  - Options (2-4 lựa chọn)
  - Duration (thời gian poll kéo dài)
- Smart contract tạo poll mới
- Poll được lưu onchain (immutable)
- User nhận NFT proof of creation (optional)

#### Feature 2: Vote on Poll
- User chọn option
- Transaction được gửi onchain (gasless với Paymaster)
- Vote được lưu onchain
- Results update real-time
- User có thể xem vote của friends

#### Feature 3: View Results
- Real-time vote counts (từ onchain data)
- Percentage breakdown
- Visual charts/graphs
- Leaderboard của top voters
- Share results với friends

#### Feature 4: Social Sharing
- Share poll link trong Base App feed
- Embed preview hiển thị poll question và current results
- Friends có thể click và vote trực tiếp

### 3. Smart Contract Logic

```solidity
// Poll Contract Structure
struct Poll {
    uint256 id;
    address creator;
    string question;
    string[] options;
    uint256 endTime;
    mapping(uint256 => uint256) votes; // option => vote count
    mapping(address => bool) hasVoted;
    address[] voters;
}

// Functions:
- createPoll(question, options, duration) → returns pollId
- vote(pollId, optionIndex) → gasless transaction
- getPoll(pollId) → returns poll data
- getResults(pollId) → returns vote counts
- hasUserVoted(pollId, user) → returns boolean
```

### 4. Frontend Components

#### Pages:
1. **Home Page** (`/`)
   - List of active polls
   - Filter: All, Trending, Friends
   - Search bar
   - Create Poll button

2. **Poll Detail Page** (`/poll/[id]`)
   - Poll question và options
   - Vote buttons (disabled nếu đã vote)
   - Real-time results
   - Share button
   - Comments section (optional)

3. **Create Poll Page** (`/create`)
   - Form để tạo poll
   - Preview
   - Submit button

#### Components:
- `PollCard` - Hiển thị poll trong list
- `VoteButton` - Button để vote (với transaction)
- `ResultsChart` - Chart hiển thị kết quả
- `ShareButton` - Share poll qua Base App
- `PollCreator` - Form tạo poll mới

### 5. Data Flow

```
User Action
    ↓
Frontend Component
    ↓
Wagmi Hook (useWriteContract hoặc useSendTransaction)
    ↓
Smart Contract (Base Sepolia)
    ↓
Event Emitted
    ↓
Wagmi Hook (useWatchContractEvent) → Real-time Update
    ↓
UI Updates
```

### 6. Gasless Transaction Flow

```
User clicks Vote
    ↓
Frontend detects Base Account capabilities
    ↓
Check Paymaster capability
    ↓
Build transaction với Paymaster URL
    ↓
User signs transaction (không cần ETH)
    ↓
Transaction sent onchain
    ↓
Poll contract updates vote count
    ↓
Event emitted
    ↓
Frontend updates UI
```

### 7. Social Features

#### Share Poll:
- User click Share button
- Generate embed metadata từ poll data
- Post to Base App feed với:
  - Poll question
  - Current results
  - Link đến poll
- Friends click link → Launch Mini App → Vote

#### Friends Activity:
- Show polls created by friends
- Show votes from friends
- Activity feed

### 8. State Management

#### Onchain State (Smart Contract):
- Polls data
- Vote counts
- User vote status

#### Frontend State (React State + Wagmi):
- Selected poll
- UI loading states
- Error messages
- User wallet connection

### 9. Real-time Updates

- Sử dụng `useWatchContractEvent` từ Wagmi
- Listen to `VoteCast` event
- Update UI khi có vote mới
- Show notification khi friend votes

## 🛠️ Implementation Plan

### Phase 1: Basic Poll Creation & Voting
1. Deploy smart contract
2. Create poll form
3. Vote functionality
4. Basic results display

### Phase 2: Gasless Transactions
1. Setup Paymaster
2. Detect capabilities
3. Implement gasless voting
4. Test với zero-balance wallet

### Phase 3: Social Features
1. Share functionality
2. Embed previews
3. Friends activity feed
4. Social context integration

### Phase 4: Polish & Optimization
1. Real-time updates
2. Better UI/UX
3. Leaderboards
4. Analytics

## 📊 Data Structure

### Poll Object (Frontend)
```typescript
interface Poll {
  id: string;
  creator: string;
  question: string;
  options: string[];
  endTime: number;
  votes: number[];
  totalVotes: number;
  hasVoted: boolean;
  userVote?: number;
  createdAt: number;
}
```

### Vote Object
```typescript
interface Vote {
  pollId: string;
  optionIndex: number;
  voter: string;
  timestamp: number;
}
```

## 🎨 UI/UX Flow

1. **Onboarding**: 
   - Auto-connect wallet (Base Account)
   - Show welcome message
   - Guide user tạo poll đầu tiên

2. **Discovery**:
   - Trending polls ở top
   - Friends' polls highlighted
   - Easy search

3. **Voting**:
   - One-click vote
   - Instant feedback
   - See results immediately

4. **Sharing**:
   - One-tap share
   - Rich preview
   - Easy access

## 💡 Next Steps

1. Implement smart contract
2. Build frontend components
3. Connect với Base Account
4. Add gasless transactions
5. Implement social sharing
6. Test và optimize

---

**Đây là logic cơ bản cho Poll/Voting App. Bạn muốn tôi bắt đầu implement phần nào trước?**

