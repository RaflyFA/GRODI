import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GRODI — Popok Kain Pintar',
  description: 'Kelola, belanja, dan tukar popok kain modular dengan GRODI.',
  icons: {
    icon: [
      {
        url: '/icon bulat.png',
      },
    ],
    shortcut: '/icon bulat.png',
    apple: '/icon bulat.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#003c8d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="bg-page">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
