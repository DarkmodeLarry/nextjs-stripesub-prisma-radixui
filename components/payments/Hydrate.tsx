'use client'

import { useThemeStore } from '@/store'
import { ReactNode, useEffect, useState } from 'react'

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const themeStore = useThemeStore()
  // Wait will Nextjs rehydrate completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return (
    <>
      {isHydrated ? (
        <body className='font-roboto' data-theme={themeStore.mode}>
          {children}
        </body>
      ) : (
        <body></body>
      )}
    </>
  )
}
