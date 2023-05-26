import Image from 'next/image'
import formatPrice from '@/lib/utils/priceFormat'
import { ProductType } from '@/types/ProductType'
import Link from 'next/link'
import Card from '@/components/Card'

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata
}: ProductType) {
  const { features } = metadata

  return (
    <Link
      href={{
        pathname: `/dashboard/trainingmenu/${id}`,
        query: { name, image, unit_amount, id, description, features }
      }}
    >
      <div className='font-sm'>
        <Card name={name} image={image} description={description} />

        <div className='py-2 font-medium'>
          <h1 className='text-secondary'>{name}</h1>
          <h2 className='text-sm text-accent'>
            {unit_amount !== null ? formatPrice(unit_amount) : 'N/A'}
          </h2>
        </div>
      </div>
    </Link>
  )
}
