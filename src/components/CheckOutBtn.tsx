"use client";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TOKEN!);
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "@/store";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckOutBtn() {
  const searchParams = useSearchParams();

  const { bag, cartTotal } = useStore();
  const pathname = usePathname();
  const [isErrPage, setErrPage] = useState<boolean>(false);

  useEffect(() => {
    if (searchParams.has("cancel")) {
      const localBag = localStorage.getItem("bag")!;
      const bagParsed: any = JSON.parse(localBag);
      useStore.setState({
        bag: bagParsed[0],
        cartTotal: bagParsed[1],
        isOpen: true,
      });
    }
  }, []);

  useEffect(() => {
    setErrPage(pathname === "/error" ? true : false);
  }, [pathname]);

  const handleStripeCheckSession = async () => {
    const stripe: any = await stripePromise;
    let stripeBag: Array<object>;
    console.log(isErrPage);
    // IF from error page
    //// THEN const stripeBag from local storage
    if (isErrPage) {
      const localBag = localStorage.getItem("bag")!;
      console.log(localBag);

      const bagParsed: any = JSON.parse(localBag);
      console.log(bagParsed);

      stripeBag = bagParsed[0].map((item: any) => {
        return { price: item.stripeId, quantity: item.amount_selected };
      });
    } else {
      localStorage.setItem("bag", JSON.stringify([bag, cartTotal]));
      stripeBag = bag.map((item) => {
        return { price: item.stripeId, quantity: item.amount_selected };
      });
    }

    const stripeApi = await fetch("/api/shop", {
      method: "POST",
      body: JSON.stringify(stripeBag),
      mode: "no-cors",
    });

    const stripeRes: any = await stripeApi.json();
    console.log(stripeRes);

    const result = await stripe.redirectToCheckout({
      sessionId: stripeRes.id,
    });
  };

  return (
    <button
      onClick={() => handleStripeCheckSession()}
      className="btn flex flex-row justify-center items-center btn-success btn-outline m-4  mb-6"
    >
      <FontAwesomeIcon width="12" icon={faBagShopping} />
      <span>checkout </span>{" "}
      {!isErrPage && <span className="text-xs">(total: {cartTotal}€ )</span>}
    </button>
  );
}
