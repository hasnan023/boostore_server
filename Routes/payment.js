const express = require('express');
const router = express.Router(); // Change this line
const stripe = require('stripe')('sk_test_51OFQAPLpQ8ab3LqaerMfNVGlfgCnTHySttHAMbWOmEVy9D65Zpouv3wrnccZ6iOMyYYMCzasldFfCj9TnfjGUH1S00b7okvXqT');

router.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
  
    // Send the client secret as a response
    res.json({ clientSecret: paymentIntent.client_secret });
});

// Export the router
module.exports = router;
