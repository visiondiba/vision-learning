 import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider"
import { publicSans, jetbrainsMono } from '@/lib/font' // sesuaikan path-nya

export const metadata: Metadata = {
  title: "Learning System",
  description: "Learning System for Darussalam",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={`${publicSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
