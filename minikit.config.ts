// Mini App Manifest Configuration
// This file configures the manifest located at app/.well-known/farcaster.json
//
// IMPORTANT: After deploying, generate accountAssociation at:
// https://www.base.dev/preview?tab=account

const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const minikitConfig = {
  accountAssociation: {
    // ⚠️ TODO: Generate via Base Build Account Association tool
    // 1. Deploy app to production (HTTPS)
    // 2. Visit: https://www.base.dev/preview?tab=account
    // 3. Enter your app URL and sign with wallet
    // 4. Copy the generated accountAssociation here
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "Poll App",
    subtitle: "Create and vote on polls on Base",
    description: "A decentralized polling app built on Base. Create polls and vote onchain with smart contracts!",
    screenshotUrls: [`${ROOT_URL}/screenshot.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["poll", "voting", "base", "social", "onchain"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Vote on Base",
    ogTitle: "Poll App - Vote on Base",
    ogDescription: "Create and vote on polls on Base blockchain",
    ogImageUrl: `${ROOT_URL}/og.png`,
  },
} as const;


