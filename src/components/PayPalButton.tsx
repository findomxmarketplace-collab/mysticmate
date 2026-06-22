"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  amount: string;
  onSuccess: (orderId: string) => void;
  onError?: (error: any) => void;
}

export default function PayPalButton({ amount, onSuccess, onError }: PayPalButtonProps) {
  return (
    <div className="w-full">
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
        createOrder={(data: any, actions: any) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={async (data: any, actions: any) => {
          if (actions.order) {
            const details = await actions.order.capture();
            onSuccess(details.id || "success");
          }
        }}
        onError={(err: any) => {
          console.error("PayPal Error:", err);
          if (onError) onError(err);
        }}
      />
    </div>
  );
}
