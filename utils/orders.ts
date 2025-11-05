import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const ORDERS_PATH = path.join(process.cwd(), "data", "orders.json");

type OrderItem = { id: string; quantity: number; price: number; };
type Order = {
  id: string;
  paymentIntentId?: string;
  clientSecret?: string;
  amountCents: number;
  currency: string;
  status: "pending" | "paid" | "failed";
  shipping?: any;
  items: OrderItem[];
  createdAt: string;
  paidAt?: string | null;
};

function ensureFile() {
  const dir = path.dirname(ORDERS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(ORDERS_PATH)) fs.writeFileSync(ORDERS_PATH, "[]", "utf8");
}

export function readOrders(): Order[] {
  ensureFile();
  try {
    const raw = fs.readFileSync(ORDERS_PATH, "utf8");
    return JSON.parse(raw || "[]");
  } catch (e) {
    return [];
  }
}

export function writeOrders(orders: Order[]) {
  ensureFile();
  fs.writeFileSync(ORDERS_PATH, JSON.stringify(orders, null, 2), "utf8");
}

export function createOrder(payload: Partial<Order>): Order {
  const orders = readOrders();
  const order: Order = {
    id: uuidv4(),
    paymentIntentId: payload.paymentIntentId,
    clientSecret: payload.clientSecret,
    amountCents: payload.amountCents ?? 0,
    currency: payload.currency ?? "mxn",
    status: payload.status ?? "pending",
    shipping: payload.shipping ?? null,
    items: payload.items ?? [],
    createdAt: new Date().toISOString(),
    paidAt: null,
  };
  orders.push(order);
  writeOrders(orders);
  return order;
}

export function updateOrderByPaymentIntent(paymentIntentId: string, patch: Partial<Order>): Order | null {
  const orders = readOrders();
  const idx = orders.findIndex(o => o.paymentIntentId === paymentIntentId);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], ...patch };
  writeOrders(orders);
  return orders[idx];
}

export function updateOrderById(orderId: string, patch: Partial<Order>): Order | null {
  const orders = readOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], ...patch };
  writeOrders(orders);
  return orders[idx];
}

export function getOrderById(orderId: string): Order | null {
  const orders = readOrders();
  return orders.find(o => o.id === orderId) || null;
}

export function getOrderByPaymentIntent(paymentIntentId: string): Order | null {
  const orders = readOrders();
  return orders.find(o => o.paymentIntentId === paymentIntentId) || null;
}
