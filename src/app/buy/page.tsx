import ShopCard from "./ShopCard";
import { useStore } from "@/store";
import StoreInitializer from "@/components/StoreInitializer";

const fetchItems = async () => {
  //will fetch all items - with a set revalidate tags to update the UI
  try {
    const data = await fetch("http://localhost:3000/api/shop", {
      next: { tags: ["drawings"] },
    });
    const res = await data.json();
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default async function Buy() {
  const items = await fetchItems();

  const collections: any = new Object();

  console.log(items);

  // items.forEach((item: object) => {
  //   console.log(item.drawing_collection);
  // });

  // items.data.forEach((img: any) => {
  //   console.log(img.drawing_collection);
  //   const coll = img.drawing_collection;
  //   if (!collections.hasOwnProperty(img.drawing_collection)) {
  //     collections[coll] = new Array();
  //     collections[coll].push(img.image.url);
  //   } else {
  //     collections[coll].push(img.image.url);
  //   }
  // });

  // console.log(items);

  // useStore.setState({ isOpen: true, price: 400 });

  return (
    <div className="translate-y-24">
      {/* <StoreInitializer price={400} isOpen={true} /> */}
      <div className="z-[100">
        <h2 className="text-center text-5xl tracking-widest">shop</h2>
      </div>
      <section className="flex flex-wrap justify-center">
        {items &&
          items.map((item: any, index: number) => (
            <ShopCard item={item} key={index} />
          ))}
      </section>
    </div>
  );
}
