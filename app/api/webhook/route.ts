import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrderByPaymentIntent } from "../../../utils/orders";

export const runtime = "edge"; // optional: choose edge or node depending on deployment

const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
const stripe = new Stripe(stripeSecret, { apiVersion: "2022-11-15" });

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") || "";
  const body = await req.text();

  let event: Stripe.Event;

  try {
    if (!webhookSecret) throw new Error("Missing STRIPE_WEBHOOK_SECRET");
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err?.message || err);
    return new NextResponse(`Webhook Error: ${err?.message || "invalid signature"}`, { status: 400 });
  }

  // Handle the event
  try {
    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object as Stripe.PaymentIntent;
      // mark order paid
      updateOrderByPaymentIntent(pi.id, { status: "paid", paidAt: new Date().toISOString() });
      // You can also fulfill order here (send emails, start shipment...)
    } else if (event.type === "payment_intent.payment_failed") {
      const pi = event.data.object as Stripe.PaymentIntent;
      updateOrderByPaymentIntent(pi.id, { status: "failed" });
    }
    // Return 200 to acknowledge receipt of the event
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook handling error:", err);
    return new NextResponse("Webhook handler error", { status: 500 });
  }
}
