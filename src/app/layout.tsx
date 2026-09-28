import type { Metadata } from 'next'
import { Fredoka, Figtree, JetBrains_Mono, Kanit } from 'next/font/google'
import './globals.css'
import AppHeader from '@/components/AppHeader'
import { THEME_INIT_SCRIPT } from '@/lib/theme'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-fredoka',
})

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-figtree',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-mono',
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
    // data-theme is set before paint by THEME_INIT_SCRIPT, so React must not complain about it
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={`pixel-text ${fredoka.variable} ${figtree.variable} ${mono.variable} ${kanit.variable}`}>
        <div className="min-h-screen">
          <AppHeader />
          <div className="container mx-auto px-4 pt-6 pb-28 sm:pb-10">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
