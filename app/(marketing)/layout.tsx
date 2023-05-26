import Link from 'next/link'

import { marketingConfig } from '@/config/marketing'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { MainNav } from '@/components/main-nav'
import { SiteFooter } from '@/components/site-footer'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='container z-40 bg-background'>
        <div className='flex items-center justify-between h-20 py-6'>
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href='/login'
              className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'px-4')}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className='flex-1'>{children}</main>
      <SiteFooter />
    </div>
  )
}
