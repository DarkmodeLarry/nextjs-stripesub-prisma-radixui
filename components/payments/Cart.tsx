'use client'

import { useCartStore } from '@/store'
import { motion, AnimatePresence } from 'framer-motion'
import Checkout from './Checkout'
import OrderConfirmed from './OrderConfirmed'
import formatPrice from '@/lib/utils/priceFormat'
import Image from 'next/image'
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5'
import basket from '@/public/basket.png'

export default function Cart() {
  const cartStore = useCartStore()

  // Total Price
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className='fixed top-0 left-0 w-full h-screen bg-black/25'
    >
      {/* Cart */}
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className='absolute top-0 right-0 w-full h-screen p-12 overflow-y-scroll bg-base-200 lg:w-2/5'
      >
        {cartStore.onCheckout === 'cart' && (
          <button onClick={() => cartStore.toggleCart()} className='pb-12 text-sm font-bold'>
            Back to store 🏃
          </button>
        )}

        {cartStore.onCheckout === 'checkout' && (
          <button onClick={() => cartStore.setCheckout('cart')} className='pb-12 text-sm font-bold'>
            Back to cart 🛒
          </button>
        )}
        {/* Cart Items */}
        {cartStore.onCheckout === 'cart' && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div
                layout
                key={item.id}
                className='flex gap-4 p-4 my-4 rounded-lg bg-base-100 '
              >
                <Image
                  className='h-24 rounded-md '
                  src={item.image}
                  alt={item.name}
                  height={120}
                  width={120}
                />
                <div>
                  <h2>{item.name}</h2>
                  {/* Update quantity of a product */}
                  <div className='flex gap-2'>
                    <h2>Quantity: {item.quantity}</h2>
                    <button
                      onClick={() =>
                        cartStore.removeProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity
                        })
                      }
                    >
                      <IoRemoveCircle />
                    </button>
                    <button
                      onClick={() =>
                        cartStore.addProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity
                        })
                      }
                    >
                      <IoAddCircle />
                    </button>
                  </div>

                  <p className='text-sm'>{item.unit_amount && formatPrice(item.unit_amount)}</p>
                </div>
              </motion.div>
            ))}
          </>
        )}

        {/* Checkout and total */}
        {cartStore.cart.length > 0 && cartStore.onCheckout === 'cart' ? (
          <motion.div layout>
            <p>Total: {formatPrice(totalPrice)}</p>

            <button
              onClick={() => cartStore.setCheckout('checkout')}
              className='w-full py-2 mt-4 text-white rounded-md bg-slate-500'
            >
              Checkout
            </button>
          </motion.div>
        ) : null}
        {/* Checkout Form */}
        {cartStore.onCheckout === 'checkout' && <Checkout />}
        {cartStore.onCheckout === 'success' && <OrderConfirmed />}
        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === 'cart' && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className='flex flex-col items-center gap-12 pt-56 text-2xl font-medium opacity-75'
            >
              <h1>Uhhh ohhh...it&apos;s empty 😢</h1>
              <Image src={basket} alt='empty cart' width={200} height={200} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
