# Setup Guide - Mini App

Hướng dẫn chi tiết để setup và chạy Mini App.

## 📋 Prerequisites

Trước khi bắt đầu, đảm bảo bạn đã có:

- ✅ Node.js v19+ installed
- ✅ Vercel account: https://vercel.com
- ✅ GitHub account
- ✅ Coinbase Developer Platform account: https://portal.cdp.coinbase.com
- ✅ Base App account (để test): https://base.app

## 🚀 Step-by-Step Setup

### Step 1: Install Dependencies

```bash
cd mini-app
npm install
```

### Step 2: Configure Environment Variables

1. Copy file env.example thành .env.local:
```bash
# Trên Windows PowerShell
Copy-Item env.example .env.local

# Hoặc trên Git Bash/Linux/Mac
cp env.example .env.local
```

2. Mở `.env.local` và cập nhật các giá trị:

```env
# Lấy từ CDP Portal: https://portal.cdp.coinbase.com
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_cdp_api_key_here

# Tên project của bạn
NEXT_PUBLIC_PROJECT_NAME=mini-app

# URL của app (sẽ update sau khi deploy)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Step 3: Customize Manifest

Mở `minikit.config.ts` và cập nhật thông tin app:

```typescript
miniapp: {
  name: "Tên App của bạn",
  subtitle: "Mô tả ngắn",
  description: "Mô tả chi tiết về app",
  // ... các fields khác
}
```

### Step 4: Run Development Server

```bash
npm run dev
```

Mở http://localhost:3000 trong browser để xem app.

### Step 5: Prepare Assets

Đặt các file assets vào thư mục `public/`:

- `icon.png` - Icon app (512x512px)
- `screenshot.png` - Screenshot (1284x2778px cho portrait)
- `splash.png` - Splash screen
- `hero.png` - Hero image
- `og-image.png` - Open Graph image
- `logo.png` - Logo

**Tip**: Sử dụng [Mini App Assets Generator](https://www.miniappassets.com/) để tạo assets đúng format.

### Step 6: Deploy to Vercel

1. **Push code lên GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy trên Vercel**:
   - Vào https://vercel.com
   - Click "Add New Project"
   - Import GitHub repository
   - Vercel sẽ auto-detect Next.js và deploy
   - Add environment variables từ Vercel dashboard:
     - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
     - `NEXT_PUBLIC_PROJECT_NAME`
     - `NEXT_PUBLIC_APP_URL` (sẽ là URL Vercel tự động generate)

3. **Update .env.local và minikit.config.ts**:
   - Copy URL từ Vercel (ví dụ: `https://your-app.vercel.app`)
   - Update `NEXT_PUBLIC_APP_URL` trong Vercel dashboard
   - Update `ROOT_URL` trong `minikit.config.ts`

### Step 7: Create Account Association

1. **Đảm bảo code đã deploy**:
   - Push tất cả changes lên GitHub
   - Vercel sẽ tự động deploy

2. **Tắt Deployment Protection** (nếu có):
   - Vào Vercel Dashboard → Settings → Deployment Protection
   - Tắt "Vercel Authentication"

3. **Tạo Account Association**:
   - Vào https://www.base.dev/preview?tab=account
   - Paste domain của bạn (ví dụ: `your-app.vercel.app`)
   - Click "Submit"
   - Click "Verify" và sign với wallet
   - Copy `accountAssociation` object

4. **Update minikit.config.ts**:
   - Paste `accountAssociation` vào `minikit.config.ts`
   - Commit và push lên GitHub
   - Vercel sẽ tự động redeploy

### Step 8: Preview & Test

1. **Preview trong Base Build**:
   - Vào https://base.dev/preview
   - Add app URL
   - Test embeds và launch button
   - Verify account association trong tab "Account association"
   - Check metadata trong tab "Metadata"

2. **Test trong Base App**:
   - Mở Base App
   - Tạo post với URL của app
   - Test app launch và functionality

## 🎯 Next Steps

Sau khi setup xong, bạn có thể:

1. **Customize UI**: Edit `app/page.tsx` để thay đổi giao diện
2. **Add Smart Contracts**: Tạo và deploy smart contracts
3. **Implement Features**: Thêm các tính năng theo roadmap
4. **Add Gasless Transactions**: Setup Paymaster cho gasless
5. **Social Sharing**: Implement embeds và previews

## 🐛 Troubleshooting

### Issue: Wallet không connect
- Check `NEXT_PUBLIC_ONCHAINKIT_API_KEY` đúng chưa
- Check WalletConnect config trong OnchainKitProvider
- Test trên Base App (không phải browser thông thường)

### Issue: Manifest không load
- Check file `.well-known/farcaster.json` accessible
- Verify URL: `https://your-app.vercel.app/.well-known/farcaster.json`
- Check accountAssociation đã được generate chưa

### Issue: Build fail
- Run `npm install` lại
- Check Node.js version (cần v19+)
- Check TypeScript errors: `npm run build`

## 📚 Resources

- [Mini App Roadmap](../mini-app-roadmap.md)
- [Docs Checklist](../docs-checklist.md)
- [Quick Reference](../quick-reference.md)
- [Base Docs](https://docs.base.org)
- [OnchainKit Docs](https://docs.base.org/onchainkit)

---

**Happy Building! 🚀**


