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

  console.log(items);

  // useStore.setState({ isOpen: true, price: 400 });

  return (
    <div>
      {/* <StoreInitializer price={400} isOpen={true} /> */}
      <h2 className="text-center text-5xl">shop</h2>
      <section className="flex flex-wrap justify-center">
        {items.map((item: any, index: number) => (
          <ShopCard item={item} key={index} />
        ))}
      </section>
    </div>
  );
}
