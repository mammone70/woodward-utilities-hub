import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Woodward Utilities Hub',
  description: 'Woodward Utilities Hub',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
