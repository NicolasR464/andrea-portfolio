"use client";
import { useStore } from "@/store";
// import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TOKEN!);
import StoreInitializer from "@/components/StoreInitializer";
import { useState, useEffect } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShopBtn({
  idProp,
  stripeProductId,
  imgProp,
  priceProp,
  collectionProp,
  prints_leftProp,
}: {
  idProp: string;
  stripeProductId: string;
  priceProp: number;
  collectionProp: string;
  prints_leftProp: number;
  imgProp: string;
}) {
  // const [isOpen, setIsOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [id, setId] = useState("");
  const [stripeProdId, setStripeProductId] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState(0);
  const [collection, setCollection] = useState("");
  const [printLeft, setPrintLeft] = useState(0);

  useEffect(() => {
    setId(idProp);
  }, [idProp]);

  useEffect(() => {
    setStripeProductId(stripeProductId);
  }, [stripeProductId]);

  useEffect(() => {
    setImg(imgProp);
  }, [imgProp]);

  useEffect(() => {
    setPrice(priceProp);
  }, [priceProp]);

  useEffect(() => {
    setCollection(collectionProp);
  }, [collectionProp]);

  useEffect(() => {
    setPrintLeft(prints_leftProp);
  }, [prints_leftProp]);

  const handlePurchaseClick = async () => {
    useStore.setState((state) => ({
      isOpen: !state.isOpen,
    }));

    if (!isAdded) {
      const bagObj = {
        id,
        stripeId: stripeProdId,
        collection,
        img,
        price: price,
        prints_left: printLeft,
        amount_selected: 1,
      };

      useStore.setState((state) => ({
        bag: [...state.bag, bagObj],
        cartTotal: state.cartTotal + price,
      }));
    }
    setIsAdded(true);
  };

  return (
    <>
      <button
        onClick={() => handlePurchaseClick()}
        className="btn btn-outline btn-success cart-in"
      >
        {isAdded ? <FontAwesomeIcon icon={faHeart} /> : "buy"}
      </button>
    </>
  );
}
