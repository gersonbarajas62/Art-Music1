// server/routes/payment.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  const { cart, shipping, shippingCost } = req.body;
  const amount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + shippingCost;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency: 'mxn',
      metadata: { shipping: JSON.stringify(shipping) },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;