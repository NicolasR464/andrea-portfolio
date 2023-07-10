"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function CartVignette({ item }: { item: any }) {
  const [isAdded, setIsAdded] = useState(false);
  const [id, setId] = useState("");
  const [stripeProdId, setStripeProductId] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState(0);
  const [collection, setCollection] = useState("");
  const [printLeft, setPrintLeft] = useState(0);

  useEffect(() => {
    setId(item.id);
  }, [item.id]);

  useEffect(() => {
    setStripeProductId(item.stripeProductId);
  }, [item.stripeProductId]);

  useEffect(() => {
    setImg(item.img);
  }, [item.img, img]);

  useEffect(() => {
    setPrice(item.price);
  }, [item.price]);

  useEffect(() => {
    setCollection(item.collection);
  }, [item.collection]);

  useEffect(() => {
    setPrintLeft(item.prints_left);
  }, [item.prints_left]);

  return (
    <article className="flex p-2 m-2 rounded-xl justify-center   border-solid border-2  md:flex-row">
      <section className="flex justify-center flex-col   items-center">
        <span>{collection}</span>
        <span>{price} €</span>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">how many prints?</span>
          </label>
          <select className="select select-bordered  w-full max-w-xs">
            {Array(printLeft)
              .fill(null)
              .map((_, x) => (
                <option key={x}>{x + 1}</option>
              ))}
          </select>
        </div>
      </section>
      <section className="m-2 flex justify-center   items-center">
        <Image
          style={{
            boxShadow:
              "12px 12px 24px 0 rgba(0, 0, 0, 0.2), -12px -12px 24px 0 rgba(255, 255, 255, 0.5)",
          }}
          className="m-1 rounded-lg"
          src={img}
          width={150}
          height={150}
          alt="Drawing image in shopping bag"
        />
      </section>
    </article>
  );
}
