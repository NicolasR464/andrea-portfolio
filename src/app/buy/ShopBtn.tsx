"use client";
import { useStore } from "@/store";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TOKEN!);
import StoreInitializer from "@/components/StoreInitializer";
import { useState } from "react";

export default function ShopBtn({ stripeId }: { stripeId: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePurchaseClick = async (id: string) => {
    setIsOpen(!isOpen);

    return;
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

  useStore.setState({ isOpen: isOpen, price: 400 });

  return (
    <>
      <StoreInitializer price={400} isOpen={isOpen} />
      <button
        onClick={() => handlePurchaseClick(stripeId!)}
        className="btn btn-outline btn-success cart-in"
      >
        buy
      </button>
    </>
  );
}
