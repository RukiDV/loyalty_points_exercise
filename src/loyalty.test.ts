import { describe, expect, test } from "vitest";
import { calculatePoints, generateRedeemCode, loyaltyHeaders } from "./loyalty";

describe("loyalty module", () => {
  describe("calculatePoints", () => {
    test("calculates 1 point per full euro for regular customers", () => {
      expect(calculatePoints(10.99, "regular")).toBe(10);
    });

    test("calculates 2 points per full euro for member customers", () => {
      expect(calculatePoints(10.99, "member")).toBe(20);
    });

    test("calculates 3 points per full euro for vip customers", () => {
      expect(calculatePoints(10.99, "vip")).toBe(30);
    });
  });

  describe("generateRedeemCode", () => {
    test("generate correct string", () => {
      const code = generateRedeemCode();
      expect(typeof code).toBe("string");
      expect(code.length).toBeGreaterThan(0);
    });
  });

  describe("loyaltyHeaders", () => {
    test("returns Basic Authorization header when LOYALTY_PASSWORD is set", () => {
      process.env.LOYALTY_PASSWORD = "secretpassword";
      const headers = loyaltyHeaders();
      const expectedCredentials = Buffer.from(
        "loyalty:secretpassword",
      ).toString("base64");
      expect(headers).toEqual({
        Authorization: `Basic ${expectedCredentials}`,
      });
    });

    test("throws an error when LOYALTY_PASSWORD is missing", () => {
      delete process.env.LOYALTY_PASSWORD;
      expect(() => loyaltyHeaders()).toThrow(
        "LOYALTY_PASSWORD environment variable is not set",
      );
    });
  });
});
