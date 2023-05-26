import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

import { getCurrentUser } from '@/lib/session'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'
import Product from '@/components/Product'
import getProducts from '@/lib/utils/getProducts'

import { ProductType } from '@/types/ProductType'
import CalendarComponent from '@/components/CalendarComponent'

export const metadata = {
  title: 'Training',
  description: 'Browse and book private training sessions and events'
}

export default async function TrainingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  const products = await getProducts()

  return (
    <DashboardShell>
      <DashboardHeader
        heading='Training'
        text='Browse and book private training sessions and events.'
      />
      <section className='flex items-center justify-center w-full'>
        <CalendarComponent />
      </section>
      <div className='grid grid-cols-2 gap-4 '>
        {products.map((product) => (
          <Product {...product} key={product.id} />
        ))}
      </div>
    </DashboardShell>
  )
}
