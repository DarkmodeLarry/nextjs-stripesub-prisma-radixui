import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { buffer } from 'micro'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  if (!sig) {
    return res.status(400).send('Missing the stripe Signature!')
  }

  let event: Stripe.Event
  // Handle different types of events

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return res.status(400).send('Webhook error' + err)
  }

  switch (event.type) {
    case 'payment_intent.created':
      const paymentIntent = event.data.object
      console.log('Payment intent was created')
      break
    case 'charge.succeeded':
      const charge = event.data.object as Stripe.Charge
      if (typeof charge.payment_intent === 'string') {
        const order = await db.order.update({
          where: { paymentIntentID: charge.payment_intent },
          data: { status: 'complete' }
        })
      }
      break
    default:
      console.log('Unhandled event type:' + event.type)
  }
  res.json({ received: true })
}
