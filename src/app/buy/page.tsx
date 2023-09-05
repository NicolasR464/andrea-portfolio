import ShopCard from "./ShopCard";
import { useStore } from "@/store";
import StoreInitializer from "@/components/StoreInitializer";
import CollectionMenu from "@/components/CollectionMenu";

const fetchItems = async () => {
  //will fetch all items - with a set revalidate tags to update the UI
  try {
    const data = await fetch("http://localhost:3000/api/shop", {
      next: { tags: ["drawings"] },
    });
    const res: any = await data.json();
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default async function Buy() {
  const items = await fetchItems();

  const collections: any = new Object();

  if (items) {
    items.forEach((item: any) => {
      const coll = item.drawing_collection;
      if (!collections.hasOwnProperty(item.drawing_collection)) {
        collections[coll] = new Array();
        collections[coll].push(item);
      } else {
        collections[coll].push(item);
      }
    });
  }

  const collectionKeys = Object.keys(collections);

  return (
    <div className="relative" id="shop">
      <div className="translate-y-24">
        <div className="z-[100]">
          <h2 className="text-center text-5xl tracking-widest">shop</h2>
        </div>

        {collectionKeys.map((collection: any, index: number) => {
          return (
            <div
              className="flex items-center justify-center flex-col"
              key={index}
            >
              <h3 id={collection.replace(/ /g, "-")} className="text-xl">
                {collection}
              </h3>
              <section className="flex flex-wrap justify-center">
                {collections[collection].map((item: any, i: number) => {
                  return <ShopCard item={item} key={i} />;
                })}
              </section>
            </div>
          );
        })}
      </div>
      <CollectionMenu collectionKeys={collectionKeys} />
    </div>
  );
}
