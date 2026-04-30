/**
 * pages/api/create-checkout.js
 *
 * Creates a Stripe Checkout Session for the Pro subscription.
 *
 * SETUP:
 *  1. npm install stripe
 *  2. Add STRIPE_SECRET_KEY to your .env.local file
 *  3. In Stripe dashboard, create a recurring Price and paste the
 *     price ID in STRIPE_PRICE_ID below (or set it in .env.local)
 *
 * ENVIRONMENT VARIABLES NEEDED:
 *   STRIPE_SECRET_KEY=sk_live_...      (or sk_test_... for testing)
 *   STRIPE_PRICE_ID=price_...          (your Stripe recurring price ID)
 *   NEXT_PUBLIC_BASE_URL=https://your-domain.com
 */

// ─── Guard: only run when Stripe key is present ───────────────────────────────
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_PRICE_ID   = process.env.STRIPE_PRICE_ID;

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validate environment
  if (!STRIPE_SECRET_KEY) {
    console.error("Missing STRIPE_SECRET_KEY environment variable");
    return res.status(500).json({ error: "Stripe is not configured. Add STRIPE_SECRET_KEY to your environment." });
  }

  if (!STRIPE_PRICE_ID) {
    console.error("Missing STRIPE_PRICE_ID environment variable");
    return res.status(500).json({ error: "Stripe price not configured. Add STRIPE_PRICE_ID to your environment." });
  }

  try {
    // Lazy import Stripe so the app doesn't crash if the package isn't installed yet
    let Stripe;
    try {
      Stripe = (await import("stripe")).default;
    } catch {
      return res.status(500).json({ error: "Stripe package not installed. Run: npm install stripe" });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 7, // 7-day free trial
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err.message);
    return res.status(500).json({ error: err.message || "Failed to create checkout session" });
  }
}
