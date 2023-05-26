'use client'

import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCartStore } from '@/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CheckoutForm from './CheckoutForm'
import { motion } from 'framer-motion'
import OrderAnimation from './OrderAnimation'
import { useThemeStore } from '@/store'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout() {
  const cartStore = useCartStore()
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState('')
  const [stripeTheme, setStripeTheme] = useState<'flat' | 'stripe' | 'night' | 'none'>('stripe')
  const themeStore = useThemeStore()

  useEffect(() => {
    // Set Stripe Theme
    if (themeStore.mode === 'winter') {
      setStripeTheme('stripe')
    } else {
      setStripeTheme('night')
    }
    // Create a paymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent
      })
    })
      .then((res) => {
        if (res.status === 403) {
          return router.push('/api/auth/signin')
        }
        return res.json()
      })
      .then((data) => {
        setClientSecret(data.paymentIntent.client_secret)
        cartStore.setPaymentIntent(data.paymentIntent.id)
      })
  }, [])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: stripeTheme,
      labels: 'floating'
    }
  }

  return (
    <div className='bg-base-300'>
      {!clientSecret && <OrderAnimation />}
      {clientSecret && (
        <motion.div className='p-2' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </motion.div>
      )}
    </div>
  )
}
