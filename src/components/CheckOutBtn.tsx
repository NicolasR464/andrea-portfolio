"use client";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TOKEN!);
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "@/store";

export default function CheckOutBtn() {
  const { bag, cartTotal } = useStore();

  const handleStripeCheckSession = async () => {
    const stripe: any = await stripePromise;

    // const bodyObj = {
    //   drawingStripeId: id,
    // };
    const cartObj = {
      bag,
      cartTotal,
    };

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
    <button
      onClick={() => handleStripeCheckSession()}
      className="btn flex flex-row justify-center items-center btn-success btn-outline m-4  mb-6"
    >
      <FontAwesomeIcon icon={faBagShopping} />
      <span>checkout </span>{" "}
      <span className="text-xs">(total: {cartTotal}€ )</span>
    </button>
  );
}
