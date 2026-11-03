import type { CustomerType } from "./types";
import crypto from "node:crypto";

export function loyaltyHeaders(): Record<string, string> {
  const password = process.env.LOYALTY_PASSWORD;
  if (!password) {
    throw new Error("LOYALTY_PASSWORD environment variable is not set");
  }
  const credentials = Buffer.from(`loyalty:${password}`);
  return { Authorization: `Basic ${credentials.toString("base64")}` };
}

export function calculatePoints(
  total: number,
  customerType: CustomerType,
): number {
  const fullEuros = Math.floor(total);
  if (customerType === "vip") {
    return fullEuros * 3;
  } else if (customerType === "member") {
    return fullEuros * 2;
  }
  return fullEuros;
}

export function generateRedeemCode(): string {
  return crypto.randomBytes(4).toString("hex").toUpperCase();
}
