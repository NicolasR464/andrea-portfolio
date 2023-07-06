"use client";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TOKEN!);

const handlePurchaseClick = async (id: string) => {
  const stripe: any = await stripePromise;

  const bodyObj = {
    drawingStripeId: id,
  };

  const stripeApi = await fetch("/api/shop", {
    method: "POST",
    body: JSON.stringify(bodyObj),
    mode: "no-cors",
  });

  const stripeRes = await stripeApi.json();
  console.log(stripeRes);

  const result = await stripe.redirectToCheckout({
    sessionId: stripeRes.id,
  });

  console.log(result);

  if (result.error) {
    alert(result.error.message);
  }

  // return stripeRes;
};

export default function ShopBtn({ stripeId }: { stripeId: any }) {
  return (
    <button
      onClick={() => handlePurchaseClick(stripeId!)}
      className="btn btn-outline btn-success"
    >
      purchase
    </button>
  );
}
