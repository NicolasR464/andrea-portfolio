import Image from "next/image";
import React from "react";
import ShopBtn from "./ShopBtn";

export default function ShopCard({ item }: { item: any }) {
  return (
    <div className="card  transition duration-1000 tablet:hover:scale-105 m-5 tablet:card-side tablet:max-w-2xl bg-base-100 shadow-lg min-w-[350px] tablet:hover:shadow-xl tablet:w-[480px]">
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
      <div className="card-body tablet:w-60">
        <h3 className="card-title">{item.drawing_collection}</h3>
        {!item.name.includes("_def") && <h4>{item.name}</h4>}

        <span>{item.price} €</span>
        <span>
          {item.width} X {item.height} cm
        </span>
        <p>{item.description}</p>
        <div className="card-actions justify-end">
          <ShopBtn
            idProp={item._id}
            imgProp={item.image.url}
            collectionProp={item.drawing_collection}
            priceProp={item.price}
            prints_leftProp={item.print_number_set}
            stripeProductId={item.stripe.priceId}
          />
        </div>
      </div>
    </div>
  );
}
