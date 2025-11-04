# 🚀 Deploy to Vercel - Hướng dẫn

## Tình trạng Git hiện tại

- `contracts/` folder: Đã có git repo (để install forge-std)
- `mini-app/` root: Chưa có git repo

## 📋 Option 1: Deploy với Git (Khuyến nghị)

### Bước 1: Setup Git Repository

**Tạo git repo ở root của mini-app** (không phải trong contracts):

```bash
cd mini-app

# Init git (nếu chưa có)
git init

# Add .gitignore cho contracts/.git
echo "contracts/.git" >> .gitignore
echo "contracts/lib/" >> .gitignore  # forge-std library
echo "contracts/out/" >> .gitignore
echo "contracts/cache/" >> .gitignore
echo "contracts/broadcast/" >> .gitignore
echo "contracts/.env" >> .gitignore

# Add all files
git add .

# Commit
git commit -m "Initial commit - Poll App Mini App"
```

### Bước 2: Push lên GitHub

```bash
# Tạo repo mới trên GitHub (không init README)
# Sau đó:

git remote add origin https://github.com/your-username/poll-app.git
git branch -M main
git push -u origin main
```

### Bước 3: Deploy trên Vercel

1. **Visit**: https://vercel.com
2. **Sign in** với GitHub
3. **New Project**:
   - Import từ GitHub repo
   - Select project: `poll-app`
   - Framework Preset: **Next.js** (auto-detect)
   - Root Directory: `./` (hoặc leave empty)
4. **Environment Variables**:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
   - `NEXT_PUBLIC_POLL_CONTRACT_ADDRESS` (đã hardcode nhưng có thể override)
   - `NEXT_PUBLIC_APP_URL` (sẽ được set tự động sau khi deploy)
5. **Deploy**!

## 📋 Option 2: Deploy không cần Git (Vercel CLI)

### Bước 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Bước 2: Deploy

```bash
cd mini-app

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name: poll-app
# - Directory: ./
# - Override settings? No
```

### Bước 3: Set Environment Variables

Sau khi deploy, set environment variables trong Vercel dashboard:

1. Go to project settings
2. Environment Variables
3. Add:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
   - `NEXT_PUBLIC_POLL_CONTRACT_ADDRESS` (optional, đã hardcode)
   - `NEXT_PUBLIC_APP_URL` (sẽ có sau deploy)

## 🔧 Xử lý contracts/.git

Contracts folder có git repo riêng (để install forge-std). Có 2 cách:

### Cách 1: Ignore contracts/.git (Khuyến nghị)

Thêm vào `.gitignore` ở root:

```gitignore
# Foundry/Contracts
contracts/.git
contracts/lib/
contracts/out/
contracts/cache/
contracts/broadcast/
contracts/.env
```

**Không commit** contracts/.git vào repo chính.

### Cách 2: Remove contracts/.git

Nếu muốn contracts là part of main repo:

```bash
cd mini-app/contracts
rm -rf .git
cd ..
git add contracts/
```

## 📝 Recommended .gitignore

Update `.gitignore` ở root của mini-app:

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Foundry/Contracts (không commit contracts/.git)
contracts/.git
contracts/lib/
contracts/out/
contracts/cache/
contracts/broadcast/
contracts/.env
```

## ✅ Sau khi Deploy

1. **Get deployment URL**: `https://poll-app-xxx.vercel.app`

2. **Update environment variable**:
   - Vercel Dashboard → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_APP_URL` = `https://poll-app-xxx.vercel.app`

3. **Redeploy** để apply environment variable

4. **Verify manifest**:
   - Visit: `https://poll-app-xxx.vercel.app/.well-known/farcaster.json`
   - Should return JSON manifest

## 🎯 Quick Start (Recommended)

**Option 1 với Git là tốt nhất** vì:
- ✅ Version control
- ✅ Easy updates
- ✅ Auto-deploy on push
- ✅ Team collaboration

```bash
# 1. Setup git
cd mini-app
git init
echo "contracts/.git" >> .gitignore
echo "contracts/lib/" >> .gitignore
git add .
git commit -m "Initial commit"

# 2. Push to GitHub
git remote add origin https://github.com/your-username/poll-app.git
git push -u origin main

# 3. Deploy on Vercel
# Visit vercel.com → Import from GitHub
```

## ⚠️ Lưu ý

- **Contracts/.git**: Không cần commit vào main repo
- **Contracts/lib/**: Forge-std library, không cần commit
- **Environment Variables**: Set trong Vercel dashboard
- **NEXT_PUBLIC_APP_URL**: Update sau khi có deployment URL

## 🐛 Troubleshooting

### Error: Multiple git repos
- Đảm bảo `.gitignore` có `contracts/.git`
- Không commit contracts/.git

### Error: Build fails
- Check environment variables
- Check Node.js version (nên dùng 18+)
- Check build logs trong Vercel

### Manifest không accessible
- Verify route: `app/.well-known/farcaster.json/route.ts` exists
- Check deployment logs
- Verify URL: `https://your-app.vercel.app/.well-known/farcaster.json`

