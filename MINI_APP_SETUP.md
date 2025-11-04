# 🚀 Setup Mini App - Các bước tiếp theo

Hiện tại app chỉ là web app thông thường. Để trở thành **Mini App** thực sự và có thể chạy trong Farcaster/Base App, cần làm các bước sau:

## 📋 Checklist

### ✅ Đã hoàn thành
- [x] Web app hoạt động
- [x] Smart contract deployed
- [x] Frontend integrated với contract
- [x] Manifest route đã setup (`/.well-known/farcaster.json`)

### ⏳ Cần làm tiếp

#### 1. **Deploy App lên Production** (HTTPS required)
- [ ] Deploy lên Vercel/Netlify/Cloudflare Pages
- [ ] Setup custom domain (optional nhưng khuyến nghị)
- [ ] Verify app accessible qua HTTPS

#### 2. **Update Manifest Configuration**
- [ ] Update `minikit.config.ts` với app info thực tế
- [ ] Update app name, description, images
- [ ] Add required images (icon, splash, screenshots)

#### 3. **Generate Account Association**
- [ ] Visit [Base.dev Account Association Tool](https://www.base.dev/preview?tab=account)
- [ ] Enter app URL
- [ ] Sign message với wallet
- [ ] Copy `accountAssociation` vào manifest

#### 4. **Deploy Manifest**
- [ ] Update manifest với accountAssociation
- [ ] Redeploy app
- [ ] Verify manifest accessible tại `https://your-domain.com/.well-known/farcaster.json`

#### 5. **Submit to Base Build** (Optional)
- [ ] Import Mini App vào Base Build
- [ ] Verify ownership
- [ ] App sẽ xuất hiện trong Base App

## 📝 Chi tiết từng bước

### Bước 1: Deploy App

#### Option A: Vercel (Khuyến nghị)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd mini-app
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: poll-app (hoặc tên bạn muốn)
# - Directory: ./
# - Override settings? No
```

Sau khi deploy, bạn sẽ có URL như: `https://poll-app-xxx.vercel.app`

#### Option B: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd mini-app
netlify deploy --prod
```

#### Environment Variables

Nhớ add environment variables trong Vercel/Netlify dashboard:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
- `NEXT_PUBLIC_POLL_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_APP_URL` (your deployed URL)

### Bước 2: Update Manifest Config

Update `minikit.config.ts`:

```typescript
const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app';

export const minikitConfig = {
  accountAssociation: {
    header: "", // Will be generated
    payload: "", // Will be generated
    signature: "" // Will be generated
  },
  miniapp: {
    version: "1",
    name: "Poll App", // Your app name
    subtitle: "Create and vote on polls on Base",
    description: "A decentralized polling app built on Base. Create polls and vote onchain!",
    screenshotUrls: [`${ROOT_URL}/screenshot.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["poll", "voting", "base", "social"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Vote on Base",
    ogTitle: "Poll App",
    ogDescription: "Create and vote on polls on Base",
    ogImageUrl: `${ROOT_URL}/og.png`,
  },
}
```

### Bước 3: Prepare Images

Tạo các images cần thiết (hoặc dùng [Mini App Assets Generator](https://www.miniappassets.com/)):

1. **icon.png** - 512x512px (app icon)
2. **splash.png** - 1284x2778px (splash screen)
3. **hero.png** - 1200x630px (hero image)
4. **screenshot.png** - 1284x2778px (screenshot)
5. **og.png** - 1200x630px (Open Graph image)

Place chúng trong `public/` folder.

### Bước 4: Generate Account Association

1. **Deploy app** với manifest (chưa có accountAssociation cũng được)

2. **Visit [Base.dev Account Association Tool](https://www.base.dev/preview?tab=account)**
   - Sign in với Base account
   - Navigate to **Preview → Account Association**

3. **Enter App URL**:
   - Paste your deployed URL: `https://your-app.vercel.app`
   - Click **Submit**

4. **Verify & Sign**:
   - Click **Verify → Sign**
   - Sign message với wallet
   - Copy generated `accountAssociation` object

5. **Update Manifest**:
   ```typescript
   accountAssociation: {
     header: "eyJmaWQiOjkxNTIs...", // Paste từ tool
     payload: "eyJkb21haW4iOi...", // Paste từ tool
     signature: "0x123abc..." // Paste từ tool
   }
   ```

6. **Redeploy** với updated manifest

### Bước 5: Verify Manifest

Check manifest accessible:
```
https://your-app.vercel.app/.well-known/farcaster.json
```

Should return JSON với accountAssociation và miniapp config.

### Bước 6: Import to Base Build (Optional)

1. Visit [Base.dev](https://www.base.dev)
2. Go to **My Apps → Import Mini App**
3. Enter your app URL
4. Verify ownership
5. App sẽ xuất hiện trong Base App!

## 🧪 Test Mini App

Sau khi setup xong, bạn có thể test:

1. **Trong Farcaster**:
   - Open Farcaster app
   - Search for your app
   - Launch Mini App

2. **Trong Base App**:
   - Open Base App
   - Navigate to Mini Apps
   - Find your app

## 📚 Resources

- [Base Build Account Association Tool](https://www.base.dev/preview?tab=account)
- [Farcaster Manifest Tool](https://farcaster.xyz/developers/manifest-tool)
- [Mini App Assets Generator](https://www.miniappassets.com/)
- [Manifest Documentation](https://docs.base.org/mini-apps/core-concepts/manifest)

## 🎯 Quick Start

1. **Deploy ngay**:
   ```bash
   cd mini-app
   vercel
   ```

2. **Generate Account Association**:
   - Visit: https://www.base.dev/preview?tab=account
   - Enter deployed URL
   - Sign và copy accountAssociation

3. **Update và redeploy**:
   - Update `minikit.config.ts`
   - Redeploy

4. **Done!** 🎉

## ⚠️ Lưu ý

- App **PHẢI** accessible qua HTTPS
- Manifest **PHẢI** accessible tại `/.well-known/farcaster.json`
- AccountAssociation **PHẢI** được sign với wallet
- All images **PHẢI** accessible và đúng format

## 🐛 Troubleshooting

### Manifest không accessible
- Check file path: `app/.well-known/farcaster.json/route.ts`
- Verify deployment có include route này
- Check URL: `https://your-domain.com/.well-known/farcaster.json`

### Account Association không work
- Verify bạn sign với đúng wallet
- Check domain trong manifest match với deployed URL
- Redeploy sau khi update manifest

### App không xuất hiện trong Base App
- Wait vài phút để indexing
- Check manifest format đúng
- Verify all required fields có trong manifest

