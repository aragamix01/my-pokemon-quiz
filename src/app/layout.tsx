import type { Metadata } from 'next'
import { Inter, Kanit } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const kanit = Kanit({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-kanit',
})

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
      <body className={`pixel-text ${inter.variable} ${kanit.variable}`}>
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}