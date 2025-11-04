// Mini App Manifest Configuration
// This file configures the manifest located at app/.well-known/farcaster.json
//
// IMPORTANT: After deploying, generate accountAssociation at:
// https://www.base.dev/preview?tab=account

// Default to deployed URL, can be overridden by env variable
const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://base-miniapp-vote.vercel.app';

export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjE0MTIwMzMsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgxNkY4Qzk1NGY2RDQ2OTRiN0M1NUFGOWEwYzFhOGQ2NkViMDkxMDdBIn0",
    payload: "eyJkb21haW4iOiJiYXNlLW1pbmlhcHAtdm90ZS52ZXJjZWwuYXBwIn0",
    signature: "kqwlNueTf3pTXMrwsAp9LAaEmQehwI0pAEnyYM8Z8ZQ4v9qM+BMQjR/7fwfyqoiny8PKiBH/qmeh5F2pGJK4Lxs="
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


