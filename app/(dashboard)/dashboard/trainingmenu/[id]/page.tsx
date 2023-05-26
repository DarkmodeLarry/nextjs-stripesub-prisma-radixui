import Image from 'next/image'
import { SearchParamTypes } from '@/types/SearchParamsTypes'
import formatPrice from '@/lib/utils/priceFormat'
import AddCart from './AddCart'

export default async function Product({ searchParams }: SearchParamTypes) {
  return (
    <div className='flex flex-col items-center justify-between gap-16 m-4 card w-96 bg-neutral'>
      <Image
        src={searchParams.image}
        alt={searchParams.name + searchParams.image}
        width={600}
        height={600}
        className='w-3/4 p-4 rounded-lg'
        priority={true}
      />

      <div className='font-medium card-body '>
        <h1 className='py-2 text-2xl'>{searchParams.name}</h1>
        <p className='py-2'>{searchParams.description}</p>
        <p className='py-2'>{searchParams.features}</p>
        <div className='flex gap-2'>
          <p className='font-bold text-primary'>
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
        </div>

        <AddCart {...searchParams}>Add to cart</AddCart>
      </div>
    </div>
  )
}
