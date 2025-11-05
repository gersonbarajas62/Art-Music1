import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrderByPaymentIntent } from "../../../utils/orders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2022-11-15" });

export async function POST(req: Request) {
  try {
    const { paymentIntentId } = await req.json();
    if (!paymentIntentId) return new NextResponse("Missing paymentIntentId", { status: 400 });

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!pi) return new NextResponse("PaymentIntent not found", { status: 404 });

    if (pi.status === "succeeded") {
      const updated = updateOrderByPaymentIntent(paymentIntentId, { status: "paid", paidAt: new Date().toISOString() });
      return NextResponse.json({ ok: true, updated });
    } else if (pi.status === "requires_payment_method" || pi.status === "requires_action") {
      return NextResponse.json({ ok: false, status: pi.status });
    } else {
      // record other statuses if needed
      const updated = updateOrderByPaymentIntent(paymentIntentId, { status: "pending" });
      return NextResponse.json({ ok: true, status: pi.status, updated });
    }
  } catch (err: any) {
    console.error("payment-confirmation error:", err);
    return new NextResponse(err?.message || "Internal server error", { status: 500 });
  }
}
