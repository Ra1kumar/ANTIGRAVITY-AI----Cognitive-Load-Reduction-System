import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ANTIGRAVITY AI – Cognitive Load Reduction System',
  description: 'AI-powered task management that removes mental friction and reduces cognitive load through intelligent categorization, priority scoring, and burnout prevention.',
  keywords: 'AI, task management, productivity, cognitive load, burnout prevention, automation',
  authors: [{ name: 'ANTIGRAVITY AI Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
