import Image from 'next/image'
import formatPrice from '@/lib/utils/priceFormat'
import { ProductType } from '@/types/ProductType'
import Link from 'next/link'

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
      <div className='text-primary'>
        <Image
          src={image}
          alt={image + name}
          width={800}
          height={800}
          className='object-cover w-full rounded-lg h-96'
          priority={true}
        />
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
