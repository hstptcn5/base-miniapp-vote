import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Mini App',
  description: 'A mini app built on Base',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress Chrome extension errors that don't affect app functionality
              (function() {
                const originalError = console.error;
                console.error = function(...args) {
                  const message = args.join(' ');
                  if (
                    message.includes('chrome-extension://') ||
                    message.includes('Failed to get initial state') ||
                    message.includes('Sender: Failed to get initial state')
                  ) {
                    return; // Silently ignore extension errors
                  }
                  originalError.apply(console, args);
                };
                
                // Also handle unhandled errors
                window.addEventListener('error', function(event) {
                  if (
                    event.filename && event.filename.includes('chrome-extension://') ||
                    event.message && event.message.includes('Failed to get initial state')
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                  }
                }, true);
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}


