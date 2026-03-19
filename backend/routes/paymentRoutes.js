import express from "express";
import Stripe from "stripe";

const router = express.Router();

router.post("/pay", async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET) {
      return res.status(500).json({
        message: "Stripe secret key not configured in .env"
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET);

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        message: "Payment amount is required"
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd"
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default router;