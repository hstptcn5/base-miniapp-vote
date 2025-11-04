# Mini App on Base

A Mini App template built with Next.js, OnchainKit, and MiniKit for Base App integration.

## 🚀 Quick Start

### Prerequisites
- Node.js v19+
- Vercel account (for hosting)
- Coinbase Developer Platform account (for CDP API Key)
- GitHub account

### Setup

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - Get from [CDP Portal](https://portal.cdp.coinbase.com)
- `NEXT_PUBLIC_PROJECT_NAME` - Your project name
- `NEXT_PUBLIC_APP_URL` - Your app URL (for production)

3. **Run development server**
```bash
npm run dev
```

4. **Update Manifest**
Edit `minikit.config.ts` to customize your app:
- App name, description
- Icon URLs, screenshots
- Tags and categories

5. **Deploy to Vercel**
- Push to GitHub
- Connect to Vercel
- Deploy automatically

6. **Create Account Association**
- After deployment, go to [Base Build Account Association](https://www.base.dev/preview?tab=account)
- Paste your domain and verify
- Copy the `accountAssociation` object and update `minikit.config.ts`
- Redeploy

## 📚 Documentation

See the roadmap files in the parent directory:
- `mini-app-roadmap.md` - Detailed roadmap
- `docs-checklist.md` - Documentation checklist
- `quick-reference.md` - Commands and snippets

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **OnchainKit** - Base wallet integration
- **MiniKit** - Mini App components
- **Wagmi** - Ethereum React hooks
- **Viem** - Ethereum library

## 📁 Project Structure

```
mini-app/
├── app/
│   ├── .well-known/
│   │   └── farcaster.json/
│   │       └── route.ts       # Manifest endpoint
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   ├── providers.tsx          # OnchainKit provider
│   └── globals.css            # Global styles
├── minikit.config.ts          # Manifest configuration
├── package.json
└── README.md
```

## 🎯 Next Steps

1. Customize the UI in `app/page.tsx`
2. Add smart contract integration
3. Implement gasless transactions
4. Add social sharing features
5. Test in Base App preview: https://base.dev/preview

## 📖 Resources

- [Base Docs](https://docs.base.org)
- [Mini Apps Docs](https://docs.base.org/mini-apps)
- [OnchainKit Docs](https://docs.base.org/onchainkit)
- [Base Account Docs](https://docs.base.org/base-account)

## 💡 Tips

- Start with the template, customize gradually
- Test on Base App preview early
- Use Base Account for automatic wallet connection
- Implement Paymaster for gasless transactions
- Follow quality guidelines before submission

---

**Happy Building! 🚀**


