import { Public_Sans, JetBrains_Mono } from 'next/font/google'

export const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-primary',
  // Public Sans punya weight sampai 900 (Black)
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-secondary',
  weight: ['400', '500', '700'],
  display: 'swap',
})