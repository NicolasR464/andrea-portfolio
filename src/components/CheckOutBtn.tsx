"use client";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TOKEN!);

export default function CheckOutBtn({
  cartObj,
  cartTotal,
}: {
  cartObj: any;
  cartTotal: number;
}) {
  const handleStripeCheckSession = async () => {
    const stripe: any = await stripePromise;

    // const bodyObj = {
    //   drawingStripeId: id,
    // };

    const stripeApi = await fetch("/api/shop", {
      method: "POST",
      body: JSON.stringify(cartObj),
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
  };

  return (
    <button className="btn btn-success btn-outline m-4  mb-6">checkout</button>
  );
}
