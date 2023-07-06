import Image from "next/image";
import React from "react";
import ShopBtn from "./ShopBtn";

export default function ShopCard({ item }: { item: any }) {
  return (
    <div>
      <div className="card transition duration-1000 md:hover:scale-105 m-5 md:card-side md:max-w-2xl bg-base-100 md:shadow-lg md:hover:shadow-xl">
        <figure>
          {item.image.url && (
            <Image
              src={item.image.url}
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
              alt="drawing picture"
            />
          )}
        </figure>
        <div className="card-body">
          <h3 className="card-title">{item.drawing_collection}</h3>
          <h4>{item.name}</h4>
          <span>{item.price} €</span>
          <span>
            {item.width} X {item.height} cm
          </span>
          <p>{item.description}</p>
          <div className="card-actions justify-end">
            <ShopBtn stripeId={item.stripe.priceId} />
          </div>
        </div>
      </div>
    </div>
  );
}
