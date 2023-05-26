'use client'

import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Cart from './Cart'
import { useCartStore } from '@/store'
import { AiFillShopping } from 'react-icons/ai'
import { AnimatePresence, motion } from 'framer-motion'
import DarkLight from './DarkLight'

export default function Nav({ user }: Session) {
  const cartStore = useCartStore()

  return (
    <nav className='flex items-center justify-between w-full py-6 border-b-2 border-white navbar bg-base-300'>
      <Link href={'/'}>
        <h1 className='text-xl font-lobster'>Flow State Swim</h1>
      </Link>
      <ul className='flex items-center gap-12'>
        {/* Toggle the cart */}
        <li
          onClick={() => cartStore.toggleCart()}
          className='relative flex items-center text-3xl cursor-pointer'
        >
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1.2 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className='absolute flex items-center justify-center w-5 h-5 text-sm font-bold text-white bg-teal-700 rounded-full left-4 bottom-4'
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* DarkMode */}
        <DarkLight />
        {/* if the user is not signed in */}
        {!user && (
          <li className='px-4 py-2 text-white bg-teal-600 rounded-md'>
            <button className='' onClick={() => signIn()}>
              Sign in
            </button>
          </li>
        )}
        {user && (
          <li className=''>
            <div className='cursor-pointer dropdown dropdown-end'>
              <Image
                src={user?.image as string}
                alt={user?.name as string}
                width={36}
                height={36}
                className='rounded-full'
                tabIndex={0}
              />
              <ul
                tabIndex={0}
                className='space-y-4 shadow dropdown-content menu bg-base-100 rounded-box w-72'
              >
                <Link
                  className='p-4 rounded-md hover:bg-base-300'
                  href={'/dashboard'}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur()
                    }
                  }}
                >
                  Orders
                </Link>
                <li
                  className='p-4 rounded-md hover:bg-base-300'
                  onClick={() => {
                    signOut()
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur()
                    }
                  }}
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  )
}
