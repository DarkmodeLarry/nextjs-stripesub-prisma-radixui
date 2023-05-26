'use client'

import React from 'react'
import Image from 'next/image'
import * as AspectRatio from './ui/aspect-ratio'

type CardProps = {
  name: string
  image: string
  description: string
}

const Card = ({ name, description, image }: CardProps) => (
  <div className='w-full max-w-xl'>
    <AspectRatio.Root
      className='relative w-full h-full overflow-hidden rounded-lg shadow-md group'
      ratio={16 / 9}
    >
      <div className='absolute inset-0 z-10 flex items-center justify-center'>
        <h3 className='text-sm font-semibold text-white uppercase duration-300 ease-in-out select-none bg-gradient-to-r from-primary-bold to-primary-faint bg-clip-text group-hover:opacity-0 '>
          {name}
        </h3>
      </div>
      <div className='absolute inset-0 object-cover transition-colors duration-300 ease-in-out bg-gray-800 group-hover:bg-gray-500'>
        <Image
          src={image}
          alt={`${image}`}
          height={800}
          width={800}
          className='w-full h-full text-white mix-blend-overlay'
        />
      </div>
      <p className='absolute inset-0 z-10 flex items-center justify-center text-transparent'>
        {description}
      </p>
    </AspectRatio.Root>
  </div>
)

export default Card
