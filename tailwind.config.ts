// Tailwind CSS v4 uses CSS-based configuration
// Most configuration is now done via CSS variables in globals.css
// This file is kept for compatibility but may not be needed

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}

export default config
