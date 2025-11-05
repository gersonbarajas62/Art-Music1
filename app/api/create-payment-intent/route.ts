import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductsWithImages } from "../../../utils/supabaseProducts";
import { createOrder } from "../../../utils/orders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2022-11-15" });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cart, shipping, shippingCost } = body;
    if (!Array.isArray(cart) || cart.length === 0) {
      return new NextResponse("Cart is empty", { status: 400 });
    }

    // Load product catalog to validate prices server-side
    const allProducts = await getProductsWithImages();
    const productMap = new Map<string, any>(allProducts.map((p: any) => [String(p.id), p]));

    let serverTotal = 0;
    const items = cart.map((it: any) => {
      const prod = productMap.get(String(it.id));
      const price = prod ? Number(prod.price) : Number(it.price || 0);
      const quantity = Number(it.quantity || 1);
      serverTotal += price * quantity;
      return { id: String(it.id), quantity, price };
    });

    const shippingNum = Number(shippingCost || 0);
    serverTotal += shippingNum;

    const amountCents = Math.round(serverTotal * 100);

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "mxn",
      payment_method_types: ["card"],
      metadata: {
        note: "Order from Artmusic",
      },
    });

    // Create order record
    const order = createOrder({
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      amountCents,
      currency: "mxn",
      status: "pending",
      shipping,
      items,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, orderId: order.id });
  } catch (err: any) {
    console.error("create-payment-intent error:", err);
    return new NextResponse(err?.message || "Internal server error", { status: 500 });
  }
}
