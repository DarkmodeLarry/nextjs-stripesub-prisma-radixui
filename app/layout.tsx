import { Inter as FontSans } from 'next/font/google'
import { Roboto, Lobster_Two } from 'next/font/google'
import localFont from 'next/font/local'
import { siteConfig } from '@/config/site'
import '@/styles/globals.css'
import { absoluteUrl, cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@/components/analytics'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-robot'
})

const lobster = Lobster_Two({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lobster'
})
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading'
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,

  creator: 'darkmodeLarry',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#EDEDED' },
    { media: '(prefers-color-scheme: dark)', color: '#161518' }
  ]
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
          roboto.variable,
          lobster.variable
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='shade' enableSystem>
          {children}
          <Analytics />
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
