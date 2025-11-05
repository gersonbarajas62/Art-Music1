import { NextResponse } from "next/server";
import { getOrderById, updateOrderById } from "../../../utils/orders";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2022-11-15" });

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();
    if (!orderId) return new NextResponse("Missing orderId", { status: 400 });

    const order = getOrderById(orderId);
    if (!order) return new NextResponse("Order not found", { status: 404 });

    // If order already paid, return success
    if (order.status === "paid") {
      return NextResponse.json({ confirmed: true, status: "paid", order });
    }

    // Optionally check Stripe payment intent status
    if (order.paymentIntentId) {
      const pi = await stripe.paymentIntents.retrieve(order.paymentIntentId);
      if (pi.status === "succeeded") {
        const updated = updateOrderById(orderId, { status: "paid", paidAt: new Date().toISOString() });
        return NextResponse.json({ confirmed: true, status: "paid", order: updated });
      } else {
        return NextResponse.json({ confirmed: false, status: pi.status, order });
      }
    }

    return NextResponse.json({ confirmed: false, status: order.status, order });
  } catch (err: any) {
    console.error("confirm-order error:", err);
    return new NextResponse(err?.message || "Internal server error", { status: 500 });
  }
}
