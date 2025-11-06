import type { Metadata } from 'next'
import './globals.css'

// Using system fonts to avoid Google Fonts fetching during build
// This allows builds to succeed in restricted network environments
const fontVariables = '--font-inter --font-kanit'

export const metadata: Metadata = {
  title: 'Pokemon toolkit',
  description: 'This is a comprehensive Pokemon toolkit built with Next.js featuring multiple tools and utilities for Pokemon enthusiasts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="pixel-text">
        <div className="min-h-screen" style={{
          background: `
            radial-gradient(circle at 25% 25%, #1e1e3f 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, #2a2a5a 0%, transparent 50%),
            linear-gradient(45deg, #0f0f23 0%, #1e1e3f 100%)
          `
        }}>
          <div className="container mx-auto px-4 py-8">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}